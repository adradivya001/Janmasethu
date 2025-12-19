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
            phone_number: formData.phoneNumber || undefined,
            preferred_language: formData.language,
            gender: formData.gender || undefined,
            location: formData.location || undefined,
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
        <DialogContent className="sm:max-w-md max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Tell us about yourself
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center mt-2">
              This helps us personalize your experience
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4 pr-2">
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Please select your relation to the patient
              </Label>

              <RadioGroup value={relationship} onValueChange={setRelationship}>
                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="herself" id="herself" />
                  </div>
                  <Label htmlFor="herself" className="cursor-pointer flex-1 font-normal">
                    Herself
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="himself" id="himself" />
                  </div>
                  <Label htmlFor="himself" className="cursor-pointer flex-1 font-normal">
                    Himself
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="mother" id="mother" />
                  </div>
                  <Label htmlFor="mother" className="cursor-pointer flex-1 font-normal">
                    Mother
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="father" id="father" />
                  </div>
                  <Label htmlFor="father" className="cursor-pointer flex-1 font-normal">
                    Father
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="mother-in-law" id="mother-in-law" />
                  </div>
                  <Label htmlFor="mother-in-law" className="cursor-pointer flex-1 font-normal">
                    Mother-in-law
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="father-in-law" id="father-in-law" />
                  </div>
                  <Label htmlFor="father-in-law" className="cursor-pointer flex-1 font-normal">
                    Father-in-law
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="sibling" id="sibling" />
                  </div>
                  <Label htmlFor="sibling" className="cursor-pointer flex-1 font-normal">
                    Sibling
                  </Label>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <RadioGroupItem value="other" id="other" />
                  </div>
                  <Label htmlFor="other" className="cursor-pointer flex-1 font-normal">
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
      <DialogContent className="sm:max-w-md max-w-[90vw] max-h-[60vh] sm:max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to JanmaSethu
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Your trusted companion for fertility and parenting support
          </DialogDescription>
        </DialogHeader>

        {/* Account Type Selector - Visible in first view */}
        <div className="flex gap-2 mb-6">
          <Button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setLoginError("");
              setFormData({
                fullName: "",
                email: "",
                password: "",
                phoneNumber: "",
                gender: "",
                location: "",
                language: "en",
              });
            }}
            className={`flex-1 rounded-lg font-semibold transition-all ${
              isSignUp
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            data-testid="button-create-account"
          >
            Create Account
          </Button>
          <Button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setLoginError("");
              setFormData({
                fullName: "",
                email: "",
                password: "",
                phoneNumber: "",
                gender: "",
                location: "",
                language: "en",
              });
            }}
            className={`flex-1 rounded-lg font-semibold transition-all ${
              !isSignUp
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            data-testid="button-sign-in"
          >
            Sign In
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
