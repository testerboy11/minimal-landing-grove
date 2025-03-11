
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Check, Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

// Mock plans data - in a real app, this would come from your backend
const plans = [
  {
    id: "basic",
    name: "Basic",
    price: {
      monthly: 9,
      yearly: 90,
    },
    credits: 100,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "24-hour support response time", 
      "Community access"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: {
      monthly: 29,
      yearly: 290,
    },
    credits: 500,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "4-hour support response time",
      "Community access",
      "Advanced integrations"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: 79,
      yearly: 790,
    },
    credits: 2000,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "1-hour support response time",
      "Community access",
      "Advanced integrations",
      "Custom branding"
    ]
  }
];

const Checkout = () => {
  const { planId } = useParams<{ planId: string }>();
  const [annually, setAnnually] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(
    planId && plans.find(p => p.id === planId) ? planId : "professional"
  );
  
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    toast.success("Payment successful! Your account has been upgraded.", {
      description: `Welcome to the ${currentPlan.name} plan!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-muted/30 pt-20 pb-12"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/#pricing" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to pricing
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">Checkout</h1>
          <p className="text-muted-foreground">Select your plan and payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Select your plan</h2>
              
              <div className="flex items-center justify-center mb-6 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setAnnually(false)}
                  className={`flex-1 py-2 text-center text-sm font-medium rounded-md transition-all ${
                    !annually ? 'bg-card shadow-sm' : ''
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnually(true)}
                  className={`flex-1 py-2 text-center text-sm font-medium rounded-md transition-all ${
                    annually ? 'bg-card shadow-sm' : ''
                  }`}
                >
                  Annually
                  <Badge className="ml-1 bg-primary/10 text-primary border-none">Save 20%</Badge>
                </button>
              </div>
              
              <RadioGroup 
                value={selectedPlan} 
                onValueChange={setSelectedPlan}
                className="space-y-4"
              >
                {plans.map((plan) => (
                  <Label
                    key={plan.id}
                    htmlFor={plan.id}
                    className={`flex p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{plan.name}</p>
                          <p className="text-muted-foreground text-sm">{plan.credits} diagram credits</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${annually ? plan.price.yearly : plan.price.monthly}</p>
                          <p className="text-xs text-muted-foreground">{annually ? 'per year' : 'per month'}</p>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <Check className="h-3.5 w-3.5 mr-1.5 text-primary" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payment information</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="card-number">Card number</Label>
                      <div className="relative mt-1">
                        <Input id="card-number" placeholder="1234 5678 9012 3456" className="pl-10" />
                        <CreditCard className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="expiration">Expiration date</Label>
                      <Input id="expiration" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" className="mt-1" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="name">Name on card</Label>
                      <Input id="name" placeholder="John Doe" className="mt-1" />
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3 flex items-start">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      This is a demo checkout page. No actual payment will be processed.
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Pay ${annually ? currentPlan.price.yearly : currentPlan.price.monthly}
                    {annually ? '/year' : '/month'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{currentPlan.name} Plan</span>
                  <span>${annually ? currentPlan.price.yearly : currentPlan.price.monthly}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Diagram credits</span>
                  <span>{currentPlan.credits}</span>
                </div>
                {annually && (
                  <div className="flex justify-between text-green-600">
                    <span>Annual discount</span>
                    <span>-$${(currentPlan.price.monthly * 12 - currentPlan.price.yearly).toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold mb-6">
                <span>Total</span>
                <span>${annually ? currentPlan.price.yearly : currentPlan.price.monthly}</span>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex">
                  <Shield className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Secure checkout</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
