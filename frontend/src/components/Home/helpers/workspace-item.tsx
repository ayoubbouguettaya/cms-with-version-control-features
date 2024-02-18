import React, { useEffect, useState } from "react";

import axios from "axios"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyMinus, File, FilePlus, FolderPlus, Layers } from "lucide-react";

export type WorkSpaceItemProps = {
  workspaceName: string;
  items: WorkSpaceItems[];
};

export type WorkSpaceItems = {
  name: string;
  type: "folder" | "file";
  items?: WorkSpaceItems[];
};

const WorkspaceItem = ({ id }: { id: number }) => {
  const [data,setData]= useState<WorkSpaceItemProps | null>(null)
  const [activeItemPath, setactiveItemPath] = useState("");

  useEffect(()=> {

    const fetchWorkspaceData = async () => {

      const response = await axios.get('http://localhost:5000/workspaces/1');
      
      setData(response.data)
    }

    fetchWorkspaceData()

  },[])

  const addFolder = () => {
    /* POST REQUEST  
    related Path    type   FIle or folder 

    check related generate ne   new-folder(1)
   response => to update the state .  
*/
  };

  const addFile = () => {
    /* POST REQUEST  
           body name of Folder / file and related Path
           response => to update the state .  
        */
  };

  return (
    <div className="text-gray-600">
      <div className=" flex content-start justify-between mb-3">
        <span className="mr-auto font-medium"> {data?.workspaceName}</span>
        <FolderPlus size={20} className="mr-1" />
        <FilePlus size={20} className="mr-1" />
        <CopyMinus size={20} />
      </div>
      <p className="text-pink-500">{activeItemPath}</p>
      <Accordion type="multiple">
        {data?.items.map((workspaceItem) => (
          <WorkspaceItemFolder
            activeItemPath={activeItemPath}
            basePath=""
            key={workspaceItem.name}
            setactiveItemPath={setactiveItemPath}
            data={workspaceItem}
          />
        ))}
      </Accordion>
    </div>
  );
};

const WorkspaceItemFolder = ({
  data,
  setactiveItemPath,
  activeItemPath,
  basePath,
}: {
  data: WorkSpaceItems;
  activeItemPath: string;
  setactiveItemPath: React.Dispatch<React.SetStateAction<string>>;
  basePath: string;
}) => {
  const relatedPath = `${basePath}/${data.name}`;

  if (data.type === "file")
    return (
      <div
        onClick={() => setactiveItemPath(relatedPath)}
        className={` ${activeItemPath === relatedPath && "bg-slate-300"}
          text-sm flex min-w-32  overflow-hidden py-1 rounded`}
      >
        <File className={`ml-4 mr-1`} width={20} />
        {data.name}
      </div>
    );

  return (
    <AccordionItem value={data.name}>
      <AccordionTrigger>
        <button
          className={`${
            activeItemPath === relatedPath && "bg-slate-300"
          } rounded`}
          onClick={() => setactiveItemPath(relatedPath)}
        >
          {" "}
          {data.name}
        </button>{" "}
      </AccordionTrigger>
      <AccordionContent>
        {data.items?.map((item) => (
          <WorkspaceItemFolder
            activeItemPath={activeItemPath}
            basePath={relatedPath}
            setactiveItemPath={setactiveItemPath}
            key={item.name}
            data={item}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default WorkspaceItem;
