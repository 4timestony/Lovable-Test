
import { Copy, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionOutputProps {
  title: string;
  content: string;
  onDelete?: () => void;
  onCopy?: () => void;
  className?: string;
}

export default function ActionOutput({ 
  title, 
  content, 
  onDelete, 
  onCopy,
  className 
}: ActionOutputProps) {
  return (
    <div className={cn("bg-gray-100 rounded-md p-4", className)}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-700">{title}</h4>
        
        <div className="flex space-x-1">
          {onCopy && (
            <button 
              onClick={onCopy}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
            >
              <Copy size={16} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={onDelete}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="font-mono text-sm text-gray-600 whitespace-pre-line">
        {content}
      </div>
    </div>
  );
}
