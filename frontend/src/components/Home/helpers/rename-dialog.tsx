import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { WorkSpaceItemProps } from "@/store/types";
import { WorkSpaceContext } from "@/store/context";

type Props = {
  children: React.ReactNode;
};

const RenameItemDialog = ({  children }: Props) => {
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

  const {
    state: { activeItemPath,  } = {
      activeItemPath: "",
    },
    dispatch
  } = useContext(WorkSpaceContext);


  useEffect(() => {
    const fileOrFolderName =
      activeItemPath.split("/")[activeItemPath.split("/").length - 1];
    setOldName(fileOrFolderName);
    setNewName(fileOrFolderName);
  }, [activeItemPath]);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setNewName(event.target.value);
  };

  const handleRename = async () => {
    try {
      const activeItemPathWithoutItemName = activeItemPath
        .split("/")
        .slice(0, activeItemPath.split("/").length - 1)
        .join("/");
      const data = {
        oldRelativePath: activeItemPath,
        newRelativePath: activeItemPathWithoutItemName + "/" + newName,
      };

      const response = await axios.patch(
        `http://localhost:5000/workspaces/workspace-1/`,
        data
      );

      dispatch?.({type: "SET_WORKSPACE",payload: response.data})
      //to DO dispace
      console.log("new Data", response.data);
    } catch (error) {
      console.log("error occured when renaming");
    }
  };

  return (
    <Dialog>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
          <DialogDescription>
            Are you sure to rename your folder <strong>{oldName}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              onChange={handleOnChange}
              value={newName}
              className="col-span-3"
            />
            <DialogClose asChild>
              <Button onClick={handleRename}>Rename</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
      {children}
    </Dialog>
  );
};

export default RenameItemDialog;
