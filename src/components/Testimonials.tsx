
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    content: "This platform has completely transformed our workflow. The intuitive design makes even complex tasks feel simple and elegant.",
    author: "Sarah Johnson",
    role: "Design Director",
    company: "Artisan Studios"
  },
  {
    content: "After trying countless solutions, we finally found one that perfectly balances power and simplicity. I can't imagine working without it now.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "Nexus Innovations"
  },
  {
    content: "The attention to detail is remarkable. Every interaction feels thoughtful and intentional, which aligns perfectly with our own design philosophy.",
    author: "Emma Rodriguez",
    role: "Creative Lead",
    company: "Luminary Design"
  },
  {
    content: "We've seen a 40% increase in productivity since implementing this platform. The minimalist approach eliminates distractions without sacrificing functionality.",
    author: "David Kim",
    role: "Operations Director",
    company: "Elevate Solutions"
  },
  {
    content: "As someone who values both aesthetics and efficiency, I've finally found a tool that doesn't compromise on either. It's beautifully crafted in every way.",
    author: "Olivia Parker",
    role: "UX Architect",
    company: "Clarity Labs"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-secondary/50 overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary mb-2">Testimonials</p>
          <h2 className="mb-4">Loved by creators worldwide</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it — hear from the people who use our platform every day.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[250px] md:h-[200px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out p-8 bg-card rounded-xl border shadow-sm",
                  index === activeIndex 
                    ? "opacity-100 translate-x-0" 
                    : index < activeIndex 
                      ? "opacity-0 -translate-x-full" 
                      : "opacity-0 translate-x-full"
                )}
              >
                <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-medium text-sm">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-primary/30"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
