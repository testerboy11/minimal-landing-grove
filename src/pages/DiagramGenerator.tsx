
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Copy, 
  Send, 
  Trash2, 
  Settings, 
  Home, 
  Menu, 
  MessageSquare, 
  Save, 
  History, 
  ChevronRight, 
  Info, 
  UserCircle, 
  Coins, 
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarTrigger, 
  SidebarProvider 
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

// Mock conversation for initial state
const initialConversation = [{
  id: "1",
  type: "user" as const,
  content: "graph TD;\n    A[Client] --> B[Load Balancer];\n    B --> C[Server1];\n    B --> D[Server2];",
  timestamp: new Date().toISOString()
}, {
  id: "2",
  type: "assistant" as const,
  content: "graph TD;\n    A[Client] --> B[Load Balancer];\n    B --> C[Server1];\n    B --> D[Server2];",
  timestamp: new Date().toISOString()
}];

const DiagramGenerator = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState(initialConversation);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({
    x: 0,
    y: 0
  });
  
  // Mock user data - In a real app, this would come from your auth/user context
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    credits: 10,
    avatar: null,
    plan: "Pro Plan"
  };
  
  const { toast } = useToast();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: input,
      timestamp: new Date().toISOString()
    };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (in a real app, you'd call your API here)
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant" as const,
        content: input,
        // In a real implementation, this would be the AI-generated diagram
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, aiMessage]);
      setInput("");
      setIsLoading(false);

      // Scroll to the bottom after new message
      setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({
          behavior: "smooth"
        });
      }, 100);
    }, 1500);
  };

  const handleCopyDiagram = (diagramCode: string) => {
    navigator.clipboard.writeText(diagramCode);
    toast({
      title: "Copied to clipboard",
      description: "Diagram code has been copied to your clipboard."
    });
  };

  const handleDownloadDiagram = () => {
    // In a real implementation, you would generate SVG or PNG download
    toast({
      title: "Download started",
      description: "Your diagram is being downloaded."
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleClearConversation = () => {
    setConversation([]);
    toast({
      title: "Conversation cleared",
      description: "All messages have been removed."
    });
  };

  const AppSidebar = () => (
    <Sidebar className="border-r h-screen">
      <SidebarHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">S</span>
            </div>
            <span className="font-medium text-lg">Simplify Diagrams</span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Credits Display */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
              <Coins size={16} className="text-primary" />
              Your Credits
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{userData.credits}</div>
              <Link to="/checkout">
                <Button variant="outline" size="sm" className="text-xs h-7">Get More</Button>
              </Link>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Each diagram generation uses 1 credit
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
              <History size={16} />
              Recent Conversations
            </h3>
            
            <div className="max-h-48 overflow-y-auto pr-1 space-y-2">
              {conversation.length > 0 ? (
                conversation.filter(msg => msg.type === "assistant").slice(-5).map(msg => (
                  <div key={msg.id} className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer flex items-center gap-2">
                    <MessageSquare size={12} />
                    <div className="truncate flex-1">
                      {msg.content.substring(0, 30)}...
                    </div>
                    <ChevronRight size={12} />
                  </div>
                ))
              ) : (
                <div className="text-xs text-muted-foreground">
                  No conversation history yet.
                </div>
              )}
            </div>
            
            {conversation.length > 0 && (
              <Button variant="ghost" size="sm" className="w-full mt-2 text-xs h-8" onClick={handleClearConversation}>
                Clear History
              </Button>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
              <Settings size={16} />
              Settings
            </h3>
            
            <div className="space-y-2">
              <div className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                Theme Preferences
              </div>
              <div className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                Diagram Display Options
              </div>
              <div className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                Download Format
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
              <Info size={16} />
              Help & Resources
            </h3>
            
            <div className="space-y-2">
              <div className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                Mermaid.js Documentation
              </div>
              <div className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                Diagram Examples
              </div>
              <div className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                Keyboard Shortcuts
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-3 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-xs">S</span>
            </div>
            <div>
              <div className="text-xs font-medium">Simplify Diagrams</div>
              <div className="text-xs text-muted-foreground">v1.0.0</div>
            </div>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home size={16} />
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <SidebarProvider>
      <div className="h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header className="border-b p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SidebarTrigger>
              <span className="font-medium text-lg">Diagram Generator</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Credits badge in header */}
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 py-1.5 px-3 border-primary/30 bg-primary/5"
              >
                <Coins size={14} className="text-primary" />
                <span className="text-sm font-medium">{userData.credits} credits</span>
              </Badge>
              
              <Button variant="outline" size="sm" onClick={handleClearConversation}>
                <Trash2 size={16} className="mr-1" />
                Clear
              </Button>
              
              <Button variant="outline" size="sm">
                <Save size={16} className="mr-1" />
                Save
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Account Information</DialogTitle>
                    <DialogDescription>
                      Manage your account settings and preferences.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{userData.name}</CardTitle>
                            <CardDescription>{userData.email}</CardDescription>
                          </div>
                          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                            {userData.avatar ? (
                              <img 
                                src={userData.avatar} 
                                alt={userData.name} 
                                className="h-full w-full rounded-full object-cover" 
                              />
                            ) : (
                              <User className="h-8 w-8 text-primary" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Coins size={16} className="text-primary" />
                            <span className="text-sm font-medium">{userData.credits} credits available</span>
                          </div>
                          <Badge variant="outline">{userData.plan}</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between pt-2 border-t">
                        <Link to="/checkout" className="w-full">
                          <Button variant="outline" size="sm" className="w-full">
                            Upgrade Plan
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings size={14} className="mr-2" />
                        Account Settings
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </header>
          
          {/* Messages Container - Improved for scrolling */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-fade px-[16px]">
            {conversation.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <MessageSquare size={48} className="text-muted-foreground/50 mb-4" />
                <h3 className="text-2xl font-medium mb-2">Start Creating Diagrams</h3>
                <p className="text-muted-foreground max-w-md">
                  Enter Mermaid.js code in the input below to generate beautiful workflow diagrams.
                </p>
              </div>
            ) : (
              conversation.map(message => (
                <motion.div 
                  key={message.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.3 }} 
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start w-full"}`}
                >
                  <div className={`
                    ${message.type === "user" ? "max-w-[85%] bg-primary/10 ml-12 rounded-tr-none rounded-lg p-4" : "w-full bg-card border rounded-lg p-4"}
                  `}>
                    {message.type === "user" ? (
                      <div>
                        <div className="text-sm font-medium mb-2 flex items-center justify-between">
                          <span>You</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <pre className="text-sm whitespace-pre-wrap overflow-x-auto p-2 bg-muted rounded max-h-[300px] overflow-y-auto">
                          {message.content}
                        </pre>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-medium mb-2 flex items-center justify-between">
                          <span>Assistant</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="mb-3 w-full h-full">
                          <div className="diagram-container w-full overflow-hidden">
                            <MermaidDiagram code={message.content} zoomLevel={zoomLevel} panOffset={panOffset} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 border-t pt-2">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleZoomIn()} className="h-8 w-8 p-0">
                              <ZoomIn size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleZoomOut()} className="h-8 w-8 p-0">
                              <ZoomOut size={14} />
                            </Button>
                            <span className="text-xs text-muted-foreground mx-1">
                              {Math.round(zoomLevel * 100)}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleCopyDiagram(message.content)} className="h-8 w-8 p-0">
                              <Copy size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleDownloadDiagram} className="h-8 w-8 p-0">
                              <Download size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
            <div ref={endOfMessagesRef} />
          </div>
          
          {/* Input Area - Fixed at bottom with button on same level */}
          <div className="border-t p-4 bg-background/80 backdrop-blur-sm sticky bottom-0 z-10">
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <Textarea 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Enter Mermaid.js diagram code..." 
                    className="py-3 min-h-24 resize-none flex-1" 
                  />
                  <Button 
                    type="submit" 
                    className="h-auto md:h-auto md:self-stretch"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? "Generating..." : (
                      <>
                        <Send size={16} className="mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span>Tip: Start with graph TD, flowchart LR, or sequenceDiagram to create different diagram types.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DiagramGenerator;
