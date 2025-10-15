
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
  onAuthSuccess: (isNewUser: boolean, relationship?: string) => void;
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

        const data = await response.json();
        
        // Capture the unique ID from the response
        if (data.id || data.userId || data.user_id) {
          const uniqueId = data.id || data.userId || data.user_id;
          setUserId(uniqueId);
          console.log("User ID captured:", uniqueId);
        }

        // Show relationship selection for new users
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
      if (!formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Welcome back!",
        description: "Redirecting to Sakhi...",
      });
      
      onAuthSuccess(false); // Existing user - skip onboarding
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

    toast({
      title: "Account created successfully!",
      description: "Please complete the onboarding questions.",
    });
    
    onAuthSuccess(true, relationship); // New user - show onboarding
  };

  const handleBack = () => {
    setShowRelationship(false);
    setRelationship("");
  };

  if (showRelationship) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Tell us about yourself
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-center mt-2">
              This helps us personalize your experience
            </p>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Please select your relation to the patient
              </Label>
              
              <RadioGroup value={relationship} onValueChange={setRelationship}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="herself" id="herself" />
                  <Label htmlFor="herself" className="cursor-pointer flex-1 font-normal">
                    Herself
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="himself" id="himself" />
                  <Label htmlFor="himself" className="cursor-pointer flex-1 font-normal">
                    Himself
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="mother" id="mother" />
                  <Label htmlFor="mother" className="cursor-pointer flex-1 font-normal">
                    Mother
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="father" id="father" />
                  <Label htmlFor="father" className="cursor-pointer flex-1 font-normal">
                    Father
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="mother-in-law" id="mother-in-law" />
                  <Label htmlFor="mother-in-law" className="cursor-pointer flex-1 font-normal">
                    Mother-in-law
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="father-in-law" id="father-in-law" />
                  <Label htmlFor="father-in-law" className="cursor-pointer flex-1 font-normal">
                    Father-in-law
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="sibling" id="sibling" />
                  <Label htmlFor="sibling" className="cursor-pointer flex-1 font-normal">
                    Sibling
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value="other" id="other" />
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
            {isLoading ? "Creating Account..." : (isSignUp ? "Create Account" : "Sign In")}
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
