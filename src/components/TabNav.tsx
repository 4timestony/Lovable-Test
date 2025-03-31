
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface TabNavProps {
  tabs: Array<{
    label: string;
    value: string;
    path: string;
  }>;
  currentTab: string;
}

export default function TabNav({ tabs, currentTab }: TabNavProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            to={tab.path}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm",
              currentTab === tab.value
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
