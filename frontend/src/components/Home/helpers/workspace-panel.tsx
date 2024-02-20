"use client";
import React from "react";

import { Layers } from "lucide-react";
import WorkspaceItem from "./workspace-item";

type Props = {};

const WorkspacePanelComponent = (props: Props) => {

  return (
    <div className="font-mono w-96 bg-slate-100 p-3 border border-r-slate-200 h-dvh">
      <h2 className="bg-slate-500 text-green-300 p-2 rounded flex font-semibold border-b pb-2 mb-2">
        <Layers className="mr-1" />
        Workspaces
      </h2>
      <WorkspaceItem />
    </div>
  );
};

export default WorkspacePanelComponent;
