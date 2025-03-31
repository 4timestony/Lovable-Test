
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import TaskHeader from "@/components/TaskHeader";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: "1", name: "Trade MSFT", template: "Trade template 1" },
    { id: "2", name: "Trade AAPL", template: "Trade template 1" },
    { id: "3", name: "Market Analysis", template: "Analysis template" }
  ]);

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      
      <div className="flex-1 ml-[90px] p-8">
        <div className="flex justify-between items-center mb-8">
          <TaskHeader
            title="Tasks"
            breadcrumbs={[
              { label: "Tasks", path: "/tasks" }
            ]}
          />
          
          <Button variant="default" className="bg-primary hover:bg-primary/90">
            Create Task
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Link to={`/tasks/${task.id}`} key={task.id}>
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <h3 className="font-medium mb-2">{task.name}</h3>
                <p className="text-sm text-gray-500">{task.template}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
