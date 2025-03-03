
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  code: string;
  zoomLevel?: number;
  panOffset?: { x: number; y: number };
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ 
  code, 
  zoomLevel = 1,
  panOffset = { x: 0, y: 0 }
}) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "neutral",
      securityLevel: "loose",
    });
  }, []);
  
  useEffect(() => {
    const renderDiagram = async () => {
      try {
        setError(null);
        const { svg } = await mermaid.render("mermaid-diagram-" + Math.random(), code);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram. Please check your syntax.");
        setSvg("");
      }
    };
    
    renderDiagram();
  }, [code]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startPoint.x;
    const dy = e.clientY - startPoint.y;
    
    setPanOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    setStartPoint({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="overflow-hidden border rounded-md bg-white"
      style={{ 
        cursor: isDragging ? "grabbing" : "grab",
        minHeight: "200px",
        maxHeight: "500px",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {error ? (
        <div className="p-4 text-destructive text-sm">
          {error}
        </div>
      ) : (
        <div 
          style={{ 
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: "center",
            transition: "transform 0.1s ease",
          }}
          dangerouslySetInnerHTML={{ __html: svg }} 
        />
      )}
    </div>
  );
};
