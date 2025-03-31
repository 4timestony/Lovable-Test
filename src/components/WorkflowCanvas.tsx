
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorkflowCanvasProps {
  children?: React.ReactNode;
  onAddNode?: (type: string) => void;
  className?: string;
  isEmpty?: boolean;
}

export default function WorkflowCanvas({ 
  children, 
  onAddNode, 
  className,
  isEmpty = false
}: WorkflowCanvasProps) {
  if (isEmpty) {
    return (
      <div className={cn("workflow-container", className)}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-gray-100 rounded-lg p-6 mb-4">
            <img 
              src="/lovable-uploads/fd9606ad-220a-438d-93f7-a88d2aaeccde.png" 
              alt="Empty workflow" 
              className="w-24 h-24 object-contain opacity-60"
            />
          </div>
          <p className="text-gray-500">Start by selecting a "Template"</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("workflow-container", className)}>
      {children}
      
      {onAddNode && (
        <div className="flex justify-center mt-6 space-x-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => onAddNode("perspective")}
          >
            <Plus size={16} />
            <span>Perspective</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => onAddNode("choice")}
          >
            <Plus size={16} />
            <span>Choice</span>
          </Button>
        </div>
      )}
    </div>
  );
}
