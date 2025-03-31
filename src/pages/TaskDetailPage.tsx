
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import TaskHeader from "@/components/TaskHeader";
import TabNav from "@/components/TabNav";
import TemplateSelector from "@/components/TemplateSelector";
import VersionSelector from "@/components/VersionSelector";
import WorkflowCanvas from "@/components/WorkflowCanvas";
import WorkflowNode from "@/components/WorkflowNode";
import ActionCard from "@/components/ActionCard";
import ActionParameter from "@/components/ActionParameter";
import { Input } from "@/components/ui/input";

export default function TaskDetailPage() {
  const [activeTab, setActiveTab] = useState("instructions");
  const [template, setTemplate] = useState("trade-template-1");
  const [version, setVersion] = useState("1");
  const [hasTemplate, setHasTemplate] = useState(true);
  const [showWorkflow, setShowWorkflow] = useState(true);

  const tabs = [
    { label: "Instructions", value: "instructions", path: "/tasks/1?tab=instructions" },
    { label: "Schedule", value: "schedule", path: "/tasks/1?tab=schedule" },
    { label: "Deployment", value: "deployment", path: "/tasks/1?tab=deployment" },
    { label: "Performance", value: "performance", path: "/tasks/1?tab=performance" },
    { label: "Settings", value: "settings", path: "/tasks/1?tab=settings" }
  ];

  const templateOptions = [
    { label: "Trade template 1", value: "trade-template-1" },
    { label: "Analysis template", value: "analysis-template" },
    { label: "Custom template", value: "custom-template" }
  ];

  const versionOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" }
  ];

  const handleResetTemplate = () => {
    setTemplate("");
    setHasTemplate(false);
  };

  const handleSelectTemplate = (value: string) => {
    setTemplate(value);
    setHasTemplate(true);
  };

  const handleAddNode = (type: string) => {
    // Simplified for this demo
    console.log(`Adding node of type: ${type}`);
    // In a real app, you would update state to add a node
  };

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      
      <div className="flex-1 ml-[90px] p-8">
        <TaskHeader
          title="Trade MSFT"
          breadcrumbs={[
            { label: "Tasks", path: "/tasks" },
            { label: "Trade MSFT" }
          ]}
        />
        
        <TabNav tabs={tabs} currentTab={activeTab} />
        
        <div className="flex justify-between items-center mb-6">
          <TemplateSelector
            label="Use Template"
            value={template}
            onChange={handleSelectTemplate}
            options={templateOptions}
            tooltip="Select a workflow template"
            showReset={true}
            onReset={handleResetTemplate}
          />
          
          {hasTemplate && (
            <div className="flex space-x-3">
              <Button variant="outline">Test</Button>
              <Button className="bg-primary hover:bg-primary/90">Save</Button>
            </div>
          )}
        </div>
        
        {!hasTemplate ? (
          <WorkflowCanvas isEmpty={true} />
        ) : (
          <>
            <div className="mb-6">
              <VersionSelector
                value={version}
                onChange={setVersion}
                options={versionOptions}
                onDuplicate={() => console.log("Duplicate version")}
              />
            </div>
            
            {showWorkflow ? (
              <WorkflowCanvas onAddNode={handleAddNode}>
                <div className="mb-6">
                  <ActionCard
                    title="Inputs"
                    type="inputs"
                    onEdit={() => console.log("Edit inputs")}
                    onDelete={() => console.log("Delete inputs")}
                  >
                    <div className="bg-gray-50 p-3 rounded-md font-mono text-sm text-gray-700">
                      <div>Date: ISO8601 format YYYY-MM-DD</div>
                      <div>Stock Symbol: Stock ticker name</div>
                    </div>
                  </ActionCard>
                </div>
                
                <div className="flex justify-center mb-6">
                  <WorkflowNode
                    title="Trade"
                    type="choice"
                    onEdit={() => console.log("Edit choice")}
                    onDelete={() => console.log("Delete choice")}
                    onDuplicate={() => console.log("Duplicate choice")}
                  >
                    <div className="flex justify-center">
                      <Input 
                        value="Trade" 
                        className="max-w-[200px] text-center" 
                        onChange={() => {}} 
                      />
                    </div>
                  </WorkflowNode>
                </div>
              </WorkflowCanvas>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ActionCard
                    title="Get data"
                    type="inputs"
                    onEdit={() => console.log("Edit get data")}
                    onDelete={() => console.log("Delete get data")}
                    onDuplicate={() => console.log("Duplicate get data")}
                  >
                    <div className="font-mono text-sm text-gray-700">
                      <ActionParameter name="Symbol" value="" />
                      <ActionParameter name="Date" value="" />
                      <ActionParameter name="Last_n_days" value="" />
                      <ActionParameter name="Max_date" value="" />
                    </div>
                  </ActionCard>
                  
                  <div className="mt-6">
                    <ActionCard
                      title="Define parameters"
                      type="inputs"
                      onEdit={() => console.log("Edit define parameters")}
                      onDelete={() => console.log("Delete define parameters")}
                      onDuplicate={() => console.log("Duplicate define parameters")}
                    >
                      <div className="font-mono text-sm text-gray-700">
                        <ActionParameter name="Long" value="Yes" />
                        <ActionParameter name="Risk_reward_ratio" value="" />
                      </div>
                    </ActionCard>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-end mb-3">
                    <span className="action-badge">Action</span>
                  </div>
                  
                  <ActionCard
                    title="Latest candle"
                    type="action"
                    onDelete={() => console.log("Delete latest candle")}
                  >
                    <div className="font-mono text-sm text-gray-700">
                      <ActionParameter name="Get Data" value="MSFT data" readOnly={true} />
                      <ActionParameter name="Rows" value="1" readOnly={true} />
                      <ActionParameter name="Candle" value="Latest candle data" readOnly={true} />
                      <ActionParameter name="Long" value="true" readOnly={true} />
                    </div>
                  </ActionCard>
                  
                  <div className="mt-6">
                    <div className="flex justify-end mb-3">
                      <span className="action-badge">Action</span>
                    </div>
                    
                    <ActionCard
                      title="Create invalid signal error"
                      type="action"
                      onDelete={() => console.log("Delete create invalid signal")}
                    >
                      <div className="font-mono text-sm text-gray-700">
                        <ActionParameter name="Condition" value="false" readOnly={true} />
                        <ActionParameter name="Error_message" value='"Unable to structure trade - not a valid EXE"' readOnly={true} />
                        <ActionParameter name="End" value="" readOnly={true} />
                      </div>
                    </ActionCard>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
