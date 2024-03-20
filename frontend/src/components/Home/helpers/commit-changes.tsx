import { parseDiff, Diff, FileData, Hunk, Decoration } from "react-diff-view";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { GitCommitHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { WorkSpaceContext } from "@/store/context";
import axios from "axios";
import { commitHistory } from "@/store/types";

const CommitShowModal = ({ hash }: { hash: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="ml-2 p-2 bg-green-400 border border-gray-300">
        <GitCommitHorizontal />
      </DialogTrigger>
      <DialogContent
        style={{ display: "flex", flexDirection: "column" }}
        className="bg-slate-300 sm:max-w-[1000px] h-[80%] overflow-y-scroll"
      >
        <DialogContentMonted hash={hash} />
        <DialogFooter className="h-14 mt-auto">
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommitShowModal;

const DialogContentMonted = ({ hash }: { hash: string }) => {
  const [rows, setRows] = useState<FileData[]>();
  const [metaData, setMetaData] = useState<commitHistory | null>(null);

  const {
    state: {
      activeItemPath,
      activeItemIsDirectory,
      activeWorkSpaceName,
      workspace: data,
    } = {
      activeItemPath: "",
      activeItemIsDirectory: true,
      activeWorkSpaceName: "",
      workspace: null,
    },
    dispatch,
  } = useContext(WorkSpaceContext);

  const renderFile = ({ oldRevision, newRevision, type, hunks }: any) => (
    <Diff
      key={oldRevision + "-" + newRevision}
      viewType="unified"
      diffType={type}
      hunks={hunks}
    >
      {(hunks) =>
        hunks.map((hunk) => (
          <>
            <Decoration key={"decoration-" + hunk.content}>
              {hunk.content}{" "}
            </Decoration>
            <Hunk key={hunk.content} hunk={hunk} />
          </>
        ))
      }
    </Diff>
  );

  useEffect(() => {
    const fetchCommitChanges = async () => {
      const baseUrl = "http://localhost:5000";
      const query = `workspaceName=${activeWorkSpaceName}&relativeRelativePath=${activeItemPath}`;

      const response = await axios.get(
        `${baseUrl}/versionning/commit/${hash}?${query}`
      );

      if (response.data) setRows(parseDiff(response.data.changes));

      setMetaData(response.data.metaData);
    };

    if (!activeItemIsDirectory) fetchCommitChanges();
  }, [activeItemPath, hash]);

  return (
    <>
      <div>
        {hash} | {metaData?.hash} | {metaData?.date} | {metaData?.author_name} |{" "}
        {metaData?.message} | {metaData?.body}
      </div>
      <div>{rows?.map(renderFile)}</div>
    </>
  );
};
