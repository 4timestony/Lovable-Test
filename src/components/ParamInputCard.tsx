
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ParamInputProps {
  label: string;
  type: "string" | "int" | "date";
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}

export default function ParamInput({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder,
  className
}: ParamInputProps) {
  return (
    <div className={cn("mb-4", className)}>
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor={label}>{label}</Label>
        <span className="text-xs text-purple-600 font-medium capitalize">{type}</span>
      </div>
      
      {type === "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-between text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              {value || "Select date"}
              <Calendar className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {/* Calendar would go here - simplified for this example */}
            <div className="p-3">
              <p className="text-sm text-gray-500">Date picker (simplified)</p>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Input
          id={label}
          type={type === "int" ? "number" : "text"}
          value={value}
          onChange={(e) => 
            type === "int" 
              ? onChange(parseInt(e.target.value) || 0) 
              : onChange(e.target.value)
          }
          placeholder={placeholder}
          className="bg-white"
        />
      )}
    </div>
  );
}
