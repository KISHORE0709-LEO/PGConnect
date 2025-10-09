import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    login();
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || userType;
    
    if (role === 'student') {
      navigate('/student');
    } else if (role === 'owner') {
      // For new owners, redirect to register PG page
      if (!isLogin) {
        navigate('/owner/register-pg');
      } else {
        // For existing owners, go to dashboard
        navigate('/owner');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">PGConnect</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Find PG
            </Button>
            <Button variant="ghost" size="sm">Login</Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Tab Buttons */}
            <div className="flex mb-8">
              <Button
                variant={isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(true)}
                className="flex-1 rounded-r-none"
              >
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(false)}
                className="flex-1 rounded-l-none"
              >
                Register
              </Button>
            </div>

            <Card className="p-6">
              {isLogin ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">Welcome to PGConnect</h2>
                  <p className="text-muted-foreground mb-6">Enter your credentials to log in to your account</p>

                  <div className="space-y-4">
                    <div>
                      <Label>Username</Label>
                      <Input
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </div>

                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      Login
                    </Button>

                    <p className="text-center text-sm">
                      Don't have an account yet?{" "}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-primary hover:underline"
                      >
                        Create an account
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
                  <p className="text-muted-foreground mb-6">Register to find or list your PG</p>

                  <div className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Username</Label>
                        <Input
                          placeholder="Choose a username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          placeholder="Your contact number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Confirm Password</Label>
                        <Input
                          type="password"
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* User Type Selection */}
                    <div>
                      <Label className="mb-3 block">I want to:</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="student"
                            name="userType"
                            checked={userType === "student"}
                            onChange={() => setUserType("student")}
                            className="text-primary"
                          />
                          <Label htmlFor="student" className="cursor-pointer">Find PG as a Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="owner"
                            name="userType"
                            checked={userType === "owner"}
                            onChange={() => setUserType("owner")}
                            className="text-primary"
                          />
                          <Label htmlFor="owner" className="cursor-pointer">List my PG as an Owner</Label>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      Create Account
                    </Button>

                    <p className="text-center text-sm">
                      Already have an account?{" "}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-primary hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className="flex-1 bg-gradient-to-br from-primary via-primary/90 to-purple-600 text-white p-8 flex items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">PGConnect - Your Student Housing Solution</h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Find the perfect PG accommodation near your college or list your property for students.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 bg-white/20 rounded-full p-1" />
                <span>Verified PGs with detailed amenities</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 bg-white/20 rounded-full p-1" />
                <span>Find PGs near your college</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 bg-white/20 rounded-full p-1" />
                <span>Real-time room availability</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 bg-white/20 rounded-full p-1" />
                <span>Secure and convenient booking process</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="italic mb-2">
                "PGConnect helped me find a comfortable PG just 2km from my college with all the amenities I needed."
              </p>
              <p className="font-semibold">- Happy Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;