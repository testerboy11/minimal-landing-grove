import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, User, Mail, Lock, Github } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally connect to your authentication service
    toast({
      title: isLogin ? "Logged in successfully" : "Account created successfully",
      description: `Welcome ${!isLogin ? formData.name : "back"}!`,
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full space-y-8 md:flex md:space-y-0 gap-12"
      >
        {/* Left Column - Branding/Info */}
        <AnimatedSection className="flex-1 flex flex-col justify-center relative">
          <Link to="/" className="absolute top-0 left-0 p-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg">S</span>
            </div>
            <span className="font-medium text-2xl">Simplify</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            {isLogin ? "Welcome back" : "Join Simplify"}
          </h1>
          
          <p className="text-muted-foreground mb-8 text-lg">
            {isLogin 
              ? "Sign in to your account to continue your workflow journey." 
              : "Create an account to start designing beautiful workflows with ease."}
          </p>
          
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/10 mb-8">
            <h3 className="font-medium mb-2">Powerful Diagram Generation</h3>
            <p className="text-sm text-muted-foreground">
              Create beautiful workflow diagrams with our AI-powered generator. Just describe what you need, and we'll do the rest.
            </p>
          </div>
          
          <div className="mt-auto hidden md:block">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Right Column - Auth Form */}
        <AnimatedSection className="flex-1 bg-card rounded-xl p-8 shadow-lg border">
          <div className="mb-8">
            <h2 className="text-2xl font-medium mb-3">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <User size={16} />
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-background pr-10 transition-all duration-200 focus:border-primary"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="bg-background pr-10 transition-all duration-200 focus:border-primary"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </label>
                {isLogin && (
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-background pr-10 transition-all duration-200 focus:border-primary"
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full bg-background hover:bg-accent">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    fill="currentColor"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full bg-background hover:bg-accent">
                <Github size={20} className="mr-2" />
                GitHub
              </Button>
            </div>
          </div>
          
          <div className="mt-8 md:hidden">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </AnimatedSection>
      </motion.div>
    </div>
  );
};

export default Auth;
