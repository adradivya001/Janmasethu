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
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!storyData.isAnonymous && !storyData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name or choose anonymous.",
        variant: "destructive",
      });
      return;
    }

    if (!storyData.location.trim() || !storyData.duration || !storyData.challenges.trim() || 
        storyData.emotions.length === 0 || storyData.treatments.length === 0 || !storyData.outcome) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setShowConfetti(true);
    setShowSuccess(true);
    
    setTimeout(() => {
      onClose();
      setShowConfetti(false);
      setShowSuccess(false);
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
    }, 4000);
  };

  const handleClose = () => {
    if (!showSuccess) {
      onClose();
    }
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
    <Dialog open={open} onOpenChange={handleClose}>
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

        {showSuccess ? (
          /* Success Message */
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 sm:px-8 py-12 text-center">
            <div className="mb-8 animate-fadeIn">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-white" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Thank You for Sharing! 💝
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-4">
                Your story has been published and will inspire countless families on their journey.
              </p>
              
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Your courage in sharing will bring hope, comfort, and guidance to others who need it most.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>Story Published</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span>Helping Others</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <DialogHeader className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-pink-100 sticky top-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 z-10">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl sm:text-3xl font-serif bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Share Your Journey
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="rounded-full hover:bg-pink-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Your story can guide, heal, and bring hope to another family. 🌸
              </p>
            </DialogHeader>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="px-4 sm:px-8 py-6 space-y-8">
          {/* Welcome Message */}
          <div className="flex gap-3 items-start animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                Hi, I'm here to help you share your journey. Take your time — this is your safe space. ✨
              </p>
            </div>
          </div>

          {/* Section 1: Identity */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              About You
            </h3>

            <div className="space-y-4 bg-white/60 rounded-2xl p-4 sm:p-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  How would you like to share your story? <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={() => setStoryData({ ...storyData, isAnonymous: false })}
                    variant="outline"
                    className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                      !storyData.isAnonymous 
                        ? "bg-pink-100 border-pink-400 text-pink-700" 
                        : "border-pink-300 hover:bg-pink-50 hover:border-pink-400"
                    }`}
                  >
                    With my name
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStoryData({ ...storyData, isAnonymous: true, name: "" })}
                    variant="outline"
                    className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                      storyData.isAnonymous 
                        ? "bg-purple-100 border-purple-400 text-purple-700" 
                        : "border-purple-300 hover:bg-purple-50 hover:border-purple-400"
                    }`}
                  >
                    Anonymous
                  </Button>
                </div>
              </div>

              {!storyData.isAnonymous && (
                <div className="space-y-2 animate-fadeIn">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Your name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={storyData.name}
                    onChange={(e) => setStoryData({ ...storyData, name: e.target.value })}
                    placeholder="What should I call you?"
                    className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Where are you from? <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={storyData.location}
                  onChange={(e) => setStoryData({ ...storyData, location: e.target.value })}
                  placeholder="Your city..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                  How long have you been on this journey? <span className="text-red-500">*</span>
                </Label>
                <select
                  id="duration"
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
              </div>
            </div>
          </div>

          {/* Section 2: Challenges */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Your Journey
            </h3>

            <div className="space-y-4 bg-white/60 rounded-2xl p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="challenges" className="text-sm font-medium text-gray-700">
                  Tell me about the challenges you faced when your journey began <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-gray-500 italic">
                  Write freely — there are no right or wrong answers.
                </p>
                <Textarea
                  id="challenges"
                  value={storyData.challenges}
                  onChange={(e) => setStoryData({ ...storyData, challenges: e.target.value })}
                  placeholder="Your thoughts..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[120px] resize-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                    lineHeight: "32px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Emotions */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Your Emotions
            </h3>

            <div className="space-y-4 bg-white/60 rounded-2xl p-4 sm:p-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  What emotions were a big part of your journey? <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {emotions.map((emotion, idx) => (
                    <button
                      key={emotion}
                      type="button"
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="emotionDetails" className="text-sm font-medium text-gray-700">
                  Would you like to describe how you felt during those moments? (Optional)
                </Label>
                <Textarea
                  id="emotionDetails"
                  value={storyData.emotionDetails}
                  onChange={(e) => setStoryData({ ...storyData, emotionDetails: e.target.value })}
                  placeholder="Your feelings..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[100px] resize-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                    lineHeight: "32px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Treatments */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Your Path
            </h3>

            <div className="space-y-4 bg-white/60 rounded-2xl p-4 sm:p-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  What path or treatments did you explore? <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {treatments.map((treatment, idx) => (
                    <button
                      key={treatment}
                      type="button"
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
              </div>
            </div>
          </div>

          {/* Section 5: Outcome */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Where You Are Now
            </h3>

            <div className="space-y-4 bg-white/60 rounded-2xl p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="outcome" className="text-sm font-medium text-gray-700">
                  Where has your journey led you so far? <span className="text-red-500">*</span>
                </Label>
                <select
                  id="outcome"
                  value={storyData.outcome}
                  onChange={(e) => setStoryData({ ...storyData, outcome: e.target.value })}
                  className="w-full bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base"
                >
                  <option value="">Select outcome...</option>
                  {outcomes.map(outcome => (
                    <option key={outcome} value={outcome}>{outcome}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcomeDetails" className="text-sm font-medium text-gray-700">
                  Tell us more... (Optional)
                </Label>
                <Textarea
                  id="outcomeDetails"
                  value={storyData.outcomeDetails}
                  onChange={(e) => setStoryData({ ...storyData, outcomeDetails: e.target.value })}
                  placeholder="Share more details if you'd like..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Message to Others */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Message of Hope
            </h3>

            <div className="space-y-4 bg-white/60 rounded-2xl p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Would you like to leave a message for another family who might be reading your story? (Optional)
                </Label>
                <Textarea
                  id="message"
                  value={storyData.messageToOthers}
                  onChange={(e) => setStoryData({ ...storyData, messageToOthers: e.target.value })}
                  placeholder="Your message of hope..."
                  className="bg-white/90 border-2 border-pink-200 focus:border-pink-400 rounded-2xl px-4 py-3 text-base min-h-[120px] resize-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                    lineHeight: "32px",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Add a photo (Optional)</Label>
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
                {storyData.uploadedImage && (
                  <img
                    src={storyData.uploadedImage}
                    alt="Preview"
                    className="w-full max-w-xs h-32 object-cover rounded-2xl mt-2"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Final Review Section */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Review & Publish
            </h3>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 space-y-4 border-2 border-purple-100">
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">Your Story Preview</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Shared as:</span>{" "}
                      {storyData.isAnonymous ? "Anonymous" : storyData.name || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {storyData.location || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Journey Duration:</span> {storyData.duration || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Emotions:</span>{" "}
                      {storyData.emotions.length > 0 ? storyData.emotions.join(", ") : "None selected"}
                    </div>
                    <div>
                      <span className="font-medium">Treatments:</span>{" "}
                      {storyData.treatments.length > 0 ? storyData.treatments.join(", ") : "None selected"}
                    </div>
                    <div>
                      <span className="font-medium">Current Status:</span> {storyData.outcome || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-200">
                <p className="text-xs text-gray-600 italic">
                  By publishing, you agree to share your story to help and inspire others on their fertility journey.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4 pb-2">
            <Button
              type="submit"
              className="gradient-button text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
            >
              Review & Publish My Story 💝
            </Button>
          </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}