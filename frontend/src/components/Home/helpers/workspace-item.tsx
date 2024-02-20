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

const WorkspaceItem = () => {
  const [data,setData]= useState<WorkSpaceItemProps | null>(null)
  const [activeItemPath, setactiveItemPath] = useState("");

  useEffect(()=> {

    const fetchWorkspaceData = async () => {

      const response = await axios.get('http://localhost:5000/workspaces/1');
      
      setData(response.data)
    }

    fetchWorkspaceData()

  },[])

  const addFileOrFolder = async (type: "file" | "folder") => {
    try {
      
      const response = await axios.post(
        'http://localhost:5000/workspaces',
        {
          type,
          relatedPath: activeItemPath
        }
        )
        console.log("type of the creation",type)

        setData(response.data)
        
      } catch (error) {
        console.log(error)
      }
  };


  return (
    <div className="text-gray-600">
      <div className=" flex content-start justify-between mb-3">
        <span className="mr-auto font-medium"> {data?.workspaceName}</span>
        <button onClick={() => addFileOrFolder("folder")}> <FolderPlus size={20} className="mr-1" /></button>
        <button onClick={() => addFileOrFolder("file")}> <FilePlus size={20} className="mr-1" /></button>
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
