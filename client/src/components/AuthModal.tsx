import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: (isNewUser: boolean, relationship?: string, userId?: string) => void;
}

export default function AuthModal({ open, onClose, onAuthSuccess }: AuthModalProps) {
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
  const { toast } = useToast();

  // Store userId in state only
  const storeUserId = (id: string) => {
    setUserId(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      if (!formData.fullName || !formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      // Trigger webhook for sign-up
      setIsLoading(true);
      try {
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
          throw new Error("Failed to create account");
        }

        // Try to parse JSON, but handle non-JSON responses
        let data: any = {};
        const contentType = response.headers.get("content-type");

        try {
          if (contentType && contentType.includes("application/json")) {
            data = await response.json();
          } else {
            // Handle non-JSON response (like "True")
            const textResponse = await response.text();
            console.log("Non-JSON response received:", textResponse);
            data = { success: true };
          }
        } catch (parseError) {
          console.log("Response parsing handled:", parseError);
          data = { success: true };
        }

        // Capture the unique ID from the response if available
        if (data.id || data.userId || data.user_id) {
          const uniqueId = data.id || data.userId || data.user_id;
          storeUserId(uniqueId);
          console.log("User ID captured:", uniqueId);
        } else {
          // Generate a temporary ID if none provided
          const tempId = `user_${Date.now()}`;
          storeUserId(tempId);
          console.log("Generated temporary user ID:", tempId);
        }

        console.log("Account created successfully, showing relationship selection");

        toast({
          title: "Account created!",
          description: "Please tell us about yourself.",
        });

        // Show relationship selection
        setShowRelationship(true);
        console.log("showRelationship state set to:", true);
      } catch (error) {
        console.error("Sign-up error:", error);
        toast({
          title: "Error",
          description: "Failed to create account. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle login
      if (!formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      try {
        console.log("=== SENDING LOGIN REQUEST ===");
        console.log("Email:", formData.email);
        
        const response = await fetch("https://n8n.ottobon.in/webhook/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        console.log("Login webhook response status:", response.status);

        if (!response.ok) {
          throw new Error("Login failed");
        }

        // Read response as text first
        const responseText = await response.text();
        console.log("Login response text:", responseText);

        // Check if response is empty
        if (!responseText || !responseText.trim()) {
          console.error("=== EMPTY RESPONSE FROM N8N ===");
          console.error("The n8n webhook returned an empty response");
          console.error("This means your n8n workflow needs a 'Respond to Webhook' node");
          throw new Error("Server configuration error - please contact support");
        }

        // Try to parse as JSON
        let data: any;
        try {
          data = JSON.parse(responseText);
          console.log("Login response data:", data);
        } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError);
          console.error("Raw response was:", responseText);
          throw new Error("Server returned invalid data format");
        }

        // Check if login was successful
        if (data.success === true) {
          if (!data.user_id) {
            console.error("Login succeeded but no user_id in response:", data);
            throw new Error("Server error: No user ID returned");
          }

          const userId = data.user_id;
          console.log("✅ Login successful, user_id:", userId);

          toast({
            title: "Welcome back!",
            description: "Login successful.",
          });

          // Call onAuthSuccess with isNewUser = false for existing users
          // This will trigger navigation to /sakhi/try
          onAuthSuccess(false, undefined, userId);
        } else {
          // Login failed - show error from webhook or default message
          const errorMessage = data.error || "Invalid email or password";
          console.error("❌ Login failed:", errorMessage);
          console.error("Full response:", data);
          
          toast({
            title: "Login Failed",
            description: errorMessage,
            variant: "destructive",
          });
          return; // Don't throw error, just return
        }
      } catch (error) {
        console.error("Login error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRelationshipSubmit = () => {
    console.log("=== handleRelationshipSubmit called ===");
    console.log("Selected relationship:", relationship);

    if (!relationship) {
      toast({
        title: "Required",
        description: "Please select your relationship to the patient",
        variant: "destructive",
      });
      return;
    }

    console.log("Relationship selected:", relationship);
    console.log("User ID:", userId);
    console.log("Calling onAuthSuccess with isNewUser=true");

    // Close the auth modal and trigger onboarding with userId
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
            <p className="text-sm text-muted-foreground text-center mt-2">
              This helps us personalize your experience
            </p>
          </DialogHeader>

          <div className="space-y-6 mt-4 overflow-y-auto max-h-[50vh] pr-2">
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Please select your relation to the patient
              </Label>

              <RadioGroup value={relationship} onValueChange={setRelationship}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="herself" id="herself" className="shrink-0" />
                  <Label htmlFor="herself" className="cursor-pointer flex-1 font-normal">
                    Herself
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="himself" id="himself" className="shrink-0" />
                  <Label htmlFor="himself" className="cursor-pointer flex-1 font-normal">
                    Himself
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="mother" id="mother" className="shrink-0" />
                  <Label htmlFor="mother" className="cursor-pointer flex-1 font-normal">
                    Mother
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="father" id="father" className="shrink-0" />
                  <Label htmlFor="father" className="cursor-pointer flex-1 font-normal">
                    Father
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="mother-in-law" id="mother-in-law" className="shrink-0" />
                  <Label htmlFor="mother-in-law" className="cursor-pointer flex-1 font-normal">
                    Mother-in-law
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="father-in-law" id="father-in-law" className="shrink-0" />
                  <Label htmlFor="father-in-law" className="cursor-pointer flex-1 font-normal">
                    Father-in-law
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="sibling" id="sibling" className="shrink-0" />
                  <Label htmlFor="sibling" className="cursor-pointer flex-1 font-normal">
                    Sibling
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="other" id="other" className="shrink-0" />
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Create Account" : "Sign In"}
          </DialogTitle>
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
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-button text-white"
            disabled={isLoading}
          >
            {isLoading
              ? (isSignUp ? "Creating Account..." : "Signing In...")
              : (isSignUp ? "Create Account" : "Sign In")
            }
          </Button>

          <div className="space-y-3">
            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ fullName: "", email: "", password: "" });
                }}
                className="text-primary hover:underline font-medium"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
            
            {!isSignUp && (
              <div className="text-center text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-100">
                💡 <strong>Tip:</strong> Make sure you've signed up first. The email and password must match exactly.
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}