
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    toast.success("Thanks for joining! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="section-container text-center relative z-10">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <h1 className="mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Simplify your workflow with elegant design
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            An intuitive platform that combines powerful functionality with beautiful simplicity. 
            Designed for creators who value their time and attention.
          </p>
        </div>
        
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-slide-up opacity-0"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="input-highlight h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="h-12 px-6 group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
        
        <div 
          className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground animate-slide-up opacity-0"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mr-1.5 text-primary">
              <path 
                fill="currentColor" 
                d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
              />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mr-1.5 text-primary">
              <path 
                fill="currentColor" 
                d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
              />
            </svg>
            <span>14-day free trial</span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  );
};

export default Hero;
