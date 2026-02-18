import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HeartCheckbox from "@/components/HeartCheckbox";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { getOnboardingStep, completeOnboarding } from "@/utils/api";

interface OnboardingQuestionsProps {
  open: boolean;
  onClose: () => void;
  relationship?: string;
  userId?: string;
}

interface Question {
  id: number;
  question: string;
  type: string;
  field: string;
  options?: string[];
  optional?: boolean;
}

// Helper function to convert camelCase to snake_case for backend compatibility
// Handles acronyms properly (e.g., previousIVF -> previous_ivf)
const toSnakeCase = (str: string): string => {
  // If already snake_case (contains underscore and no uppercase), return as-is
  if (str.includes('_') && !/[A-Z]/.test(str)) {
    return str;
  }

  return str
    // Insert underscore before sequences of uppercase letters followed by lowercase (e.g., IVF -> _ivf)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    // Insert underscore before single uppercase letters preceded by lowercase (e.g., camelCase -> camel_case)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase();
};

// Helper function to convert snake_case to camelCase for frontend use
const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export default function OnboardingQuestions({ open, onClose, relationship = "herself", userId }: OnboardingQuestionsProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [parentProfileId] = useState(() => crypto.randomUUID());
  const [question, setQuestion] = useState<Question | null>(null);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [useBackendAPI, setUseBackendAPI] = useState(true);

  console.log("=== OnboardingQuestions Component ===");
  console.log("open:", open);
  console.log("relationship:", relationship);
  console.log("userId:", userId);

  // Static questions fallback
  const getStaticQuestions = (): Question[] => {
    switch (relationship) {
      case "herself":
        return [
          { id: 1, question: "What is your age?", type: "number", field: "age" },
          { id: 2, question: "How long have you been actively trying to conceive?", type: "radio", field: "tryingDuration", options: ["Less than 6 months", "6 - 12 months", "1 - 2 years", "More than 2 years"] },
          { id: 3, question: "Have you had any previous fertility treatments?", type: "radio", field: "previousTreatments", options: ["No, this is my first time exploring options.", "Yes, medications for ovulation only.", "Yes, IUI (Intrauterine Insemination).", "Yes, IVF (In Vitro Fertilization)."] },
          { id: 4, question: "Have you or your partner been diagnosed with any specific conditions?", type: "radio", field: "diagnosis", options: ["Yes, a condition related to me (e.g., PCOS, Blocked Tubes).", "Yes, a condition related to my partner (e.g., Low Sperm Count).", "Yes, we both have contributing factors.", "No, our infertility is unexplained.", "We haven't been diagnosed with anything yet."] },
          { id: 5, question: "If applicable, what is your partner's age?", type: "number", field: "partnerAge", optional: true },
          { id: 6, question: "Have you ever been pregnant before?", type: "radio", field: "previousPregnancy", options: ["No, I have never been pregnant.", "Yes, I have had a child.", "Yes, but the pregnancy ended in a loss (e.g., miscarriage)."] },
          { id: 7, question: "What is your biggest priority or concern right now?", type: "radio", field: "priority", options: ["Understanding the medical process and steps.", "Managing emotional stress and anxiety.", "Information on costs and financial planning.", "Lifestyle, diet, and wellness advice."] },
        ];
      case "himself":
        return [
          { id: 1, question: "Are you and your partner trying to have a baby?", type: "radio", field: "tryingForBaby", options: ["Yes, we are actively trying.", "We are planning to start soon.", "We are just exploring our options for now."] },
          { id: 2, question: "Do you have smoking and drinking habits?", type: "radio", field: "smokingDrinking", options: ["No, I do not smoke or drink.", "I smoke occasionally or socially.", "I drink occasionally or socially.", "I smoke and/or drink regularly (most days)."] },
          { id: 3, question: "Have you or your partner done any fertility tests?", type: "radio", field: "fertilityTests", options: ["No, neither of us has been tested yet.", "Yes, my partner has had some tests.", "Yes, I have had a semen analysis.", "Yes, both of us have been tested."] },
          { id: 4, question: "Do you or your partner have any health problems?", type: "radio", field: "healthProblems", options: ["No, we have no known health problems.", "Yes, I have a health condition.", "Yes, my partner has a health condition.", "Yes, we both have some health conditions."] },
          { id: 5, question: "Has your partner had any IVF treatments in the past?", type: "radio", field: "previousIVF", options: ["No, this would be her first time.", "Yes, she has had one IVF cycle before.", "Yes, she has had more than one IVF cycle.", "I'm not sure about her past treatment details."] },
        ];
      case "father":
        return [
          { id: 1, question: "How long is your daughter trying to have a baby?", type: "radio", field: "duration", options: ["For about a year.", "It has been a few years.", "A long time, it's been difficult.", "I'm not exactly sure."] },
          { id: 2, question: "Is she seeing a doctor or taking treatment?", type: "radio", field: "treatment", options: ["Yes, I believe she is under a doctor's care.", "No, I don't think she has started yet.", "I'm not aware of the details."] },
          { id: 3, question: "Does she have any health problems like PCOS or thyroid?", type: "radio", field: "healthIssues", options: ["Yes, she has mentioned a health issue.", "Not that I know of.", "I'm not sure about her specific health details."] },
          { id: 4, question: "How is she feeling? Is she worried or stressed?", type: "radio", field: "emotionalState", options: ["She seems a bit quiet and worried.", "She tries to be positive, but I can tell it's hard.", "I am very concerned about her stress."] },
          { id: 5, question: "Did she have any IVF treatments in the past?", type: "radio", field: "previousIVF", options: ["No, I believe this is her first time.", "Yes, she has tried before.", "I am not sure about her past treatments."] },
        ];
      case "mother":
        return [
          { id: 1, question: "How long is your daughter trying to have a baby?", type: "radio", field: "duration", options: ["For less than a year.", "It has been 1 to 2 years.", "More than 2 years now."] },
          { id: 2, question: "Has she seen a doctor or done any tests?", type: "radio", field: "medicalCare", options: ["Yes, she is seeing a specialist.", "Yes, she has done some tests.", "No, I have been encouraging her to go.", "I'm not sure what the current status is."] },
          { id: 3, question: "Does she have any health problems?", type: "radio", field: "healthIssues", options: ["Yes, she has told me about a condition she has.", "As far as I know, she is healthy.", "I suspect there might be an issue, but I don't know for sure."] },
          { id: 4, question: "How is she feeling about trying for a baby?", type: "radio", field: "emotionalState", options: ["She is very stressed and disheartened.", "She stays hopeful but has difficult days.", "She confides in me and shares all her worries."] },
          { id: 5, question: "Did she have any IVF treatments in the past?", type: "radio", field: "previousIVF", options: ["No, this is her first attempt.", "Yes, she has been through a cycle before.", "Yes, she has had multiple attempts."] },
        ];
      case "father-in-law":
        return [
          { id: 1, question: "How long is your daughter-in-law trying to have a baby?", type: "radio", field: "duration", options: ["I believe it has been over a year.", "For a few years now.", "I am not exactly sure of the timeline."] },
          { id: 2, question: "Is she seeing a doctor or taking treatment?", type: "radio", field: "treatment", options: ["Yes, I think she and my son are seeing someone.", "I don't believe so.", "It's a private matter, so I'm not aware."] },
          { id: 3, question: "Does she have any health problems?", type: "radio", field: "healthIssues", options: ["Not that I have been told.", "I am not aware of her personal health details."] },
          { id: 4, question: "How is she feeling about trying for a baby?", type: "radio", field: "emotionalState", options: ["She seems fine and manages everything well.", "I can see she is a bit quiet and worried.", "We don't discuss these things openly."] },
          { id: 5, question: "Did she have any IVF treatments in the past?", type: "radio", field: "previousIVF", options: ["No, I don't think so.", "Yes, I believe they have tried before.", "I am not sure."] },
        ];
      case "mother-in-law":
        return [
          { id: 1, question: "How long is your daughter-in-law trying to have a baby?", type: "radio", field: "duration", options: ["For about a year.", "It has been a few years.", "A long time, we are all waiting for good news."] },
          { id: 2, question: "Is she taking any treatment or seeing a doctor?", type: "radio", field: "treatment", options: ["Yes, she is taking treatment from a good doctor.", "I have suggested some doctors to her.", "I'm not fully aware of the details."] },
          { id: 3, question: "Do you see her stressed or worried?", type: "radio", field: "emotionalState", options: ["Yes, I can clearly see she is worried.", "She tries to hide it, but a mother knows.", "She seems to be handling it well."] },
          { id: 4, question: "How do you usually help or talk to her?", type: "radio", field: "support", options: ["I often give her advice and encouragement.", "I try to listen and make her feel comfortable.", "We don't talk about it much to avoid pressure."] },
          { id: 5, question: "Did she have any IVF treatments in the past?", type: "radio", field: "previousIVF", options: ["No, this is the first time.", "Yes, she went through it once before.", "Yes, she has tried a few times."] },
        ];
      case "sibling":
        return [
          { id: 1, question: "How long is your brother/sister trying to have a baby?", type: "radio", field: "duration", options: ["For about a year or so.", "It's been a couple of years.", "A long time, it's been tough."] },
          { id: 2, question: "Are they seeing a doctor or taking treatment?", type: "radio", field: "treatment", options: ["Yes, they are seeing a specialist.", "Yes, but they keep the details private.", "I'm not sure."] },
          { id: 3, question: "Do they have any health problems?", type: "radio", field: "healthIssues", options: ["Yes, my sibling has mentioned something.", "Not that I know of.", "They haven't shared that with me."] },
          { id: 4, question: "How are they feeling?", type: "radio", field: "emotionalState", options: ["They are really stressed and frustrated.", "They are trying to stay positive but it's hard.", "They don't open up about it much."] },
          { id: 5, question: "Did she/his partner have any IVF treatments in the past?", type: "radio", field: "previousIVF", options: ["No, this is their first time.", "Yes, they've been through it before.", "I don't know the details of their past treatments."] },
        ];
      default:
        // Other family member - comprehensive questions
        return [
          { id: 1, question: "How long has the patient been trying to have a baby?", type: "radio", field: "duration", options: ["For about a year.", "It has been a few years.", "A long time.", "I'm not exactly sure."] },
          { id: 2, question: "Are they seeing a doctor or taking any treatment?", type: "radio", field: "treatment", options: ["Yes, they are seeing a specialist.", "Yes, but I'm not sure of the details.", "No, I don't think so.", "I'm not aware."] },
          { id: 3, question: "Do they have any known health problems related to fertility?", type: "radio", field: "healthIssues", options: ["Yes, they have mentioned a condition.", "Not that I know of.", "I'm not sure about their health details."] },
          { id: 4, question: "How are they feeling emotionally about this journey?", type: "radio", field: "emotionalState", options: ["They seem stressed and worried.", "They are trying to stay positive.", "They don't talk about it much.", "I can see it's affecting them."] },
          { id: 5, question: "Have they had any IVF treatments in the past?", type: "radio", field: "previousIVF", options: ["No, this would be their first time.", "Yes, they have tried IVF before.", "Yes, they have had multiple attempts.", "I'm not sure about their treatment history."] },
        ];
    }
  };

  const staticQuestions = getStaticQuestions();

  // Load question from backend API
  const loadQuestionFromAPI = async () => {
    setIsLoading(true);
    try {
      const response = await getOnboardingStep({
        parent_profile_id: parentProfileId,
        relationship_type: relationship,
        current_step: currentStep,
        answers_json: answers,
      });

      if (response.completed) {
        await handleComplete(response.answers_json || answers);
      } else if (response.question) {
        // Map field_name from API to field for component use
        const apiQuestion = response.question;
        const mappedQuestion: Question = {
          id: apiQuestion.id,
          question: apiQuestion.question,
          type: apiQuestion.type,
          field: apiQuestion.field_name || `field_${apiQuestion.id}`,
          options: apiQuestion.options,
          optional: apiQuestion.optional,
        };

        // If API returns invalid data, fall back to static questions
        if (!mappedQuestion.question || !mappedQuestion.field) {
          console.warn("Invalid question data from API, using static questions");
          setUseBackendAPI(false);
          setQuestion(staticQuestions[currentStep - 1]);
          setTotalSteps(staticQuestions.length);
        } else {
          setQuestion(mappedQuestion);
          setTotalSteps(response.total_steps || staticQuestions.length);
        }
      }
    } catch (error) {
      console.error("Failed to load question from API, using static questions:", error);
      setUseBackendAPI(false);
      setQuestion(staticQuestions[currentStep - 1]);
      setTotalSteps(staticQuestions.length);
    }
    setIsLoading(false);
  };

  // Initialize questions
  useEffect(() => {
    if (open) {
      if (useBackendAPI) {
        loadQuestionFromAPI();
      } else {
        setQuestion(staticQuestions[currentStep - 1]);
        setTotalSteps(staticQuestions.length);
      }
    }
  }, [open, currentStep, useBackendAPI]);

  const currentQuestion = question || staticQuestions[currentStep - 1];

  const handleBack = () => {
    console.log("=== handleBack called ===");
    console.log("Current step:", currentStep);

    if (currentStep > 1) {
      const newStep = currentStep - 1;
      console.log("Moving to step:", newStep);
      setCurrentStep(newStep);
    } else {
      console.log("Already at first question, cannot go back");
    }
  };

  const handleComplete = async (finalAnswers?: Record<string, any>) => {
    console.log("=== handleComplete called ===");
    console.log("Total questions:", totalSteps || staticQuestions.length);
    console.log("Current answers:", finalAnswers || answers);

    toast({
      title: "Processing...",
      description: "Preparing your personalized experience.",
    });

    // Normalize all answer keys to snake_case for backend compatibility
    const rawAnswers = finalAnswers || answers;
    const normalizedAnswers: Record<string, any> = {};
    for (const [key, value] of Object.entries(rawAnswers)) {
      const snakeCaseKey = toSnakeCase(key);
      normalizedAnswers[snakeCaseKey] = value;
    }

    const userPreferences = {
      user_id: userId,
      relationship: relationship,
      answers: normalizedAnswers,
      timestamp: new Date().toISOString()
    };

    try {
      // Try to save to backend
      if (userId) {
        try {
          await completeOnboarding({
            user_id: userId,
            relationship_type: relationship, // Will be normalized to snake_case in api.ts
            answers_json: normalizedAnswers,
            parent_profile_id: parentProfileId, // Optional
          });
          console.log("✅ Preferences saved to backend");
        } catch (error) {
          console.error("Failed to save to backend, saving locally:", error);
        }
      }

      // Always save locally as backup
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      console.log("✅ Preferences saved locally");

      toast({
        title: "Profile Saved",
        description: "Your preferences have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Warning",
        description: "Could not save preferences, but we'll continue.",
        variant: "destructive",
      });
    }

    onClose();
    setLocation("/sakhi/try");

    setTimeout(() => {
      toast({
        title: "Welcome to Sakhi!",
        description: "Let's begin your journey together.",
      });
    }, 500);
  };

  const handleNext = async () => {
    console.log("=== BUTTON CLICKED ===");
    console.log("Current step:", currentStep, "Total questions:", totalSteps || staticQuestions.length);

    const currentField = currentQuestion?.field;

    // Validate current question before proceeding
    if (currentQuestion && !currentQuestion.optional && !answers[currentField]) {
      toast({
        title: "Required",
        description: currentQuestion.type === "number" ? "Please enter a value to continue" : "Please select an option to continue",
        variant: "destructive",
      });
      return;
    }

    const maxSteps = totalSteps || staticQuestions.length;
    if (currentStep === maxSteps) {
      console.log("Last question - calling handleComplete");
      await handleComplete();
    } else {
      console.log("Not last question - moving to next");
      setCurrentStep(currentStep + 1);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Help us personalize your experience
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Question {currentStep} of {totalSteps || staticQuestions.length}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

              {currentQuestion.type === "number" ? (
                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder={currentQuestion.optional ? "Enter age (optional)" : "Enter age"}
                    value={answers[currentQuestion.field] || ""}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        [currentQuestion.field]: e.target.value,
                      })
                    }
                    className="text-base"
                    data-testid={`input-${currentQuestion.field}`}
                  />
                  {currentQuestion.optional && (
                    <div className="flex items-center space-x-2">
                      <HeartCheckbox
                        id="not-applicable"
                        checked={answers[currentQuestion.field] === "N/A"}
                        onCheckedChange={(checked) =>
                          setAnswers({
                            ...answers,
                            [currentQuestion.field]: checked ? "N/A" : "",
                          })
                        }
                      />
                      <Label htmlFor="not-applicable" className="cursor-pointer text-sm">
                        Not Applicable
                      </Label>
                    </div>
                  )}
                </div>
              ) : (
                <RadioGroup
                  value={answers[currentQuestion.field]}
                  onValueChange={(value) =>
                    setAnswers({
                      ...answers,
                      [currentQuestion.field]: value,
                    })
                  }
                >
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center gap-3 mb-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                      </div>
                      <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          )}

          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isLoading}
              className="flex-1"
              data-testid="button-back"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className="flex-1 gradient-button text-white"
              data-testid="button-next"
            >
              {currentStep === (totalSteps || staticQuestions.length) ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
