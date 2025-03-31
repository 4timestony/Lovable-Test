
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Grid, Plus } from "lucide-react";

interface TemplateDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (templateId: string) => void;
}

export default function TemplateDrawer({ 
  open, 
  onOpenChange, 
  onSelect 
}: TemplateDrawerProps) {
  const [templates] = useState([
    { id: "trade-analysis", name: "Trade Analysis", description: "Analyze market conditions for trading" },
    { id: "market-overview", name: "Market Overview", description: "General market overview perspective" },
    { id: "risk-assessment", name: "Risk Assessment", description: "Evaluate risk factors for a trade" }
  ]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Select a template</DrawerTitle>
        </DrawerHeader>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={() => onSelect("blank")}
          >
            <div className="bg-gray-100 rounded-full p-3 mb-3">
              <Plus className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="font-medium mb-1">Blank Perspective</h3>
            <p className="text-sm text-gray-500 text-center">Start from scratch</p>
          </div>
          
          {templates.map((template) => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => onSelect(template.id)}
            >
              <div className="bg-blue-100 rounded-full p-3 mb-3 w-fit">
                <Grid className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="font-medium mb-1">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
