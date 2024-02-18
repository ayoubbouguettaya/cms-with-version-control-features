import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyMinus, File, FilePlus, FolderPlus, Layers } from "lucide-react";

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
        items:  [
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

type WorkSpaceItemProps = {
  workspaceName: string;
  items: WorkSpaceItems[];
};

type WorkSpaceItems = {
  name: string;
  type: "folder" | "file";
  items?: WorkSpaceItems[];
};

const WorkspaceItem = ({ data }: { data: WorkSpaceItemProps }) => {
  return (
    <div className="text-gray-600">
      <div className=" flex content-start justify-between mb-3">
        <span className="mr-auto font-medium"> {data.workspaceName}</span>
        <FolderPlus size={20} className="mr-1" />
        <FilePlus size={20} className="mr-1"/>
        <CopyMinus size={20} />
      </div>
      <Accordion type="multiple">
        {data.items.map((workspaceItem) => (
          <WorkspaceItemFolder key={workspaceItem.name} data={workspaceItem} />
        ))}
      </Accordion>
    </div>
  );
};

const WorkspaceItemFolder = ({ data }: { data: WorkSpaceItems }) => {
  if (data.type === "file")
    return (
      <div className="text-sm flex min-w-32  overflow-hidden py-1">
        <File className="ml-4 mr-1" width={20} /> {data.name}
      </div>
    );

  return (
    <AccordionItem value={data.name}>
      <AccordionTrigger>{data.name}</AccordionTrigger>
      <AccordionContent>
        {data.items?.map((item) => (
          <WorkspaceItemFolder key={item.name} data={item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default WorkspacePanelComponent;
