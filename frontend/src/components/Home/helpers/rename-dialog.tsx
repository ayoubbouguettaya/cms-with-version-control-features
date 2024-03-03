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
import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  children: React.ReactNode;
  activeItemPath: string;
};

const RenameItemDialog = ({ activeItemPath, children }: Props) => {
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

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
        const activeItemPathWithoutItemName = activeItemPath.split("/").slice(0,activeItemPath.split("/").length -1).join("/")
        const data= {
            oldRelativePath: activeItemPath,
  newRelativePath: activeItemPathWithoutItemName + "/" + newName
        }

        console.log(data)
        return;
      await axios.patch(`http://localhost:5000/workspaces/workspace-1/`,data);
    } catch (error) {}
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
              <Button onClick={handleRename}>
                Rename
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
      {children}
    </Dialog>
  );
};

export default RenameItemDialog;
