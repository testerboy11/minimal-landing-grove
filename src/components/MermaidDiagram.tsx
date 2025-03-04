
import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  code: string;
  zoomLevel?: number;
  panOffset?: { x: number; y: number };
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  code,
  zoomLevel = 1,
  panOffset = { x: 0, y: 0 },
}) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'loose',
      logLevel: 'error',
    });

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram. Please check your syntax.");
        setSvg("");
      }
    };

    renderDiagram();
  }, [code, document.documentElement.classList.contains('dark')]);

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
        <p className="font-medium">Error rendering diagram:</p>
        <pre className="mt-2 text-sm overflow-auto">{error}</pre>
        <pre className="mt-2 text-sm overflow-auto bg-muted p-2 rounded">{code}</pre>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full flex items-center justify-center overflow-auto bg-transparent"
      style={{ 
        transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
      }}
    >
      {svg ? (
        <div 
          className="w-full transition-all duration-300 ease-in-out"
          dangerouslySetInnerHTML={{ __html: svg }} 
        />
      ) : (
        <div className="animate-pulse flex items-center justify-center p-8">
          <div className="rounded-md bg-muted w-full h-40 flex items-center justify-center">
            <span className="text-muted-foreground">Generating diagram...</span>
          </div>
        </div>
      )}
    </div>
  );
};
