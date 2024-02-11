import React from "react";

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
            items: [],
          },
          {
            type: "file",
            name: "file-example.json",
          },
        ],
      },
    ],
  },
  {
    workspaceName: "workspace2",
    items: [
      {
        type: "file",
        name: "file-example.json",
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
      <ul className="ps-4">
        {data.items.map((workspaceItem) => (
          <li key={workspaceItem.name}>
            {workspaceItem.type === "file" ? (
              <p>{workspaceItem.name}</p>
            ) : (
              <WorkspaceItemFolder data={workspaceItem} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const WorkspaceItemFolder = ({ data }: { data: WorkSpaceItems }) => {
  if (data.type === "file") return data.name;

  return (
    <div>
      <p>{data.name}</p>
      <ul className="ps-4">
        {data.items?.map((item) => (
          <WorkspaceItemFolder key={item.name} data={item} />
        ))}
      </ul>
    </div>
  );
};

export default WorkspacePanelComponent;
