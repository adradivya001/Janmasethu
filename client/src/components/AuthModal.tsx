import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { loginUser, registerUser } from "@/utils/api";
import { Loader2, X } from "lucide-react";
import styled from 'styled-components';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onAuthSuccess: (isNewUser: boolean, relationship?: string, userId?: string) => void;
    defaultTab?: "login" | "register";
}

const StyledWrapper = styled.div`
  .form-box {
    width: 100%;
    /* max-width width handled by DialogContent usually, but we can set 100% here */
    background: #f1f7fe;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
    position: relative; /* Ensure close button positions relative to this */
  }

  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
  }

  /* Custom Close Button */
  .close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #666;
    transition: all 0.2s;
    z-index: 20;
    padding: 6px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    color: #000;
    background: rgba(0,0,0,0.05);
  }

  /*Form text*/
  .title {
    font-weight: bold;
    font-size: 1.6rem;
    color: #1a1a1a;
    margin-top: 8px; /* Extra space for close button visual balance */
  }

  .subtitle {
    font-size: 1rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  /*Inputs box*/
  .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 0.5rem 0 0.5rem;
    width: 100%;
    border: 1px solid #e5e7eb;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 48px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: .95rem;
    padding: 8px 15px;
    transition: all 0.2s;
  }
  
  .input:last-child {
    border-bottom: none;
  }

  .input:focus {
    background-color: #f9fafb;
  }

  .form-section {
    padding: 16px;
    font-size: .85rem;
    background-color: #e0ecfb;
    box-shadow: rgb(0 0 0 / 8%) 0 -1px;
    text-align: center;
  }

  .form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color .3s ease;
    cursor: pointer;
    margin-left: 4px;
  }

  .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }

  /*Button*/
  .submit-btn {
    background-color: #0066ff;
    background: linear-gradient(135deg, #9333EA 0%, #EC4899 100%); /* Use brand gradient */
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 12px 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
  }

  .submit-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  }
  
  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default function AuthModal({ open, onClose, onAuthSuccess, defaultTab = "login" }: AuthModalProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(defaultTab);

    // Login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register State
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const switchTab = (tab: "login" | "register") => {
        setActiveTab(tab);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await loginUser({
                email: loginEmail,
                password: loginPassword,
            });

            toast({
                title: "Welcome back!",
                description: "Successfully logged in.",
            });

            onAuthSuccess(false, response.user.user_relation, response.user_id);
        } catch (error: any) {
            toast({
                title: "Login failed",
                description: error.message || "Please check your credentials and try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await registerUser({
                name: registerName,
                email: registerEmail,
                password: registerPassword,
            });

            toast({
                title: "Account created!",
                description: "Welcome to Janmasethu.",
            });

            onAuthSuccess(true, response.user.user_relation, response.user_id);
        } catch (error: any) {
            toast({
                title: "Registration failed",
                description: error.message || "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isLogin = activeTab === "login";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="p-0 !border-none !bg-transparent !shadow-none sm:max-w-[380px] [&>button]:hidden">
                <StyledWrapper>
                    <div className="form-box">
                        {/* Custom Close Button */}
                        <button className="close-btn" onClick={onClose}>
                            <X size={20} />
                        </button>

                        <form className="form" onSubmit={isLogin ? handleLogin : handleRegister}>
                            <span className="title">
                                {isLogin ? "Welcome Back" : "Start Your Journey"}
                            </span>
                            <span className="subtitle">
                                {isLogin
                                    ? "Enter your details to access your account"
                                    : "Create an account to personalize your experience"}
                            </span>

                            <div className="form-container">
                                {!isLogin && (
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Full Name"
                                        value={registerName}
                                        onChange={(e) => setRegisterName(e.target.value)}
                                        required
                                    />
                                )}
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Email"
                                    value={isLogin ? loginEmail : registerEmail}
                                    onChange={(e) => isLogin ? setLoginEmail(e.target.value) : setRegisterEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                    value={isLogin ? loginPassword : registerPassword}
                                    onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="submit-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {isLogin ? "Logging-in..." : "Creating Account..."}
                                    </>
                                ) : (
                                    isLogin ? "Log In" : "Sign up"
                                )}
                            </button>
                        </form>

                        <div className="form-section">
                            <p>
                                {isLogin ? "Don't have an account?" : "Have an account?"}
                                <a onClick={() => switchTab(isLogin ? "register" : "login")}>
                                    {isLogin ? "Sign up" : "Log in"}
                                </a>
                            </p>
                        </div>
                    </div>
                </StyledWrapper>
            </DialogContent>
        </Dialog>
    );
}
