
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowLeft, ArrowRight, Upload, X, Sparkles, CheckCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";

interface StorySubmissionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const emotions = [
  "Hope", "Fear", "Anxiety", "Patience", "Gratitude", "Loss", "Strength", "Relief"
];

const treatments = [
  "IVF", "IUI", "PCOS", "Male Infertility", "Others"
];

const outcomes = [
  "Still on the journey",
  "Successful pregnancy",
  "Exploring options",
  "Adoption",
  "Surrogacy",
  "Other"
];

const StorySubmissionForm = ({ open, onOpenChange }: StorySubmissionFormProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    anonymous: false,
    city: "",
    age: "",
    relationshipStatus: "",
    challenge: "",
    selectedTreatments: [] as string[],
    journeyDuration: "",
    selectedEmotions: [] as string[],
    emotionalExperience: "",
    outcome: "",
    messageToOthers: "",
    photos: [] as File[]
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    setDirection('forward');
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setDirection('backward');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const toggleEmotion = (emotion: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmotions: prev.selectedEmotions.includes(emotion)
        ? prev.selectedEmotions.filter(e => e !== emotion)
        : [...prev.selectedEmotions, emotion]
    }));
  };

  const toggleTreatment = (treatment: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTreatments: prev.selectedTreatments.includes(treatment)
        ? prev.selectedTreatments.filter(t => t !== treatment)
        : [...prev.selectedTreatments, treatment]
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files!)]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-12 px-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-orange-400/20 blur-3xl animate-pulse"></div>
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto relative animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold text-foreground font-serif mb-4">
              Thank you for sharing your story!
            </h2>
            <p className="text-muted-foreground mb-8">
              Your journey will bring strength and hope to others.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                onOpenChange(false);
              }}
              className="gradient-button-secondary text-white rounded-full px-8"
            >
              Go to Success Stories
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6 pt-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-orange-400/20 blur-2xl"></div>
            <Heart className="w-16 h-16 text-pink-500 mx-auto relative animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-foreground font-serif mb-2 animate-fade-in">
            Share Your Journey
          </h2>
          <p className="text-muted-foreground animate-fade-in-up">
            Your experience can bring hope, courage, and clarity to others on the same path.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Form Steps */}
        <div className={`transition-all duration-500 ${direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
          {/* Step 1: About You */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground font-serif mb-4">About You</h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Your Name (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.anonymous}
                      onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
                      className="rounded"
                    />
                    <Label htmlFor="anonymous" className="text-sm text-muted-foreground">Share anonymously</Label>
                  </div>
                </div>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={formData.anonymous}
                  className="focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (Optional)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="focus:ring-2 focus:ring-pink-400 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship Status</Label>
                  <select
                    id="relationship"
                    value={formData.relationshipStatus}
                    onChange={(e) => setFormData(prev => ({ ...prev, relationshipStatus: e.target.value }))}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-pink-400 transition-all"
                  >
                    <option value="">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Your Journey */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground font-serif mb-4">Tell us about your journey</h3>
              
              <div className="space-y-2">
                <Label htmlFor="challenge">What challenge were you facing?</Label>
                <Textarea
                  id="challenge"
                  value={formData.challenge}
                  onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                  rows={4}
                  className="focus:ring-2 focus:ring-pink-400 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground">Share what you're comfortable with</p>
              </div>

              <div className="space-y-2">
                <Label>What treatments did you try?</Label>
                <div className="flex flex-wrap gap-2">
                  {treatments.map((treatment) => (
                    <Badge
                      key={treatment}
                      variant={formData.selectedTreatments.includes(treatment) ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleTreatment(treatment)}
                    >
                      {treatment}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">How long was your journey?</Label>
                <select
                  id="duration"
                  value={formData.journeyDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, journeyDuration: e.target.value }))}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-pink-400 transition-all"
                >
                  <option value="">Select</option>
                  <option value="<6months">Less than 6 months</option>
                  <option value="6-12months">6-12 months</option>
                  <option value="1-2years">1-2 years</option>
                  <option value="2-3years">2-3 years</option>
                  <option value=">3years">More than 3 years</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Emotional Experience */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground font-serif mb-4">What emotions did you go through?</h3>
              
              <div className="space-y-2">
                <Label>Select emotions that resonate with you</Label>
                <div className="flex flex-wrap gap-2">
                  {emotions.map((emotion, index) => (
                    <Badge
                      key={emotion}
                      variant={formData.selectedEmotions.includes(emotion) ? "default" : "outline"}
                      className={`cursor-pointer hover:scale-105 transition-all ${
                        formData.selectedEmotions.includes(emotion) ? 'bg-gradient-to-r from-pink-500 to-purple-500' : ''
                      }`}
                      onClick={() => toggleEmotion(emotion)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emotional">Describe how you felt and what helped you cope</Label>
                <Textarea
                  id="emotional"
                  value={formData.emotionalExperience}
                  onChange={(e) => setFormData(prev => ({ ...prev, emotionalExperience: e.target.value }))}
                  rows={4}
                  className="focus:ring-2 focus:ring-pink-400 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: The Outcome */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground font-serif mb-4">Where did your journey lead you?</h3>
              
              <div className="space-y-2">
                <Label>Outcome</Label>
                <div className="space-y-2">
                  {outcomes.map((outcome) => (
                    <label key={outcome} className="flex items-center space-x-2 cursor-pointer p-3 rounded-lg hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="outcome"
                        value={outcome}
                        checked={formData.outcome === outcome}
                        onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
                        className="text-pink-500"
                      />
                      <span>{outcome}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">A message you want to leave for others</Label>
                <Textarea
                  id="message"
                  value={formData.messageToOthers}
                  onChange={(e) => setFormData(prev => ({ ...prev, messageToOthers: e.target.value }))}
                  rows={4}
                  className="focus:ring-2 focus:ring-pink-400 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 5: Add Photos */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground font-serif mb-4">Add Photos (Optional)</h3>
              
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-pink-400 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Drag & drop photos here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button type="button" variant="outline" className="cursor-pointer" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
              </div>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground font-serif mb-4">Review Your Story</h3>
              
              <Card className="rounded-3xl p-6 bg-gradient-to-br from-pink-50/50 to-purple-50/50">
                <CardContent className="space-y-4 p-0">
                  {!formData.anonymous && formData.name && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="text-foreground">{formData.name}</p>
                    </div>
                  )}
                  {formData.city && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">City</p>
                      <p className="text-foreground">{formData.city}</p>
                    </div>
                  )}
                  {formData.challenge && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Challenge</p>
                      <p className="text-foreground">{formData.challenge}</p>
                    </div>
                  )}
                  {formData.selectedTreatments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Treatments</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedTreatments.map(t => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {formData.outcome && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Outcome</p>
                      <p className="text-foreground">{formData.outcome}</p>
                    </div>
                  )}
                  {formData.messageToOthers && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Message to Others</p>
                      <p className="text-foreground italic">"{formData.messageToOthers}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          <div className="ml-auto">
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                className="gradient-button-secondary text-white rounded-full hover:scale-105 transition-transform"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gradient-button-secondary text-white rounded-full hover:scale-105 transition-transform"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Submit Story
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StorySubmissionForm;
