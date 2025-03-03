
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, History, Settings, Info, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface GeneratorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation[];
  onClearConversation: () => void;
}

const GeneratorSidebar: React.FC<GeneratorSidebarProps> = ({
  isOpen,
  onClose,
  conversation,
  onClearConversation
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-full w-72 bg-card border-r shadow-xl z-50 overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-medium">Diagram Assistant</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X size={18} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                    <History size={16} />
                    Recent Conversations
                  </h3>
                  
                  {conversation.length > 0 ? (
                    <div className="space-y-2">
                      {conversation
                        .filter(msg => msg.type === "assistant")
                        .slice(-5)
                        .map((msg) => (
                          <div 
                            key={msg.id} 
                            className="text-xs p-2 border rounded-md hover:bg-accent transition-colors cursor-pointer flex items-center gap-2"
                          >
                            <MessageSquare size={12} />
                            <div className="truncate flex-1">
                              {msg.content.substring(0, 30)}...
                            </div>
                            <ChevronRight size={12} />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      No conversation history yet.
                    </div>
                  )}
                  
                  {conversation.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2 text-xs h-8"
                      onClick={onClearConversation}
                    >
                      Clear History
                    </Button>
                  )}
                </div>
                
                <div className="mb-6">
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
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-xs">S</span>
                </div>
                <div>
                  <div className="text-xs font-medium">Simplify Diagrams</div>
                  <div className="text-xs text-muted-foreground">v1.0.0</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GeneratorSidebar;
