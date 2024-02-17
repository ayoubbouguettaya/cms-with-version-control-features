import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { File } from "lucide-react";

type Props = {};

const workspacesData: WorkSpaceItemProps[] = [
  {
    workspaceName: "workspace",
    items: [
      {
        type: "folder",
        name: "folder1",
        items: [
          {
            type: "folder",
            name: "sub folder1",
            items: [ {
              type: "file",
              name: "file-inside-sub-folder.txt",
            }],
          },
          {
            type: "file",
            name: "file-example.txt",
          },
        ],
      },
      {
        type: "file",
        name: "file-example2.txt",
      },
    ],
  },
];

const WorkspacePanelComponent = (props: Props) => {
  return (
    <div className="w-96 bg-slate-100 p-3 border border-r-slate-200 h-dvh">
      <h2 className="font-semibold">#Workspaces</h2>
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
    <div>
      <p className="text-slate-600"> {data.workspaceName}</p>
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
      <div className="text-sm flex py-1">
        <File size={20} /> {data.name}
      </div>
    );

  return (
    <AccordionItem  value={data.name}>
      <AccordionTrigger>{data.name}</AccordionTrigger>
      <AccordionContent  >
        {data.items?.map((item) => (
          <WorkspaceItemFolder key={item.name} data={item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default WorkspacePanelComponent;
