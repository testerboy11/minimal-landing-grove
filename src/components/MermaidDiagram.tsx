
import React, { useEffect, useRef, useState } from "react";

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
  const [localPanOffset, setLocalPanOffset] = useState(panOffset);
  
  useEffect(() => {
    // Mock rendering for UI purposes - actual rendering will be handled by backend
    try {
      setError(null);
      // For UI demo purposes, we'll use a placeholder SVG
      const mockSvg = `<svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="50" width="200" height="100" rx="10" fill="#f0f0f0" stroke="#666" />
        <text x="150" y="100" text-anchor="middle" dominant-baseline="middle" font-family="Arial">Node A</text>
        <rect x="550" y="50" width="200" height="100" rx="10" fill="#f0f0f0" stroke="#666" />
        <text x="650" y="100" text-anchor="middle" dominant-baseline="middle" font-family="Arial">Node B</text>
        <path d="M 250 100 H 400 L 550 100" stroke="#666" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
        </defs>
      </svg>`;
      setSvg(mockSvg);
    } catch (err) {
      console.error("Diagram rendering error:", err);
      setError("Failed to render diagram. Please check your syntax.");
      setSvg("");
    }
  }, [code]);
  
  useEffect(() => {
    setLocalPanOffset(panOffset);
  }, [panOffset]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPoint({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startPoint.x;
    const dy = e.clientY - startPoint.y;
    
    setLocalPanOffset(prev => ({
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
            transform: `scale(${zoomLevel}) translate(${localPanOffset.x}px, ${localPanOffset.y}px)`,
            transformOrigin: "center",
            transition: "transform 0.1s ease",
          }}
          dangerouslySetInnerHTML={{ __html: svg }} 
        />
      )}
    </div>
  );
};
