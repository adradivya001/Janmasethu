import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { User, Lock, Heart, Shield, Zap } from "lucide-react";

export default function ClinicLanding() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) return;

    setIsLoading(true);
    
    try {
      console.log('🔵 Triggering clinic login webhook...');
      
      const webhookResponse = await fetch('https://n8n.ottobon.in/webhook/clinic_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: {
            username: username,
            password: password
          }
        })
      });

      console.log('📤 Sent to webhook:', { username, password });
      console.log('🔵 Webhook response status:', webhookResponse.status, webhookResponse.statusText);

      if (webhookResponse.ok) {
        const responseData = await webhookResponse.json();
        console.log('✅ Login response:', responseData);
        
        // Check if login was successful
        let isSuccess = false;
        
        // Handle different response formats from n8n
        if (Array.isArray(responseData)) {
          // Array format: [{ success: true }] or [{ username: "false", password: "false" }]
          if (responseData.length > 0) {
            const firstItem = responseData[0];
            // Check if success is explicitly true
            if (firstItem.success === true) {
              isSuccess = true;
            }
            // Check if username/password are not "false" (string)
            else if (firstItem.username && firstItem.password && 
                     firstItem.username !== "false" && firstItem.password !== "false") {
              isSuccess = true;
            }
          }
        } else if (typeof responseData === 'object' && responseData !== null) {
          // Object format: { success: true }
          if (responseData.success === true) {
            isSuccess = true;
          }
        }
        
        console.log('🔍 Login success status:', isSuccess);
        
        if (isSuccess) {
          // Store credentials in localStorage
          localStorage.setItem('clinicUsername', username);
          
          console.log('✅ Redirecting to dashboard...');
          
          // Redirect to dashboard
          window.location.href = "/clinic/dashboard";
        } else {
          // Login failed - incorrect credentials
          console.error('❌ Login failed - invalid credentials');
          alert('Login failed. Please check your credentials.');
        }
      } else {
        console.error('❌ Login failed:', webhookResponse.statusText);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('❌ Error during login:', error);
      alert('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = username.trim() && password.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23C4B5FD%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Janma Sethu Clinic
          </h1>
          <p className="text-gray-600">Clinic Management Portal</p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/70 shadow-xl border-0 rounded-2xl">
          <CardContent className="p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-6"
            >
              {/* Username Input */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                    data-testid="input-username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-200"
                    data-testid="input-password"
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                data-testid="button-login"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Features Message */}
              <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back to Main Site */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-purple-600"
            >
              ← Back to Janma Sethu
            </Button>
          </Link>
        </div>
      </div>

      {/* Background Graphics */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </div>
  );
}
