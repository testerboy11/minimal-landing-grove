
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Check, Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock plans data - in a real app, this would come from your backend
const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "For personal projects and learning",
    features: [
      "3 diagrams per month",
      "Basic diagram types",
      "Download as PNG"
    ],
    highlight: false,
    creditsPerMonth: 3
  },
  {
    id: "professional",
    name: "Professional",
    price: "$12",
    period: "per month",
    description: "For professionals and small teams",
    features: [
      "50 diagrams per month",
      "All diagram types",
      "Download in all formats",
      "Priority support"
    ],
    highlight: true,
    creditsPerMonth: 50
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "For organizations with advanced needs",
    features: [
      "Unlimited diagrams",
      "Team collaboration",
      "API access",
      "Custom integrations",
      "Dedicated support"
    ],
    highlight: false,
    creditsPerMonth: 999
  }
];

const Checkout = () => {
  const { toast } = useToast();
  const { planId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(() => 
    plans.find(plan => plan.id === planId) || plans[1]
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process payment here
    toast({
      title: "Payment Successful!",
      description: `You've successfully subscribed to the ${selectedPlan.name} plan.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Selected Plan</h2>
                  <Card className={`border-2 ${selectedPlan.highlight ? 'border-primary' : 'border-border'}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{selectedPlan.name}</CardTitle>
                          <CardDescription>{selectedPlan.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{selectedPlan.price}</div>
                          {selectedPlan.period && (
                            <div className="text-sm text-muted-foreground">{selectedPlan.period}</div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="mb-4 bg-primary/5 text-primary">
                        {selectedPlan.creditsPerMonth} credits per month
                      </Badge>
                      <ul className="space-y-2">
                        {selectedPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check size={18} className="text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="justify-between pt-4 border-t">
                      <div className="flex gap-1 items-center text-sm text-muted-foreground">
                        <Shield size={14} />
                        <span>Secure checkout</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Need a different plan?</h2>
                  <div className="flex gap-2 flex-wrap">
                    {plans.map(plan => (
                      <Button 
                        key={plan.id}
                        variant={plan.id === selectedPlan.id ? "default" : "outline"}
                        onClick={() => setSelectedPlan(plan)}
                        className={`h-auto py-2 px-4 ${plan.id === selectedPlan.id ? '' : 'hover:bg-primary/5'}`}
                      >
                        {plan.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Enter your payment information below</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" required />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" required />
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="flex items-center gap-2">
                              <svg className="h-6 w-auto" viewBox="0 0 36 24" aria-hidden="true">
                                <rect width="36" height="24" rx="4" fill="#1434CB" />
                                <path d="M14.5 9.5H21.5V14.5H14.5V9.5Z" fill="#FFF100" />
                              </svg>
                              <svg className="h-6 w-auto" viewBox="0 0 36 24" aria-hidden="true">
                                <rect width="36" height="24" rx="4" fill="#F26122" />
                                <circle cx="14" cy="12" r="7" fill="#76777A" />
                                <circle cx="22" cy="12" r="7" fill="#FFFFFF" />
                              </svg>
                            </div>
                          </div>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" maxLength={5} required />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="cvc">CVC</Label>
                              <Info size={16} className="text-muted-foreground" />
                            </div>
                            <Input id="cvc" placeholder="123" maxLength={3} required />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Button type="submit" className="w-full">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay {selectedPlan.price}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          You'll be charged {selectedPlan.price} {selectedPlan.period}
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield size={16} className="shrink-0 mt-0.5" />
                    <p>
                      Your payment information is encrypted and secure. We comply with PCI DSS and never store your full
                      card details.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
