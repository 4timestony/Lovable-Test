
import { Copy, Trash2, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  type: "inputs" | "action" | "choice";
  children?: React.ReactNode;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export default function ActionCard({ 
  title, 
  type, 
  children, 
  className,
  onEdit,
  onDelete,
  onDuplicate
}: ActionCardProps) {
  return (
    <div className={cn("action-card", className)}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-md",
            type === "inputs" ? "bg-purple-100 text-purple-800" : 
            type === "action" ? "bg-green-100 text-green-800" : 
            "bg-orange-100 text-orange-800"
          )}>
            {type === "inputs" ? "Inputs" : type === "action" ? "Action" : "Choice"}
          </span>
          <h3 className="font-medium">{title}</h3>
        </div>
        
        <div className="flex space-x-1">
          {onDuplicate && (
            <button 
              onClick={onDuplicate}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <Copy size={16} />
            </button>
          )}
          {onEdit && (
            <button 
              onClick={onEdit}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={onDelete}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
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
