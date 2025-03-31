
import { Trash2, Copy, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowNodeProps {
  title: string;
  type: "choice" | "perspective";
  children?: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onEdit?: () => void;
}

export default function WorkflowNode({
  title,
  type,
  children,
  className,
  onDelete,
  onDuplicate,
  onEdit
}: WorkflowNodeProps) {
  return (
    <div className={cn(
      "border border-dashed rounded-lg p-4", 
      type === "choice" ? "border-orange-300" : 
      type === "perspective" ? "border-blue-300" : "border-gray-300",
      className
    )}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-md",
            type === "choice" ? "bg-orange-100 text-orange-800" : 
            type === "perspective" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
          )}>
            {type === "choice" ? "Choice" : 
             type === "perspective" ? "Perspective" : type}
          </span>
          <h3 className="font-medium">{title}</h3>
        </div>
        
        <div className="flex space-x-1">
          {onDuplicate && (
            <button 
              onClick={onDuplicate}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <Copy size={16} />
            </button>
          )}
          {onEdit && (
            <button 
              onClick={onEdit}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={onDelete}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      {children}
    </div>
  );
}
