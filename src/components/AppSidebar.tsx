
import { Mail, FileText, Settings, BarChart2, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <div className="w-[90px] border-r border-gray-200 flex flex-col items-center py-4 h-screen fixed left-0 top-0 bg-white">
      <div className="mb-8">
        <Link to="/">
          <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
            <CircleDot className="text-white" size={24} />
          </div>
        </Link>
      </div>
      
      <nav className="flex flex-col items-center space-y-6 flex-grow">
        <Link to="/inbox" className="p-3 rounded-lg hover:bg-gray-100">
          <Mail size={24} className="text-gray-500" />
        </Link>
        <Link to="/tasks" className="p-3 rounded-lg hover:bg-gray-100">
          <FileText size={24} className="text-gray-500" />
        </Link>
        <Link to="/settings" className="p-3 rounded-lg hover:bg-gray-100">
          <Settings size={24} className="text-gray-500" />
        </Link>
        <Link to="/performance" className="p-3 rounded-lg hover:bg-gray-100">
          <BarChart2 size={24} className="text-gray-500" />
        </Link>
      </nav>
    </div>
  );
}
