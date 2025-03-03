
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AnimatedSection from "@/components/AnimatedSection";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full space-y-8 md:flex md:space-y-0 gap-12"
      >
        {/* Left Column - Branding/Info */}
        <AnimatedSection className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">S</span>
            </div>
            <span className="font-medium text-xl">Simplify</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            {isLogin ? "Welcome back" : "Join Simplify"}
          </h1>
          
          <p className="text-muted-foreground mb-6">
            {isLogin 
              ? "Sign in to your account to continue your workflow journey." 
              : "Create an account to start designing beautiful workflows with ease."}
          </p>
          
          <div className="mt-auto hidden md:block">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Right Column - Auth Form */}
        <AnimatedSection className="flex-1 bg-card rounded-xl p-8 shadow-sm border">
          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-2">
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-highlight"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="input-highlight"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-highlight"
              />
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
            
            <div className="pt-4">
              <Button type="submit" className="w-full">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
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
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
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
