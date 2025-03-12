
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { 
  Coins, 
  CreditCard, 
  Settings, 
  History, 
  BarChart3, 
  FileText, 
  Plus, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import AnimatedSection from "@/components/AnimatedSection";

const Profile = () => {
  // Mock user data - In a real app, this would come from your auth context
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    credits: 10,
    totalCredits: 100,
    avatar: null,
    plan: "Pro Plan",
    diagrams: 12,
    createdAt: "January 2023"
  };

  // Mock recent diagrams
  const recentDiagrams = [
    { id: 1, name: "Project Workflow", date: "Today", status: "completed" },
    { id: 2, name: "System Architecture", date: "Yesterday", status: "completed" },
    { id: 3, name: "User Journey Map", date: "2 days ago", status: "in-progress" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <AnimatedSection className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {userData.name}. Here's an overview of your account.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/generate">
                  <Button className="gap-2">
                    <Plus size={16} />
                    New Diagram
                  </Button>
                </Link>
                <Button variant="outline" className="gap-2">
                  <Settings size={16} />
                  Settings
                </Button>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Stats Grid */}
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Coins className="h-5 w-5 text-primary" />
                  Credits Usage
                </CardTitle>
                <CardDescription>Your current credit usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{userData.credits} credits remaining</span>
                    <span className="text-muted-foreground">{userData.totalCredits} total</span>
                  </div>
                  <Progress value={(userData.credits / userData.totalCredits) * 100} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <CreditCard size={14} />
                  Buy Credits
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Statistics
                </CardTitle>
                <CardDescription>Your diagram statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{userData.diagrams}</p>
                    <p className="text-sm text-muted-foreground">Total Diagrams</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{userData.plan}</p>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <History size={14} />
                  View History
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Account Info
                </CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{userData.createdAt}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <Settings size={14} />
                  Account Settings
                </Button>
              </CardFooter>
            </Card>
          </AnimatedSection>
          
          {/* Recent Activity */}
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-medium">Recent Diagrams</CardTitle>
                <CardDescription>Your recently created or edited diagrams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDiagrams.map((diagram) => (
                    <div key={diagram.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded flex items-center justify-center ${
                          diagram.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="font-medium">{diagram.name}</p>
                          <p className="text-sm text-muted-foreground">{diagram.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 text-primary">
                        View
                        <ArrowUpRight size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Diagrams</Button>
              </CardFooter>
            </Card>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
