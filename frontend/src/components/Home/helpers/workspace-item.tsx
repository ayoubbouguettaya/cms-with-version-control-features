import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CopyMinus,
  File,
  FilePen,
  FilePlus,
  FolderPen,
  FolderPlus,
} from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import RenameItemDialog from "./rename-dialog";
import { WorkSpaceItemProps, WorkSpaceItems } from "@/store/types";
import { WorkSpaceContext } from "@/store/context";

type Props = {};

const WorkspaceItem = ({}: Props) => {

  const {
    state: {
      activeItemPath,
      workspace: data,
    } = {
      activeItemPath: "",
      workspace: null,
    },
    dispatch,
  } = useContext(WorkSpaceContext);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      const response = await axios.get(
        "http://localhost:5000/workspaces/workspace-1"
      );

      dispatch?.({type: "SET_WORKSPACE",payload: response.data})
    };

    fetchWorkspaceData();
  }, []);

  const addFileOrFolder = async (type: "file" | "folder") => {
    try {
      const response = await axios.post(
        "http://localhost:5000/workspaces/workspace-1",
        {
          type,
          relatedPath: `${data?.name}${activeItemPath}`,
        }
      );
      console.log("type of the creation", type);

      dispatch?.({type: "SET_WORKSPACE",payload: response.data})
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectItem = (data: WorkSpaceItems, relatedPath: string) => {
    console.log(data.name, "==", relatedPath);
    dispatch?.({type: "SET_ACTIVE_PATH",payload:relatedPath})
    dispatch?.({type: "SET_IS_ACTIVE_PATH_DIRECTORY",payload: data.type === "folder"})
  };

  const selectRootItem = () => {
    dispatch?.({type: "SET_ACTIVE_PATH",payload:""})
    dispatch?.({type: "SET_IS_ACTIVE_PATH_DIRECTORY",payload: true})
  }

  return (
    <div className="text-gray-600">
      <div className=" flex content-start justify-between mb-3">
        <span className="mr-auto font-medium">
          <button onClick={selectRootItem}> {data?.name}</button>
        </span>
        <button onClick={() => addFileOrFolder("folder")}>
          {" "}
          <FolderPlus size={20} className="mr-1" />
        </button>
        <button onClick={() => addFileOrFolder("file")}>
          {" "}
          <FilePlus size={20} className="mr-1" />
        </button>
        <CopyMinus size={20} />
      </div>
      <RenameItemDialog  >
        <Accordion type="multiple">
          {data?.items.map((workspaceItem) => (
            <WorkspaceItemFolder
              activeItemPath={activeItemPath}
              basePath=""
              key={`${workspaceItem.type}-${workspaceItem.name}`}
              handleSelectItem={handleSelectItem}
              data={workspaceItem}
            />
          ))}
        </Accordion>
      </RenameItemDialog>
    </div>
  );
};

const WorkspaceItemFolder = ({
  data,
  activeItemPath,
  basePath,
  handleSelectItem,
}: {
  data: WorkSpaceItems;
  activeItemPath: string;
  handleSelectItem: (data: WorkSpaceItems, relatedPath: string) => void;
  basePath: string;
}) => {
  const relatedPath = `${basePath}/${data.name}`;

  if (data.type === "file")
    return (
      <div
        onClick={() => handleSelectItem(data, relatedPath)}
        className={` ${activeItemPath === relatedPath && "bg-slate-300"}
          text-sm flex min-w-32  overflow-hidden py-1 rounded`}
      >
        <File className={`ml-4 mr-1`} width={20} />
        {data.name}
        {activeItemPath === relatedPath && (
          <DialogTrigger asChild className="ml-auto">
            <FilePen width={20} />
          </DialogTrigger>
        )}
      </div>
    );

  return (
    <AccordionItem value={data.name}>
      <AccordionTrigger>
        <button
          className={`${
            activeItemPath === relatedPath && "bg-slate-300"
          } rounded flex w-full`}
          onClick={() => handleSelectItem(data, relatedPath)}
        >
          {" "}
          {data.name}
          {activeItemPath === relatedPath && (
            <DialogTrigger className="ml-auto">
              <FolderPen width={20} />
            </DialogTrigger>
          )}
        </button>{" "}
      </AccordionTrigger>
      <AccordionContent>
        {data.items?.map((item) => (
          <WorkspaceItemFolder
            activeItemPath={activeItemPath}
            basePath={relatedPath}
            handleSelectItem={handleSelectItem}
            key={`${relatedPath}-${item.type}-${item.name}`}
            data={item}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default WorkspaceItem;
