
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TaskHeaderProps {
  title: string;
  breadcrumbs: Array<{
    label: string;
    path?: string;
  }>;
}

export default function TaskHeader({ title, breadcrumbs }: TaskHeaderProps) {
  return (
    <div className="mb-6">
      <div className="breadcrumb mb-2">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight size={16} className="mx-2 text-gray-400" />}
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-primary">
                {crumb.label}
              </Link>
            ) : (
              <span>{crumb.label}</span>
            )}
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-medium">{title}</h1>
    </div>
  );
}
