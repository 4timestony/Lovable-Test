
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
import { useToast } from "@/components/ui/use-toast";

export default function TaskDetailPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("instructions");
  const [template, setTemplate] = useState("trade-template-1");
  const [version, setVersion] = useState("1");
  const [hasTemplate, setHasTemplate] = useState(true);
  const [showWorkflow, setShowWorkflow] = useState(true);
  const [nodes, setNodes] = useState<Array<{id: string, type: string, title: string}>>([]);
  const [editingPerspective, setEditingPerspective] = useState<string | null>(null);

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
    setNodes([]);
  };

  const handleSelectTemplate = (value: string) => {
    setTemplate(value);
    setHasTemplate(true);
    setNodes([]);
  };

  const handleAddNode = (typeInfo: string) => {
    // Parse the type info to extract the node type and template if provided
    const [type, templateId] = typeInfo.split(":");
    
    if (type === "perspective") {
      const newNodeId = `node-${Date.now()}`;
      const newNode = {
        id: newNodeId,
        type: "perspective",
        title: templateId === "blank" ? "New Perspective" : 
              templateId === "trade-analysis" ? "Trade Analysis" :
              templateId === "market-overview" ? "Market Overview" :
              templateId === "risk-assessment" ? "Risk Assessment" : 
              "New Perspective"
      };
      
      setNodes([...nodes, newNode]);
      setEditingPerspective(newNodeId);
      
      toast({
        title: "Perspective added",
        description: `New ${newNode.title} perspective has been added to your workflow`,
      });
    } else if (type === "choice") {
      const newNode = {
        id: `node-${Date.now()}`,
        type: "choice",
        title: "New Choice"
      };
      
      setNodes([...nodes, newNode]);
      
      toast({
        title: "Choice added",
        description: "New choice node has been added to your workflow",
      });
    }
  };

  const handleEditNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node && node.type === "perspective") {
      setEditingPerspective(nodeId);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    if (editingPerspective === nodeId) {
      setEditingPerspective(null);
    }
    
    toast({
      title: "Node deleted",
      description: "The node has been removed from your workflow",
    });
  };

  const handleBackToWorkflow = () => {
    setEditingPerspective(null);
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
          
          {hasTemplate && editingPerspective === null && (
            <div className="flex space-x-3">
              <Button variant="outline">Test</Button>
              <Button className="bg-primary hover:bg-primary/90">Save</Button>
            </div>
          )}
          
          {editingPerspective !== null && (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleBackToWorkflow}>
                Back to Workflow
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                Save Perspective
              </Button>
            </div>
          )}
        </div>
        
        {!hasTemplate ? (
          <WorkflowCanvas isEmpty={true} />
        ) : editingPerspective !== null ? (
          // Perspective Editing View
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
                  <ActionParameter name="Symbol" value="" onChange={(e) => console.log(e.target.value)} />
                  <ActionParameter name="Date" value="" onChange={(e) => console.log(e.target.value)} />
                  <ActionParameter name="Last_n_days" value="" onChange={(e) => console.log(e.target.value)} />
                  <ActionParameter name="Max_date" value="" onChange={(e) => console.log(e.target.value)} />
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
                    <ActionParameter name="Long" value="Yes" onChange={(e) => console.log(e.target.value)} />
                    <ActionParameter name="Risk_reward_ratio" value="" onChange={(e) => console.log(e.target.value)} />
                  </div>
                </ActionCard>
              </div>
            </div>
            
            <div>
              <div className="flex justify-end mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-green-100 text-green-800">Action</span>
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
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-green-100 text-green-800">Action</span>
                </div>
                
                <ActionCard
                  title="Create signal"
                  type="action"
                  onDelete={() => console.log("Delete create signal")}
                >
                  <div className="font-mono text-sm text-gray-700">
                    <ActionParameter name="Signal" value="Buy" readOnly={true} />
                    <ActionParameter name="Price" value="155.75" readOnly={true} />
                    <ActionParameter name="Date" value="2023-06-15" readOnly={true} />
                  </div>
                </ActionCard>
              </div>
            </div>
          </div>
        ) : (
          // Main Workflow View
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
            
            <div className="flex flex-col items-center space-y-6">
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
              
              {nodes.map((node) => (
                <WorkflowNode
                  key={node.id}
                  title={node.title}
                  type={node.type as "choice" | "perspective"}
                  onEdit={() => handleEditNode(node.id)}
                  onDelete={() => handleDeleteNode(node.id)}
                  onDuplicate={() => console.log("Duplicate node", node.id)}
                >
                  <div className="flex justify-center">
                    <Input 
                      value={node.title} 
                      className="max-w-[200px] text-center"
                      onChange={(e) => {
                        const updatedNodes = nodes.map(n => 
                          n.id === node.id ? {...n, title: e.target.value} : n
                        );
                        setNodes(updatedNodes);
                      }}
                    />
                  </div>
                </WorkflowNode>
              ))}
            </div>
          </WorkflowCanvas>
        )}
      </div>
    </div>
  );
}
