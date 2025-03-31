
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import TaskHeader from "@/components/TaskHeader";
import TemplateSelector from "@/components/TemplateSelector";
import ParamInput from "@/components/ParamInputCard";

export default function ConfigurePage() {
  const [concept, setConcept] = useState("trade-structuring");
  const [symbol, setSymbol] = useState("MSFT");
  const [date, setDate] = useState("");
  const [lastNDays, setLastNDays] = useState(0);
  const [maxDate, setMaxDate] = useState("");

  const conceptOptions = [
    { label: "Trade structuring", value: "trade-structuring" },
    { label: "Market analysis", value: "market-analysis" },
    { label: "Risk assessment", value: "risk-assessment" }
  ];

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      
      <div className="flex-1 ml-[90px] p-8">
        <TaskHeader
          title="Trade"
          breadcrumbs={[
            { label: "Tasks", path: "/tasks" },
            { label: "Trade MSFT", path: "/tasks/1" },
            { label: "Trade" }
          ]}
        />
        
        <div className="flex justify-between items-center mb-8">
          <TemplateSelector
            label="Select Concept"
            value={concept}
            onChange={setConcept}
            options={conceptOptions}
            tooltip="Select a concept for this trade"
            showReset={true}
            onReset={() => setConcept("")}
          />
          
          <div className="flex space-x-3">
            <Button variant="outline">Test</Button>
            <Button className="bg-primary hover:bg-primary/90">Save</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6">
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
              
              {/* Right column */}
              <div className="space-y-6">
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
                </div>
                
                <div>
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
            
            <div className="mt-auto">
              <div className="mt-8 flex space-x-4 items-center">
                <Button 
                  variant="outline" 
                  className="text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100"
                >
                  To setup (2)
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <span className="sr-only">Reset</span>
                    ↺
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <span className="sr-only">History</span>
                    ↻
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Get Data</h2>
              <div className="bg-purple-50 text-purple-600 text-xs font-medium px-2 py-1 rounded-md inline-block mb-4">
                Inputs
              </div>
              
              <div className="space-y-4">
                <ParamInput
                  label="Symbol"
                  type="string"
                  value={symbol}
                  onChange={(value) => setSymbol(value as string)}
                  placeholder="Enter stock symbol"
                />
                
                <ParamInput
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(value) => setDate(value as string)}
                />
                
                <ParamInput
                  label="Last_n_days"
                  type="int"
                  value={lastNDays}
                  onChange={(value) => setLastNDays(value as number)}
                  placeholder="0"
                />
                
                <ParamInput
                  label="Max_date"
                  type="date"
                  value={maxDate}
                  onChange={(value) => setMaxDate(value as string)}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
