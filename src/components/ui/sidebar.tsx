
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"

interface SidebarContextProps {
  open: boolean
  defaultOpen?: boolean
  onOpenChange: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextProps>({
  open: true,
  onOpenChange: () => {
    // Default implementation
  },
})

export function useSidebarContext() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <SidebarContext.Provider value={{ open, defaultOpen, onOpenChange }}>
      {children}
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva(
  "relative h-full bg-background transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "border-r shadow-sm",
      },
      size: {
        default: "w-64",
        sm: "w-48",
        lg: "w-72",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

export function Sidebar({ 
  className, 
  variant,
  size,
  ...props 
}: SidebarProps) {
  const { open } = useSidebarContext()
  
  return (
    <div 
      className={cn(
        sidebarVariants({ variant, size }), 
        "overflow-hidden",
        !open && "w-0 opacity-0",
        className
      )}
      {...props}
    />
  )
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("py-2", className)} {...props} />
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-y-auto", className)} {...props} />
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn("py-2", className)} {...props} />
}

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function SidebarTrigger({ className, asChild, ...props }: SidebarTriggerProps) {
  const { open, onOpenChange } = useSidebarContext()
  
  const Comp = asChild ? Slot : Button
  
  return (
    <Comp
      variant="ghost"
      size="icon"
      className={cn(className)}
      onClick={() => onOpenChange(!open)}
      {...props}
    >
      {!asChild && <Menu size={20} />}
    </Comp>
  )
}
