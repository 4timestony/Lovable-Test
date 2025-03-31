
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface ActionParameterProps {
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export default function ActionParameter({ 
  name, 
  value, 
  onChange,
  readOnly = false
}: ActionParameterProps) {
  return (
    <div className="mb-1 flex">
      <span className="font-mono text-sm text-gray-600 min-w-[150px]">{name}:</span>
      {readOnly ? (
        <span className="font-mono text-sm text-gray-800">{value}</span>
      ) : (
        <Input
          value={value}
          onChange={onChange}
          className="h-6 py-0 text-sm font-mono"
        />
      )}
    </div>
  );
}
