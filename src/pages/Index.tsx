
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <div className="mx-auto bg-primary h-20 w-20 rounded-full flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <circle cx="17.5" cy="17.5" r="3.5" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Workflow Configuration</h1>
        <p className="text-lg text-gray-600 mb-8">
          Create and configure trading workflows with our visual editor. Set up templates, actions, and parameters to automate your trading strategies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/tasks">Go to Tasks</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/tasks/1">View Sample Workflow</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
