
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
        
        toast({
          title: "Account created!",
          description: "Please tell us about yourself.",
        });
        
        // Show relationship selection
        setShowRelationship(true);
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

        if (!response.ok) {
          throw new Error("Failed to log in");
        }

        toast({
          title: "Welcome back!",
          description: "Redirecting to Sakhi...",
        });
        
        // Close modal and trigger success callback for existing user
        onAuthSuccess(false);
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Error",
          description: "Failed to log in. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
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

    console.log("Relationship selected:", relationship);
    console.log("User ID:", userId);
    
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
          
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setFormData({ fullName: "", email: "", password: "" });
              }}
              className="text-primary hover:underline"
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
