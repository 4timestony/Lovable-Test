
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import TaskHeader from "@/components/TaskHeader";
import TabNav from "@/components/TabNav";
import ParamInput from "@/components/ParamInputCard";
import ActionCard from "@/components/ActionCard";
import ActionParameter from "@/components/ActionParameter";

export default function ConfigurePage() {
  const [activeTab, setActiveTab] = useState("instructions");
  const [outputType, setOutputType] = useState("signal");

  const tabs = [
    { label: "Instructions", value: "instructions", path: "/tasks/1/configure?tab=instructions" },
    { label: "Schedule", value: "schedule", path: "/tasks/1/configure?tab=schedule" },
    { label: "Deployment", value: "deployment", path: "/tasks/1/configure?tab=deployment" },
    { label: "Performance", value: "performance", path: "/tasks/1/configure?tab=performance" },
    { label: "Settings", value: "settings", path: "/tasks/1/configure?tab=settings" }
  ];

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      
      <div className="flex-1 ml-[90px] p-8">
        <TaskHeader
          title="Configure Trade MSFT"
          breadcrumbs={[
            { label: "Tasks", path: "/tasks" },
            { label: "Trade MSFT", path: "/tasks/1" },
            { label: "Configure" }
          ]}
        />
        
        <TabNav tabs={tabs} currentTab={activeTab} />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Workflow Parameters</h2>
          
          <div className="flex space-x-3">
            <Button className="bg-primary hover:bg-primary/90">Save Configuration</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Input Parameters</h3>
            
            <ActionCard
              title="Get Market Data"
              type="inputs"
              onEdit={() => console.log("Edit get data")}
              onDelete={() => console.log("Delete get data")}
            >
              <div className="font-mono text-sm text-gray-700">
                <ActionParameter name="Symbol" value="MSFT" onChange={(e) => console.log(e.target.value)} />
                <ActionParameter name="Days" value="5" onChange={(e) => console.log(e.target.value)} />
                <ActionParameter name="Resolution" value="1h" onChange={(e) => console.log(e.target.value)} />
                <ActionParameter name="Source" value="yfinance" onChange={(e) => console.log(e.target.value)} />
              </div>
            </ActionCard>
            
            <div className="mt-6">
              <ActionCard
                title="Trading Parameters"
                type="inputs"
                onEdit={() => console.log("Edit trading parameters")}
                onDelete={() => console.log("Delete trading parameters")}
              >
                <div className="font-mono text-sm text-gray-700">
                  <ActionParameter name="Risk" value="0.02" onChange={(e) => console.log(e.target.value)} />
                  <ActionParameter name="Strategy" value="momentum" onChange={(e) => console.log(e.target.value)} />
                </div>
              </ActionCard>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Output Configuration</h3>
            
            <ActionCard
              title="Signal Output"
              type="action"
              onDelete={() => console.log("Delete signal output")}
            >
              <div className="font-mono text-sm text-gray-700">
                <ActionParameter name="Type" value={outputType} onChange={(e) => setOutputType(e.target.value)} />
                <ActionParameter name="Format" value="JSON" onChange={(e) => console.log(e.target.value)} />
                <ActionParameter name="Destination" value="webhook" onChange={(e) => console.log(e.target.value)} />
                <ActionParameter name="Notify" value="true" onChange={(e) => console.log(e.target.value)} />
              </div>
            </ActionCard>
            
            <div className="mt-6">
              <ActionCard
                title="Error Handling"
                type="action"
                onDelete={() => console.log("Delete error handling")}
              >
                <div className="font-mono text-sm text-gray-700">
                  <ActionParameter name="Retry" value="3" onChange={(e) => console.log(e.target.value)} />
                  <ActionParameter name="Timeout" value="60" onChange={(e) => console.log(e.target.value)} />
                  <ActionParameter name="Fallback" value="skip" onChange={(e) => console.log(e.target.value)} />
                </div>
              </ActionCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
