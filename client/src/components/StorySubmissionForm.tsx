
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Sparkles, Upload, X, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StorySubmissionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmitted?: (story: any) => void;
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

export default function StorySubmissionForm({ open, onClose, onSubmitted }: StorySubmissionFormProps) {
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
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

  const handleContinueToPreview = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation with focus on first missing field
    if (!storyData.isAnonymous && !storyData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name or choose anonymous.",
        variant: "destructive",
      });
      document.getElementById('name')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('name')?.focus();
      return;
    }

    if (!storyData.location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter your location.",
        variant: "destructive",
      });
      document.getElementById('location')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('location')?.focus();
      return;
    }

    if (!storyData.duration) {
      toast({
        title: "Duration Required",
        description: "Please select journey duration.",
        variant: "destructive",
      });
      document.getElementById('duration')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('duration')?.focus();
      return;
    }

    if (!storyData.challenges.trim()) {
      toast({
        title: "Challenges Required",
        description: "Please describe your challenges.",
        variant: "destructive",
      });
      document.getElementById('challenges')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('challenges')?.focus();
      return;
    }

    if (storyData.emotions.length === 0) {
      toast({
        title: "Emotions Required",
        description: "Please select at least one emotion.",
        variant: "destructive",
      });
      document.querySelector('[data-section="emotions"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!storyData.emotionDetails.trim()) {
      toast({
        title: "Emotion Details Required",
        description: "Please describe how you felt during those moments.",
        variant: "destructive",
      });
      document.getElementById('emotionDetails')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('emotionDetails')?.focus();
      return;
    }

    if (storyData.treatments.length === 0) {
      toast({
        title: "Treatments Required",
        description: "Please select at least one treatment.",
        variant: "destructive",
      });
      document.querySelector('[data-section="treatments"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!storyData.outcome) {
      toast({
        title: "Outcome Required",
        description: "Please select your current status.",
        variant: "destructive",
      });
      document.getElementById('outcome')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('outcome')?.focus();
      return;
    }

    if (!storyData.outcomeDetails.trim()) {
      toast({
        title: "Outcome Details Required",
        description: "Please tell us more about your journey.",
        variant: "destructive",
      });
      document.getElementById('outcomeDetails')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('outcomeDetails')?.focus();
      return;
    }

    if (!storyData.messageToOthers.trim()) {
      toast({
        title: "Message Required",
        description: "Please leave a message for others.",
        variant: "destructive",
      });
      document.getElementById('message')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('message')?.focus();
      return;
    }

    setConsentAccepted(false);
    setShowPreview(true);
  };

  const handlePublish = async () => {
    try {
      // Build payload matching backend schema exactly
      const payload = {
        isAnonymous: String(storyData.isAnonymous),
        name: storyData.isAnonymous ? "Anonymous" : storyData.name,
        city: storyData.location,
        duration: storyData.duration,
        challenges: storyData.challenges,
        emotions: storyData.emotions,
        emotionDetails: storyData.emotionDetails || "",
        treatments: storyData.treatments,
        outcome: storyData.outcome,
        outcomeDetails: storyData.outcomeDetails || "",
        messageToOthers: storyData.messageToOthers || "",
        uploadedImage: storyData.uploadedImage,
        consent_accepted: true,
        title: storyData.isAnonymous ? "Anonymous" : storyData.name,
        summary: storyData.challenges,
        stage: storyData.outcome,
        language: "English",
        slug: (storyData.isAnonymous ? "anonymous" : storyData.name.toLowerCase().replace(/\s+/g, '-')) + '-' + Date.now()
      };

      console.log("📤 Sending payload to ngrok:", JSON.stringify(payload, null, 2));

      // Submit story to external backend via proxy
      const response = await fetch("/api/proxy/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(payload),
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to submit story");
      }

      const responseData = await response.json();
      console.log("📥 Response data:", responseData);

      // Show success animation
      setShowConfetti(true);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowConfetti(false);
        setShowSuccess(false);
        setShowPreview(false);
        setConsentAccepted(false);
        
        // Pass response.data to parent (this gets prepended to the grid)
        if (responseData.data) {
          onSubmitted?.(responseData);
        } else {
          onSubmitted?.(responseData);
        }
        
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
      }, 4000);
    } catch (error: any) {
      console.error("❌ Error submitting story:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit your story. Please try again.",
        variant: "destructive",
      });
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

  const handleClose = () => {
    setShowPreview(false);
    setShowSuccess(false);
    setConsentAccepted(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="story-dialog sm:max-w-xl max-w-[92vw] w-full max-h-[70vh] sm:max-h-[80vh] overflow-y-auto p-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-0 rounded-xl sm:rounded-2xl mx-auto shadow-2xl">
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

        {/* Success Message - Redesigned */}
        {showSuccess ? (
          <div className="px-4 sm:px-6 py-8 sm:py-10 text-center relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-3 right-3 rounded-full bg-gray-100 hover:bg-gray-200 w-8 h-8 dialog-close-button"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Success Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 font-serif">
              Thank You!
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-sm mx-auto leading-relaxed">
              Your story has been shared and will inspire other families on their journey.
            </p>
            
            <div className="flex justify-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Published
              </div>
              <div className="flex items-center gap-1.5 bg-pink-50 text-pink-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <Heart className="w-3.5 h-3.5" />
                Inspiring Others
              </div>
            </div>
            
            <p className="text-xs text-gray-500">
              Your courage will light the way for others
            </p>
          </div>
        ) : showPreview ? (
          <>
            {/* Preview Header */}
            <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-pink-100 sticky top-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 z-10">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreview(false)}
                  className="rounded-full hover:bg-pink-100 w-8 h-8 flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <DialogTitle className="text-lg sm:text-xl font-serif bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Preview Story
                </DialogTitle>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                Review your story before publishing.
              </p>
            </DialogHeader>

            {/* Preview Content */}
            <div className="px-4 sm:px-8 py-6 space-y-6">
              {/* Story Card Preview */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-pink-100">
                {storyData.uploadedImage && (
                  <img
                    src={storyData.uploadedImage}
                    alt="Story"
                    className="w-full h-48 object-cover rounded-2xl mb-6"
                  />
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Author</h3>
                    <p className="text-lg font-semibold text-gray-800">
                      {storyData.isAnonymous ? "Anonymous" : storyData.name}
                    </p>
                    <p className="text-sm text-gray-600">{storyData.location}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Journey Duration</h3>
                    <p className="text-base text-gray-800">{storyData.duration}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">The Challenges</h3>
                    <p className="text-base text-gray-800 leading-relaxed">{storyData.challenges}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Emotions Felt</h3>
                    <div className="flex flex-wrap gap-2">
                      {storyData.emotions.map((emotion) => (
                        <span
                          key={emotion}
                          className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                    {storyData.emotionDetails && (
                      <p className="text-base text-gray-800 leading-relaxed mt-3">{storyData.emotionDetails}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Treatments Explored</h3>
                    <div className="flex flex-wrap gap-2">
                      {storyData.treatments.map((treatment) => (
                        <span
                          key={treatment}
                          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {treatment}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Current Status</h3>
                    <p className="text-base text-gray-800">{storyData.outcome}</p>
                    {storyData.outcomeDetails && (
                      <p className="text-base text-gray-800 leading-relaxed mt-2">{storyData.outcomeDetails}</p>
                    )}
                  </div>

                  {storyData.messageToOthers && (
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border-l-4 border-pink-400">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Message to Others</h3>
                      <p className="text-base text-gray-800 leading-relaxed italic">"{storyData.messageToOthers}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Consent Agreement Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Consent / Release
                </h3>
                
                <div className="bg-white rounded-2xl p-5 mb-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-3">Publication & Media Release</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    I confirm I am the person described (or have permission). I grant JanmaSethu the right to publish my story, photos, and videos on janmasethu.com and related channels.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    I understand I can request edits or removal later.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-blue-100">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="consent-checkbox" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                    I have read and agree to the consent and release terms above. I authorize JanmaSethu to publish my story.
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 pb-2">
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="outline"
                  className="px-6 py-3 rounded-full border-2 border-pink-300 hover:bg-pink-50 text-base"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit Story
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={!consentAccepted}
                  className="gradient-button text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Publish My Story 💝
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-pink-100 sticky top-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 z-10">
              <div className="flex items-center justify-between pr-8">
                <DialogTitle className="text-lg sm:text-xl font-serif bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Share Your Journey
                </DialogTitle>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your story can guide, heal, and bring hope to another family.
              </p>
            </DialogHeader>

            {/* Form Container */}
            <form onSubmit={handleContinueToPreview} className="px-4 sm:px-8 py-6 space-y-8">
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
              <div className="space-y-4 animate-fadeIn" data-section="emotions">
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
                      Describe how you felt during those moments <span className="text-red-500">*</span>
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
              <div className="space-y-4 animate-fadeIn" data-section="treatments">
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
                      Tell us more about your journey <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="outcomeDetails"
                      value={storyData.outcomeDetails}
                      onChange={(e) => setStoryData({ ...storyData, outcomeDetails: e.target.value })}
                      placeholder="Share more details..."
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
                      Leave a message for another family who might be reading your story <span className="text-red-500">*</span>
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

              {/* Submit Button */}
              <div className="flex justify-center pt-4 pb-2">
                <Button
                  type="submit"
                  className="gradient-button text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
                >
                  Continue to Preview →
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
