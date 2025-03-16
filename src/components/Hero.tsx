
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Raindrop = ({ delay = 0 }) => {
  const randomLeft = Math.random() * 100;
  const randomDuration = Math.random() * 2 + 1;
  const randomSize = Math.random() * 3 + 1;
  const randomOpacity = Math.random() * 0.6 + 0.2;
  
  return (
    <div 
      className="absolute top-0 rounded-full bg-primary/30 animate-fall pointer-events-none"
      style={{
        left: `${randomLeft}%`,
        width: `${randomSize}px`,
        height: `${randomSize * 10}px`,
        animationDuration: `${randomDuration}s`,
        animationDelay: `${delay}s`,
        opacity: randomOpacity
      }}
    />
  );
};

const Hero = () => {
  const [email, setEmail] = useState("");
  const [raindrops, setRaindrops] = useState<number[]>([]);

  useEffect(() => {
    // Create initial raindrops
    const drops = Array.from({ length: 40 }, (_, i) => i);
    setRaindrops(drops);
    
    // Add new raindrops periodically
    const interval = setInterval(() => {
      setRaindrops(prev => {
        if (prev.length > 100) return prev;
        return [...prev, prev.length];
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    toast.success("Thanks for joining! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-background dark:bg-black pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Raindrops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {raindrops.map((_, i) => (
          <Raindrop key={i} delay={i * 0.1 % 3} />
        ))}
      </div>
      
      <div className="section-container text-center relative z-10">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Smart Solutions to Grow<br />Your Business
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Meet our AI-powered SaaS solution to lighten your workload,<br />
            increase efficiency and make more accurate decisions.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mx-auto animate-slide-up opacity-0 max-w-md"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Button className="h-12 px-8 bg-primary/90 hover:bg-primary group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button variant="outline" className="h-12 px-8">
            Learn More
          </Button>
        </div>
        
        {/* Dashboard preview image */}
        <div 
          className="mt-16 relative mx-auto max-w-5xl animate-slide-up opacity-0 rounded-lg overflow-hidden shadow-2xl"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-30 z-10"></div>
          <img 
            src="/lovable-uploads/4ff6d874-e81c-46af-8f4f-1bccb7bd35de.png" 
            alt="Dashboard Preview" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  );
};

export default Hero;
