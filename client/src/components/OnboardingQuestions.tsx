import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface OnboardingQuestionsProps {
  open: boolean;
  onClose: () => void;
  relationship?: string;
  userId?: string;
}

export default function OnboardingQuestions({ open, onClose, relationship = "herself", userId }: OnboardingQuestionsProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Define questions based on relationship
  const getQuestions = () => {
    switch (relationship) {
      case "herself":
        return [
          {
            id: 1,
            question: "What is your age?",
            type: "number",
            field: "age",
          },
          {
            id: 2,
            question: "How long have you been actively trying to conceive?",
            type: "radio",
            field: "tryingDuration",
            options: [
              "Less than 6 months",
              "6 - 12 months",
              "1 - 2 years",
              "More than 2 years",
            ],
          },
          {
            id: 3,
            question: "Have you had any previous fertility treatments?",
            type: "radio",
            field: "previousTreatments",
            options: [
              "No, this is my first time exploring options.",
              "Yes, medications for ovulation only.",
              "Yes, IUI (Intrauterine Insemination).",
              "Yes, IVF (In Vitro Fertilization).",
            ],
          },
          {
            id: 4,
            question: "Have you or your partner been diagnosed with any specific conditions?",
            type: "radio",
            field: "diagnosis",
            options: [
              "Yes, a condition related to me (e.g., PCOS, Blocked Tubes).",
              "Yes, a condition related to my partner (e.g., Low Sperm Count).",
              "Yes, we both have contributing factors.",
              "No, our infertility is unexplained.",
              "We haven't been diagnosed with anything yet.",
            ],
          },
          {
            id: 5,
            question: "If applicable, what is your partner's age?",
            type: "number",
            field: "partnerAge",
            optional: true,
          },
          {
            id: 6,
            question: "Have you ever been pregnant before?",
            type: "radio",
            field: "previousPregnancy",
            options: [
              "No, I have never been pregnant.",
              "Yes, I have had a child.",
              "Yes, but the pregnancy ended in a loss (e.g., miscarriage).",
            ],
          },
          {
            id: 7,
            question: "What is your biggest priority or concern right now?",
            type: "radio",
            field: "priority",
            options: [
              "Understanding the medical process and steps.",
              "Managing emotional stress and anxiety.",
              "Information on costs and financial planning.",
              "Lifestyle, diet, and wellness advice.",
            ],
          },
        ];

      case "himself":
        return [
          {
            id: 1,
            question: "Are you and your partner trying to have a baby?",
            type: "radio",
            field: "tryingForBaby",
            options: [
              "Yes, we are actively trying.",
              "We are planning to start soon.",
              "We are just exploring our options for now.",
            ],
          },
          {
            id: 2,
            question: "Do you have smoking and drinking habits?",
            type: "radio",
            field: "smokingDrinking",
            options: [
              "No, I do not smoke or drink.",
              "I smoke occasionally or socially.",
              "I drink occasionally or socially.",
              "I smoke and/or drink regularly (most days).",
            ],
          },
          {
            id: 3,
            question: "Have you or your partner done any fertility tests?",
            type: "radio",
            field: "fertilityTests",
            options: [
              "No, neither of us has been tested yet.",
              "Yes, my partner has had some tests.",
              "Yes, I have had a semen analysis.",
              "Yes, both of us have been tested.",
            ],
          },
          {
            id: 4,
            question: "Do you or your partner have any health problems?",
            type: "radio",
            field: "healthProblems",
            options: [
              "No, we have no known health problems.",
              "Yes, I have a health condition.",
              "Yes, my partner has a health condition.",
              "Yes, we both have some health conditions.",
            ],
          },
          {
            id: 5,
            question: "Has your partner had any IVF treatments in the past?",
            type: "radio",
            field: "previousIVF",
            options: [
              "No, this would be her first time.",
              "Yes, she has had one IVF cycle before.",
              "Yes, she has had more than one IVF cycle.",
              "I'm not sure about her past treatment details.",
            ],
          },
        ];

      case "father":
        return [
          {
            id: 1,
            question: "How long is your daughter trying to have a baby?",
            type: "radio",
            field: "duration",
            options: [
              "For about a year.",
              "It has been a few years.",
              "A long time, it's been difficult.",
              "I'm not exactly sure.",
            ],
          },
          {
            id: 2,
            question: "Is she seeing a doctor or taking treatment?",
            type: "radio",
            field: "treatment",
            options: [
              "Yes, I believe she is under a doctor's care.",
              "No, I don't think she has started yet.",
              "I'm not aware of the details.",
            ],
          },
          {
            id: 3,
            question: "Does she have any health problems like PCOS or thyroid?",
            type: "radio",
            field: "healthIssues",
            options: [
              "Yes, she has mentioned a health issue.",
              "Not that I know of.",
              "I'm not sure about her specific health details.",
            ],
          },
          {
            id: 4,
            question: "How is she feeling? Is she worried or stressed?",
            type: "radio",
            field: "emotionalState",
            options: [
              "She seems a bit quiet and worried.",
              "She tries to be positive, but I can tell it's hard.",
              "I am very concerned about her stress.",
            ],
          },
          {
            id: 5,
            question: "Did she have any IVF treatments in the past?",
            type: "radio",
            field: "previousIVF",
            options: [
              "No, I believe this is her first time.",
              "Yes, she has tried before.",
              "I am not sure about her past treatments.",
            ],
          },
        ];

      case "mother":
        return [
          {
            id: 1,
            question: "How long is your daughter trying to have a baby?",
            type: "radio",
            field: "duration",
            options: [
              "For less than a year.",
              "It has been 1 to 2 years.",
              "More than 2 years now.",
            ],
          },
          {
            id: 2,
            question: "Has she seen a doctor or done any tests?",
            type: "radio",
            field: "medicalCare",
            options: [
              "Yes, she is seeing a specialist.",
              "Yes, she has done some tests.",
              "No, I have been encouraging her to go.",
              "I'm not sure what the current status is.",
            ],
          },
          {
            id: 3,
            question: "Does she have any health problems?",
            type: "radio",
            field: "healthIssues",
            options: [
              "Yes, she has told me about a condition she has.",
              "As far as I know, she is healthy.",
              "I suspect there might be an issue, but I don't know for sure.",
            ],
          },
          {
            id: 4,
            question: "How is she feeling about trying for a baby?",
            type: "radio",
            field: "emotionalState",
            options: [
              "She is very stressed and disheartened.",
              "She stays hopeful but has difficult days.",
              "She confides in me and shares all her worries.",
            ],
          },
          {
            id: 5,
            question: "Did she have any IVF treatments in the past?",
            type: "radio",
            field: "previousIVF",
            options: [
              "No, this is her first attempt.",
              "Yes, she has been through a cycle before.",
              "Yes, she has had multiple attempts.",
            ],
          },
        ];

      case "father-in-law":
        return [
          {
            id: 1,
            question: "How long is your daughter-in-law trying to have a baby?",
            type: "radio",
            field: "duration",
            options: [
              "I believe it has been over a year.",
              "For a few years now.",
              "I am not exactly sure of the timeline.",
            ],
          },
          {
            id: 2,
            question: "Is she seeing a doctor or taking treatment?",
            type: "radio",
            field: "treatment",
            options: [
              "Yes, I think she and my son are seeing someone.",
              "I don't believe so.",
              "It's a private matter, so I'm not aware.",
            ],
          },
          {
            id: 3,
            question: "Does she have any health problems?",
            type: "radio",
            field: "healthIssues",
            options: [
              "Not that I have been told.",
              "I am not aware of her personal health details.",
            ],
          },
          {
            id: 4,
            question: "How is she feeling about trying for a baby?",
            type: "radio",
            field: "emotionalState",
            options: [
              "She seems fine and manages everything well.",
              "I can see she is a bit quiet and worried.",
              "We don't discuss these things openly.",
            ],
          },
          {
            id: 5,
            question: "Did she have any IVF treatments in the past?",
            type: "radio",
            field: "previousIVF",
            options: [
              "No, I don't think so.",
              "Yes, I believe they have tried before.",
              "I am not sure.",
            ],
          },
        ];

      case "mother-in-law":
        return [
          {
            id: 1,
            question: "How long is your daughter-in-law trying to have a baby?",
            type: "radio",
            field: "duration",
            options: [
              "For about a year.",
              "It has been a few years.",
              "A long time, we are all waiting for good news.",
            ],
          },
          {
            id: 2,
            question: "Is she taking any treatment or seeing a doctor?",
            type: "radio",
            field: "treatment",
            options: [
              "Yes, she is taking treatment from a good doctor.",
              "I have suggested some doctors to her.",
              "I'm not fully aware of the details.",
            ],
          },
          {
            id: 3,
            question: "Do you see her stressed or worried?",
            type: "radio",
            field: "emotionalState",
            options: [
              "Yes, I can clearly see she is worried.",
              "She tries to hide it, but a mother knows.",
              "She seems to be handling it well.",
            ],
          },
          {
            id: 4,
            question: "How do you usually help or talk to her?",
            type: "radio",
            field: "support",
            options: [
              "I often give her advice and encouragement.",
              "I try to listen and make her feel comfortable.",
              "We don't talk about it much to avoid pressure.",
            ],
          },
          {
            id: 5,
            question: "Did she have any IVF treatments in the past?",
            type: "radio",
            field: "previousIVF",
            options: [
              "No, this is the first time.",
              "Yes, she went through it once before.",
              "Yes, she has tried a few times.",
            ],
          },
        ];

      case "sibling":
        return [
          {
            id: 1,
            question: "How long is your brother/sister trying to have a baby?",
            type: "radio",
            field: "duration",
            options: [
              "For about a year or so.",
              "It's been a couple of years.",
              "A long time, it's been tough.",
            ],
          },
          {
            id: 2,
            question: "Are they seeing a doctor or taking treatment?",
            type: "radio",
            field: "treatment",
            options: [
              "Yes, they are seeing a specialist.",
              "Yes, but they keep the details private.",
              "I'm not sure.",
            ],
          },
          {
            id: 3,
            question: "Do they have any health problems?",
            type: "radio",
            field: "healthIssues",
            options: [
              "Yes, my sibling has mentioned something.",
              "Not that I know of.",
              "They haven't shared that with me.",
            ],
          },
          {
            id: 4,
            question: "How are they feeling?",
            type: "radio",
            field: "emotionalState",
            options: [
              "They are really stressed and frustrated.",
              "They are trying to stay positive but it's hard.",
              "They don't open up about it much.",
            ],
          },
          {
            id: 5,
            question: "Did she/his partner have any IVF treatments in the past?",
            type: "radio",
            field: "previousIVF",
            options: [
              "No, this is their first time.",
              "Yes, they've been through it before.",
              "I don't know the details of their past treatments.",
            ],
          },
        ];

      default:
        return [
          {
            id: 1,
            question: "How long has the patient been trying to have a baby?",
            type: "radio",
            field: "duration",
            options: [
              "For about a year.",
              "It has been a few years.",
              "A long time.",
              "I'm not exactly sure.",
            ],
          },
        ];
    }
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentStep - 1];

  const handleNext = () => {
    const currentField = currentQuestion.field;

    if (!currentQuestion.optional && !answers[currentField]) {
      toast({
        title: "Required",
        description: currentQuestion.type === "number" ? "Please enter a value to continue" : "Please select an option to continue",
        variant: "destructive",
      });
      return;
    }

    console.log("Moving to next question. Current answers:", answers);
    console.log("Current step:", currentStep, "Total questions:", questions.length);

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Last question answered. Calling handleComplete...");
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    console.log("=== handleComplete called ===");
    console.log("Total questions:", questions.length);
    console.log("Current answers:", answers);
    
    // Validate required questions are answered (excluding optional ones)
    const requiredQuestions = questions.filter(q => !q.optional);
    const answeredRequired = requiredQuestions.every(q => answers[q.field]);

    console.log("Required questions:", requiredQuestions.map(q => q.field));
    console.log("All required answered:", answeredRequired);

    if (!answeredRequired) {
      toast({
        title: "Please answer all required questions",
        description: "Complete all required questions before proceeding.",
        variant: "destructive",
      });
      return;
    }

    // Use userId from props
    console.log("User ID from props:", userId);

    if (!userId) {
      console.error("No user ID provided");
      toast({
        title: "Error",
        description: "User ID not found. Please try signing up again.",
        variant: "destructive",
      });
      return;
    }

    // Prepare data to send to webhook
    const onboardingData = {
      userId: userId,
      relationship: relationship,
      answers: answers,
      timestamp: new Date().toISOString(),
    };

    console.log("=== Preparing to send to webhook ===");
    console.log("Webhook URL: https://n8n.ottobon.in/webhook/pp");
    console.log("Payload:", JSON.stringify(onboardingData, null, 2));

    // Show loading toast
    toast({
      title: "Processing...",
      description: "Preparing your personalized experience.",
    });

    try {
      console.log("Sending POST request to webhook...");
      console.log("Request payload:", JSON.stringify(onboardingData, null, 2));
      
      // Send to webhook
      const webhookResponse = await fetch("https://n8n.ottobon.in/webhook/pp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(onboardingData),
      });

      console.log("Webhook response status:", webhookResponse.status);
      const responseData = await webhookResponse.text();
      console.log("Webhook response:", responseData);
      console.log("Webhook data sent successfully with userId:", userId);

    } catch (error) {
      console.error("=== Webhook Error ===");
      console.error("Error:", error);
      // Continue with navigation even if webhook fails
    }

    // Close modal first
    console.log("Closing onboarding modal...");
    onClose();

    // Navigate to /sakhi/try with a small delay
    console.log("Scheduling navigation to /sakhi/try...");
    setTimeout(() => {
      console.log("Executing navigation to /sakhi/try");
      setLocation("/sakhi/try");
      
      // Show welcome toast after navigation
      toast({
        title: "Welcome to Sakhi!",
        description: "Let's begin your journey together.",
      });
    }, 300);
  };


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Help us personalize your experience
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Question {currentStep} of {questions.length}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
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
                />
                {currentQuestion.optional && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
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
                  <div key={index} className="flex items-center space-x-3 mb-3">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                console.log("=== BUTTON CLICKED ===");
                console.log("Current step:", currentStep, "Total questions:", questions.length);
                
                if (currentStep === questions.length) {
                  console.log("Last question - calling handleComplete");
                  handleComplete();
                } else {
                  console.log("Not last question - calling handleNext");
                  handleNext();
                }
              }}
              className="flex-1 gradient-button text-white"
            >
              {currentStep === questions.length ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}