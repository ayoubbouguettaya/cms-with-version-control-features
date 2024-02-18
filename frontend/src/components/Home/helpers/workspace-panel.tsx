"use client";
import React from "react";

import { Layers } from "lucide-react";
import WorkspaceItem, { WorkSpaceItemProps } from "./workspace-item";

type Props = {};

const workspacesData: WorkSpaceItemProps[] = [
  {
    workspaceName: "workspace",
    items: [
      {
        type: "folder",
        name: "folder-1",
        items: [
          {
            type: "folder",
            name: "sub-folder1",
            items: [
              {
                type: "file",
                name: "folder-568.md",
              },
            ],
          },
          {
            type: "file",
            name: "file-example.md",
          },
        ],
      },
      {
        type: "folder",
        name: "folder-2",
        items: [
          {
            type: "file",
            name: "folder-98.md",
          },
        ],
      },
      {
        type: "file",
        name: "file-example2.md",
      },
    ],
  },
];

const WorkspacePanelComponent = (props: Props) => {

  // Http calls to get the workspaces

  return (
    <div className="font-mono w-96 bg-slate-100 p-3 border border-r-slate-200 h-dvh">
      <h2 className="bg-slate-500 text-green-300 p-2 rounded flex font-semibold border-b pb-2 mb-2">
        <Layers className="mr-1" />
        Workspaces
      </h2>
      <ul>
        {workspacesData.map((item) => (
          <WorkspaceItem key={item.workspaceName} data={item} />
        ))}
      </ul>
    </div>
  );
};


export default WorkspacePanelComponent;
