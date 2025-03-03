
import React from "react";
import { 
  Zap, Shield, Clock, BarChart4, 
  Smartphone, Layers 
} from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance, ensuring a smooth experience with minimal load times."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure by Design",
    description: "Built with security as a priority, protecting your data with industry-leading practices."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time-Saving",
    description: "Automate repetitive tasks and streamline your workflow to focus on what matters most."
  },
  {
    icon: <BarChart4 className="h-6 w-6" />,
    title: "Insightful Analytics",
    description: "Gain valuable insights with comprehensive analytics and customizable reporting tools."
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Responsive Design",
    description: "Seamlessly adapts to any device or screen size for a consistent experience everywhere."
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Thoughtful Integration",
    description: "Connects effortlessly with your favorite tools and platforms for a unified workflow."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary mb-2">Features</p>
          <h2 className="mb-4">Designed with intention</h2>
          <p className="text-muted-foreground text-lg">
            Every feature has been carefully crafted to enhance your experience without unnecessary complexity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 group"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
