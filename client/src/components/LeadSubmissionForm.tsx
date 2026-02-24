import { useState } from "react";
import { X, User, Phone, Calendar, Users, AlertCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface LeadSubmissionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmitted?: (lead: LeadData) => void;
}

interface LeadData {
  name: string;
  phone: string;
  age: string;
  gender: string;
  problemType: string;
  source: string;
}

const LeadSubmissionForm = ({ open, onClose, onSubmitted }: LeadSubmissionFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadData>({
    name: "",
    phone: "",
    age: "",
    gender: "",
    problemType: "",
    source: "",
  });

  const problemTypes = [
    "Infertility",
    "PCOS/PCOD",
    "Endometriosis",
    "Male Factor",
    "Unexplained",
    "Recurrent Pregnancy Loss",
    "IVF Support",
    "IUI Support",
    "Pregnancy Care",
    "Postpartum Support",
    "Other",
  ];

  const sources = [
    "Google Search",
    "Social Media",
    "Friend/Family Referral",
    "Doctor Referral",
    "Advertisement",
    "Website",
    "Other",
  ];

  const handleInputChange = (field: keyof LeadData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.age || !formData.gender || !formData.problemType || !formData.source) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/clinic-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Failed to submit");
      }

      toast({
        title: "Thank you!",
        description: "We'll get back to you soon.",
      });

      if (onSubmitted) {
        onSubmitted(formData);
      }

      setFormData({
        name: "",
        phone: "",
        age: "",
        gender: "",
        problemType: "",
        source: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to save lead:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-w-[95vw] max-h-[90vh] overflow-y-auto p-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl">
        <DialogHeader className="border-b border-purple-100 pb-4 px-6 pt-6">
          <DialogTitle className="flex items-center gap-3 text-xl md:text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Share your details and we'll reach out to help you on your journey.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
              <User className="w-4 h-4 text-purple-500" />
              Your Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="rounded-xl border-purple-200 focus:border-purple-400"
              data-testid="input-lead-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
              <Phone className="w-4 h-4 text-purple-500" />
              Your Phone *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="rounded-xl border-purple-200 focus:border-purple-400"
              data-testid="input-lead-phone"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4 text-purple-500" />
                Your Age *
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                min="18"
                max="60"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="rounded-xl border-purple-200 focus:border-purple-400"
                data-testid="input-lead-age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4 text-purple-500" />
                Gender *
              </Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="rounded-xl border-purple-200" data-testid="select-lead-gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemType" className="flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="w-4 h-4 text-purple-500" />
              What can we help you with? *
            </Label>
            <Select value={formData.problemType} onValueChange={(value) => handleInputChange("problemType", value)}>
              <SelectTrigger className="rounded-xl border-purple-200" data-testid="select-lead-problem">
                <SelectValue placeholder="Select problem type" />
              </SelectTrigger>
              <SelectContent>
                {problemTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source" className="flex items-center gap-2 text-sm font-medium">
              <Globe className="w-4 h-4 text-purple-500" />
              How did you find us? *
            </Label>
            <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)}>
              <SelectTrigger className="rounded-xl border-purple-200" data-testid="select-lead-source">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source.toLowerCase().replace(/\s+/g, "-")}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
              data-testid="button-cancel-lead"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg"
              data-testid="button-submit-lead"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadSubmissionForm;
