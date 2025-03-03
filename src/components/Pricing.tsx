
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  available: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: "Basic",
    description: "Essential features for individuals getting started",
    price: {
      monthly: "$9",
      yearly: "$90",
    },
    features: [
      { text: "Up to 3 projects", available: true },
      { text: "Basic analytics", available: true },
      { text: "24-hour support response time", available: true },
      { text: "Community access", available: true },
      { text: "Advanced integrations", available: false },
      { text: "Custom branding", available: false },
    ],
    buttonText: "Start Basic",
  },
  {
    name: "Professional",
    description: "Perfect for growing teams and businesses",
    price: {
      monthly: "$29",
      yearly: "$290",
    },
    features: [
      { text: "Unlimited projects", available: true },
      { text: "Advanced analytics", available: true },
      { text: "4-hour support response time", available: true },
      { text: "Community access", available: true },
      { text: "Advanced integrations", available: true },
      { text: "Custom branding", available: false },
    ],
    popular: true,
    buttonText: "Start Professional",
  },
  {
    name: "Enterprise",
    description: "Advanced features for larger organizations",
    price: {
      monthly: "$79",
      yearly: "$790",
    },
    features: [
      { text: "Unlimited projects", available: true },
      { text: "Advanced analytics", available: true },
      { text: "1-hour support response time", available: true },
      { text: "Community access", available: true },
      { text: "Advanced integrations", available: true },
      { text: "Custom branding", available: true },
    ],
    buttonText: "Start Enterprise",
  },
];

const Pricing = () => {
  const [annually, setAnnually] = useState(false);

  return (
    <section id="pricing" className="py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary mb-2">Pricing</p>
          <h2 className="mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose the perfect plan for your needs. Always know what you'll pay.
          </p>
          
          <div className="inline-flex items-center bg-secondary rounded-full p-1 mb-8">
            <button
              onClick={() => setAnnually(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                !annually ? "bg-card shadow-sm" : "hover:bg-secondary/80"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnually(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                annually ? "bg-card shadow-sm" : "hover:bg-secondary/80"
              )}
            >
              Annually
              <span className="ml-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl overflow-hidden border bg-card transition-all duration-300 hover:shadow-md",
                plan.popular ? "ring-2 ring-primary shadow-md" : ""
              )}
            >
              {plan.popular && (
                <div className="bg-primary py-2 text-center text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-medium">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-semibold">
                    {annually ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="ml-1 text-muted-foreground">
                    {annually ? "/year" : "/month"}
                  </span>
                </div>
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <div className={cn(
                        "mr-3 flex h-5 w-5 items-center justify-center rounded-full",
                        feature.available 
                          ? "bg-primary/10 text-primary" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className={cn(
                        "text-sm",
                        !feature.available && "text-muted-foreground"
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={cn(
                    "mt-8 w-full",
                    plan.popular ? "" : "bg-secondary/80 text-foreground hover:bg-secondary"
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
