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
  });
  const [relationship, setRelationship] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [loginError, setLoginError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(""); // Clear any previous errors

    try {
      if (isSignUp) {
        // Sign up - send to backend webhook
        const response = await fetch("https://n8n.ottobon.in/webhook/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Signup failed");
        }

        const data = await response.json();
        const uniqueId =
          data.id || data.userId || data.user_id || `user_${Date.now()}`;
        
        // Store data first
        setUserId(uniqueId);
        localStorage.setItem('userName', formData.fullName);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userId', uniqueId);

        // Show success toast
        toast({
          title: "Account created!",
          description: "Please tell us about yourself.",
        });

        // Important: Set loading to false before showing relationship form
        setIsLoading(false);
        
        // Show relationship selection form
        setShowRelationship(true);
        return; // Exit early to prevent further execution
      } else {
        // Login - Call the login webhook with full error handling
        const response = await fetch(
          "https://n8n.ottobon.in/webhook/sakhi/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          },
        );

        // Get response as text since n8n returns text format
        const responseText = await response.text();
        console.log("Login webhook response:", responseText);

        // Check if response starts with "True:" (successful login)
        if (responseText.startsWith("True:")) {
          // Extract user ID from response (format: "True: <user_id>")
          const loginUserId = responseText.replace("True:", "").trim() || `user_${Date.now()}`;

          // Store username/email in localStorage
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('userId', loginUserId);
          // If fullName is available, store it too
          if (formData.fullName) {
            localStorage.setItem('userName', formData.fullName);
          }

          // Close modal
          onClose();

          // Show success message
          toast({
            title: "Login successful",
            description: "Welcome back! Redirecting to Sakhi...",
          });

          // Navigate to Sakhi (existing user flow)
          onAuthSuccess(false, undefined, loginUserId);
        } else {
          // Login failed - False response or any other response
          setLoginError("Either your email or password is wrong. Please try again.");
          
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      // Network or unexpected error
      toast({
        title: "Connection Error",
        description:
          "Unable to connect to the server. Please check your internet connection and try again.",
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

    // Trigger onboarding immediately with the relationship and userId
    // The parent component will handle closing this modal and opening onboarding
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
      <DialogContent className="sm:max-w-md">
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
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setLoginError(""); // Clear error when user types
              }}
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
                setFormData({ fullName: "", email: "", password: "" });
                setLoginError(""); // Clear error when switching modes
              }}
              className="text-primary hover:underline font-medium"
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
