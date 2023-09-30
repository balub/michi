import React from "react";
import { UserNav } from "./UserNav";
import { Button } from "./ui/button";

interface InputProps {
  children: React.ReactNode;
  title: string;
  actionElement: React.ReactNode;
}

function DashboardContainer(props: InputProps) {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{props.title}</h2>
          <div className="flex items-center space-x-2">
            {props.actionElement}
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default DashboardContainer;
