
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Sparkles, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StorySubmissionFormProps {
  open: boolean;
  onClose: () => void;
}

type Step = 
  | "welcome"
  | "nameChoice"
  | "nameInput"
  | "location"
  | "duration"
  | "challenges"
  | "emotions"
  | "emotionDetails"
  | "treatments"
  | "outcome"
  | "message"
  | "preview"
  | "success";

interface StoryData {
  isAnonymous: boolean;
  name: string;
  location: string;
  duration: string;
  challenges: string;
  emotions: string[];
  emotionDetails: string;
  treatments: string[];
  outcome: string;
  outcomeDetails: string;
  messageToOthers: string;
  uploadedImage: string | null;
}

const emotions = [
  "Hope", "Fear", "Anxiety", "Confusion", "Strength", 
  "Faith", "Gratitude", "Pain", "Relief", "Love"
];

const treatments = [
  "IVF", "IUI", "PCOS care", "Endometriosis treatment",
  "Male infertility", "Genetic testing", "Adoption",
  "Surrogacy", "Still exploring"
];

const outcomes = [
  "Conceived", "Still trying", "Considering alternative options",
  "Adopted", "Chose to pause", "Processing emotionally"
];

export default function StorySubmissionForm({ open, onClose }: StorySubmissionFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("welcome");
  const [isTyping, setIsTyping] = useState(false);
  const [storyData, setStoryData] = useState<StoryData>({
    isAnonymous: false,
    name: "",
    location: "",
    duration: "",
    challenges: "",
    emotions: [],
    emotionDetails: "",
    treatments: [],
    outcome: "",
    outcomeDetails: "",
    messageToOthers: "",
    uploadedImage: null,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const typeMessage = (callback: () => void, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleNext = (nextStep: Step) => {
    typeMessage(() => setStep(nextStep));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoryData({ ...storyData, uploadedImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        setShowConfetti(false);
        toast({
          title: "Story Published! 💝",
          description: "Your journey will inspire others.",
        });
        onClose();
        // Reset form
        setStoryData({
          isAnonymous: false,
          name: "",
          location: "",
          duration: "",
          challenges: "",
          emotions: [],
          emotionDetails: "",
          treatments: [],
          outcome: "",
          outcomeDetails: "",
          messageToOthers: "",
          uploadedImage: null,
        });
        setStep("welcome");
      }, 3000);
    }, 500);
  };

  const toggleEmotion = (emotion: string) => {
    setStoryData({
      ...storyData,
      emotions: storyData.emotions.includes(emotion)
        ? storyData.emotions.filter(e => e !== emotion)
        : [...storyData.emotions, emotion]
    });
  };

  const toggleTreatment = (treatment: string) => {
    setStoryData({
      ...storyData,
      treatments: storyData.treatments.includes(treatment)
        ? storyData.treatments.filter(t => t !== treatment)
        : [...storyData.treatments, treatment]
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-w-[95vw] w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-0 rounded-3xl">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                <Heart
                  className="text-pink-300"
                  style={{
                    width: `${10 + Math.random() * 20}px`,
                    height: `${10 + Math.random() * 20}px`,
                    opacity: 0.6 + Math.random() * 0.4,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-pink-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl sm:text-3xl font-serif bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Share Your Journey
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-pink-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your story can guide, heal, and bring hope to another family.
          </p>
        </DialogHeader>

        {/* Chat Container */}
        <div className="px-4 sm:px-8 py-6 space-y-6 min-h-[400px]">
          {/* Welcome Step */}
          {step === "welcome" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    Hi, I'm here to help you share your journey. 🌸<br />
                    Take your time — this is your safe space.
                  </p>
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => handleNext("nameChoice")}
                  className="gradient-button text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
                >
                  Begin Writing ✨
                </Button>
              </div>
            </div>
          )}

          {/* Name Choice Step */}
          {step === "nameChoice" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    Before we begin, how would you like to share your story?
                  </p>
                </div>
              </div>
              {isTyping && (
                <div className="flex gap-3 items-center justify-start pl-14">
                  <div className="bg-white/60 rounded-full px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              {!isTyping && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 animate-fadeIn">
                  <Button
                    onClick={() => {
                      setStoryData({ ...storyData, isAnonymous: false });
                      handleNext("nameInput");
                    }}
                    variant="outline"
                    className="px-6 py-3 rounded-full border-2 border-pink-300 hover:bg-pink-50 hover:border-pink-400 transition-all duration-300"
                  >
                    With my name
                  </Button>
                  <Button
                    onClick={() => {
                      setStoryData({ ...storyData, isAnonymous: true });
                      handleNext("location");
                    }}
                    variant="outline"
                    className="px-6 py-3 rounded-full border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
                  >
                    Anonymous
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Name Input Step */}
          {step === "nameInput" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    Beautiful. What should I call you?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-3">
                <Input
                  value={storyData.name}
                  onChange={(e) => setStoryData({ ...storyData, name: e.target.value })}
                  placeholder="Your name..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base"
                />
                <Button
                  onClick={() => handleNext("location")}
                  disabled={!storyData.name.trim()}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Location Step */}
          {step === "location" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    Where are you from?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-3">
                <Input
                  value={storyData.location}
                  onChange={(e) => setStoryData({ ...storyData, location: e.target.value })}
                  placeholder="Your city..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base"
                />
                <Button
                  onClick={() => handleNext("duration")}
                  disabled={!storyData.location.trim()}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Duration Step */}
          {step === "duration" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    How long have you been on this journey?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-3">
                <select
                  value={storyData.duration}
                  onChange={(e) => setStoryData({ ...storyData, duration: e.target.value })}
                  className="w-full bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base"
                >
                  <option value="">Select duration...</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
                <Button
                  onClick={() => handleNext("challenges")}
                  disabled={!storyData.duration}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Challenges Step */}
          {step === "challenges" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    Tell me about the challenges you faced when your journey began.
                  </p>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Write freely — there are no right or wrong answers.
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-3">
                <Textarea
                  value={storyData.challenges}
                  onChange={(e) => setStoryData({ ...storyData, challenges: e.target.value })}
                  placeholder="Your thoughts..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[120px] resize-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                    lineHeight: "32px",
                  }}
                />
                <Button
                  onClick={() => handleNext("emotions")}
                  disabled={!storyData.challenges.trim()}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Emotions Step */}
          {step === "emotions" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    What emotions were a big part of your journey?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {emotions.map((emotion, idx) => (
                    <button
                      key={emotion}
                      onClick={() => toggleEmotion(emotion)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        storyData.emotions.includes(emotion)
                          ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md"
                          : "bg-white/80 text-gray-700 border-2 border-pink-200 hover:border-pink-300"
                      }`}
                      style={{
                        animation: `chipBounce 0.5s ease-out ${idx * 0.05}s backwards`,
                      }}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => handleNext("emotionDetails")}
                  disabled={storyData.emotions.length === 0}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Emotion Details Step */}
          {step === "emotionDetails" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    Would you like to describe how you felt during those moments?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-3">
                <Textarea
                  value={storyData.emotionDetails}
                  onChange={(e) => setStoryData({ ...storyData, emotionDetails: e.target.value })}
                  placeholder="Your feelings..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[120px] resize-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                    lineHeight: "32px",
                  }}
                />
                <Button
                  onClick={() => handleNext("treatments")}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Treatments Step */}
          {step === "treatments" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    What path or treatments did you explore?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {treatments.map((treatment, idx) => (
                    <button
                      key={treatment}
                      onClick={() => toggleTreatment(treatment)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        storyData.treatments.includes(treatment)
                          ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-md"
                          : "bg-white/80 text-gray-700 border-2 border-blue-200 hover:border-blue-300"
                      }`}
                      style={{
                        animation: `chipBounce 0.5s ease-out ${idx * 0.05}s backwards`,
                      }}
                    >
                      {treatment}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => handleNext("outcome")}
                  disabled={storyData.treatments.length === 0}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Outcome Step */}
          {step === "outcome" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn">
                  <p className="text-gray-700 leading-relaxed">
                    Where has your journey led you so far?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-3">
                <select
                  value={storyData.outcome}
                  onChange={(e) => setStoryData({ ...storyData, outcome: e.target.value })}
                  className="w-full bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base"
                >
                  <option value="">Select outcome...</option>
                  {outcomes.map(outcome => (
                    <option key={outcome} value={outcome}>{outcome}</option>
                  ))}
                </select>
                <Textarea
                  value={storyData.outcomeDetails}
                  onChange={(e) => setStoryData({ ...storyData, outcomeDetails: e.target.value })}
                  placeholder="Tell us more... (optional)"
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[80px] resize-none"
                />
                <Button
                  onClick={() => handleNext("message")}
                  disabled={!storyData.outcome}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Message to Others Step */}
          {step === "message" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm animate-slideIn relative">
                  <Sparkles className="absolute top-2 right-2 w-4 h-4 text-purple-400 opacity-50" />
                  <p className="text-gray-700 leading-relaxed">
                    Would you like to leave a message for another family who might be reading your story?
                  </p>
                </div>
              </div>
              <div className="pl-0 sm:pl-14 space-y-3">
                <Textarea
                  value={storyData.messageToOthers}
                  onChange={(e) => setStoryData({ ...storyData, messageToOthers: e.target.value })}
                  placeholder="Your message of hope..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[120px] resize-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                    lineHeight: "32px",
                  }}
                />
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">Add a photo (optional)</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer px-4 py-2 bg-white/80 border-2 border-pink-200 rounded-full text-sm font-medium hover:border-pink-300 transition-all duration-300 flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </label>
                    {storyData.uploadedImage && (
                      <span className="text-sm text-green-600">✓ Image added</span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => handleNext("preview")}
                  className="gradient-button text-white px-6 py-2 rounded-full"
                >
                  Preview Story →
                </Button>
              </div>
            </div>
          )}

          {/* Preview Step */}
          {step === "preview" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-pink-200 transform perspective-1000 animate-pageFlip">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-pink-100 pb-4">
                    <Heart className="w-6 h-6 text-pink-500" />
                    <h3 className="text-xl font-serif text-gray-800">
                      {storyData.isAnonymous ? "Anonymous Story" : storyData.name}'s Journey
                    </h3>
                  </div>
                  
                  {storyData.uploadedImage && (
                    <img
                      src={storyData.uploadedImage}
                      alt="Story"
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                  )}
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-purple-700">Location:</span>
                      <span className="ml-2 text-gray-700">{storyData.location}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Duration:</span>
                      <span className="ml-2 text-gray-700">{storyData.duration}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Challenges:</span>
                      <p className="mt-1 text-gray-700 leading-relaxed">{storyData.challenges}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Emotions:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {storyData.emotions.map(emotion => (
                          <span key={emotion} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </div>
                    {storyData.messageToOthers && (
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 mt-4">
                        <p className="text-gray-700 italic leading-relaxed">"{storyData.messageToOthers}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleSubmit}
                  className="gradient-button text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Publish My Story 💝
                </Button>
                <Button
                  onClick={() => setStep("welcome")}
                  variant="outline"
                  className="px-8 py-3 rounded-full border-2 border-gray-300 hover:border-gray-400"
                >
                  Edit Story
                </Button>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === "success" && (
            <div className="space-y-6 animate-fadeIn text-center py-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center animate-pulse">
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-serif bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Thank you for trusting us with your journey
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your story will bring strength to another family.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
