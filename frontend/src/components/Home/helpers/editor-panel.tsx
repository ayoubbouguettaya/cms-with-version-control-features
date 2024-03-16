"use client";
import React, { useEffect, useState } from "react";

import Editor, { OnChange } from "@monaco-editor/react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {CircleOff, Loader2} from "lucide-react"

type Props = { activeItemPath: string; activeItemIsDirectory: boolean };

const EditorPanelComponents = ({
  activeItemPath,
  activeItemIsDirectory,
}: Props) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/workspaces/workspace-1/content?path=${encodeURI(
            activeItemPath
          )}`
        );

        setContent(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!activeItemIsDirectory) {
      fetchContent();
    }
  }, [activeItemPath, activeItemIsDirectory]);

  return (
    <div className="w-full p-6">
      <div className="flex text-green-600 h-5 mb-3 items-center space-x-4 text-sm">
        {activeItemPath.split("/").map(
          (item) =>
            item && (
              <>
                <div>{item}</div>
                <Separator orientation="vertical" />
              </>
            )
        )}
      </div>
      {!activeItemIsDirectory && activeItemPath ? (
        <EditorComponent
          content={content}
          isLoading={isLoading}
          activeItemIsDirectory={activeItemIsDirectory}
          activeItemPath={activeItemPath}
          setContent={setContent}
        />
      ) : (
        <EmptyContent />
      )}
    </div>
  );
};

export default EditorPanelComponents;

const EditorComponent = ({
  isLoading,
  content,
  setContent,
  activeItemIsDirectory,
  activeItemPath,
}: {
  isLoading: boolean;
  content: string;
  activeItemIsDirectory: boolean;
  setContent: (data: string) => void;
  activeItemPath: string;
}) => {
  const saveContent = async () => {
    try {
      if (activeItemIsDirectory) return false;
      const data = {
        content,
        relativePath: activeItemPath,
      };

      console.log(data);

      const response = await axios.post(
        `http://localhost:5000/workspaces/workspace-1/content`,
        data
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange: OnChange = (value?: string) => {
    setContent(value ?? "");
  };
  return !isLoading ? (
    <>
      {" "}
      <Button style={{ float: "right" }} className="mb-4" onClick={saveContent}>
        Save
      </Button>
      <Editor
        height="90vh"
        width={"100%"}
        defaultLanguage="Markdown"
        defaultValue={content}
        onChange={handleOnChange}
        // theme="vs-dark"
      />
    </>
  ) : (
    <LoadingContent />
  );
};

const EmptyContent = () => (
  <div className="w-full h-5/6 flex items-center justify-center flex-col">
    <CircleOff  className="mb-2" />
    <p> nothing to show, Please select a file in the side bar </p>
  </div>
);

const LoadingContent = () => (
  <div className="w-full h-5/6 flex items-center justify-center">
<Loader2 className="" />
  </div>
);
