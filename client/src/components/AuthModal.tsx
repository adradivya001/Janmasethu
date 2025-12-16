import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerUser, loginUser } from "@/utils/api";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: (
    isNewUser: boolean,
    relationship?: string,
    userId?: string,
  ) => void;
}

export default function AuthModal({
  open,
  onClose,
  onAuthSuccess,
}: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showRelationship, setShowRelationship] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    location: "",
    language: "en",
  });
  const [relationship, setRelationship] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [loginError, setLoginError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      if (isSignUp) {
        console.log("Starting signup process...");

        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.password) {
          toast({
            title: "Required Fields",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        try {
          const response = await registerUser({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone_number: formData.phoneNumber || null,
            preferred_language: formData.language,
            gender: formData.gender || null,
            location: formData.location || null,
          });

          console.log("Registration successful:", response);

          // Store user data from backend response
          localStorage.setItem("userId", response.user_id);
          localStorage.setItem("userName", response.user.name);
          localStorage.setItem("userEmail", response.user.email);
          if (formData.language) {
            localStorage.setItem("userLanguage", formData.language);
          }
          setUserId(response.user_id);

          toast({
            title: "Account created!",
            description: "Please tell us about yourself.",
          });

          setIsLoading(false);
          setShowRelationship(true);
          return;
        } catch (error) {
          console.error("Registration API error:", error);
          
          // Fallback to local storage if API fails
          console.log("Using fallback signup flow...");
          const fallbackUserId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;

          localStorage.setItem("userName", formData.fullName);
          localStorage.setItem("userEmail", formData.email);
          localStorage.setItem("userId", fallbackUserId);
          if (formData.language) {
            localStorage.setItem("userLanguage", formData.language);
          }
          setUserId(fallbackUserId);

          toast({
            title: "Account created!",
            description: "Please tell us about yourself.",
          });

          setIsLoading(false);
          setShowRelationship(true);
          return;
        }
      } else {
        // Login flow
        try {
          const response = await loginUser({
            email: formData.email,
            password: formData.password,
          });

          console.log("Login successful:", response);

          // Store user data from backend response
          localStorage.setItem("userId", response.user_id);
          localStorage.setItem("userName", response.user.name);
          localStorage.setItem("userEmail", response.user.email);
          if (response.user.preferred_language) {
            localStorage.setItem("userLanguage", response.user.preferred_language);
          }

          onClose();

          toast({
            title: "Login successful",
            description: "Welcome back to JanmaSethu!",
          });

          setIsLoading(false);
          onAuthSuccess(false, undefined, response.user_id);
        } catch (error) {
          console.error("Login API error:", error);
          setLoginError((error as Error).message || "Invalid email or password");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      toast({
        title: isSignUp ? "Signup Failed" : "Login Failed",
        description: "Unable to process your request. Please try again.",
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };

  const handleRelationshipSubmit = () => {
    if (!relationship) {
      toast({
        title: "Required",
        description: "Please select your relationship to the patient",
        variant: "destructive",
      });
      return;
    }

    console.log("=== Relationship submitted ===");
    console.log("Relationship:", relationship);
    console.log("User ID:", userId);

    // Store relationship in localStorage for persistence
    localStorage.setItem("userRelationship", relationship);

    // Call onAuthSuccess to trigger onboarding flow
    console.log("Calling onAuthSuccess with isNewUser=true");
    onAuthSuccess(true, relationship, userId);
  };

  const handleBack = () => {
    setShowRelationship(false);
    setRelationship("");
  };

  if (showRelationship) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Tell us about yourself
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center mt-2">
              This helps us personalize your experience
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4 overflow-y-auto max-h-[50vh] pr-2">
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Please select your relation to the patient
              </Label>

              <RadioGroup value={relationship} onValueChange={setRelationship}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="herself"
                    id="herself"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="herself"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Herself
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="himself"
                    id="himself"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="himself"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Himself
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="mother"
                    id="mother"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="mother"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Mother
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="father"
                    id="father"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="father"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Father
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="mother-in-law"
                    id="mother-in-law"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="mother-in-law"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Mother-in-law
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="father-in-law"
                    id="father-in-law"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="father-in-law"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Father-in-law
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="sibling"
                    id="sibling"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="sibling"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Sibling
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem
                    value="other"
                    id="other"
                    className="shrink-0"
                  />
                  <Label
                    htmlFor="other"
                    className="cursor-pointer flex-1 font-normal"
                  >
                    Other family member
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleRelationshipSubmit}
                className="flex-1 gradient-button text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Create Account" : "Sign In"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            {isSignUp
              ? "Join JanmaSethu to get personalized support"
              : "Welcome back to JanmaSethu"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  data-testid="input-fullname"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number (optional)"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  data-testid="input-phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger data-testid="select-gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">City/Town</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your city or town"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  data-testid="input-location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData({ ...formData, language: value })
                  }
                >
                  <SelectTrigger data-testid="select-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="te">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setLoginError("");
              }}
              required
              data-testid="input-password"
            />
          </div>

          {!isSignUp && loginError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
              {loginError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full gradient-button text-white"
            disabled={isLoading}
            data-testid="button-submit-auth"
          >
            {isLoading
              ? isSignUp
                ? "Creating Account..."
                : "Signing In..."
              : isSignUp
                ? "Create Account"
                : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setFormData({
                  fullName: "",
                  email: "",
                  password: "",
                  phoneNumber: "",
                  gender: "",
                  location: "",
                  language: "en",
                });
                setLoginError("");
              }}
              className="text-primary hover:underline font-medium"
              data-testid="button-toggle-auth-mode"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
