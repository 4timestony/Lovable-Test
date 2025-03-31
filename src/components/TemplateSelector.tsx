
import { ChevronDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TemplateSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  tooltip?: string;
  showReset?: boolean;
  onReset?: () => void;
}

export default function TemplateSelector({
  label,
  value,
  onChange,
  options,
  tooltip,
  showReset = false,
  onReset,
}: TemplateSelectorProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-500">
                  <Info size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <span className="text-gray-400">:</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[250px] bg-white">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {showReset && (
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            onClick={onReset}
          >
            Reset to default
          </Button>
        )}
      </div>
    </div>
  );
}
