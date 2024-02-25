"use client";
import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { setLazyProp } from "next/dist/server/api-utils";

type Props = { activeItemPath: string };

const EditorPanelComponents = ({ activeItemPath }: Props) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsloading(true);
        const response = await axios.get(
          `http://localhost:5000/workspaces/workspace-1/content?path=${encodeURI(
            activeItemPath
          )}`
        );

        setContent(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchContent();
  }, [activeItemPath]);

  return (
    <div className="w-full p-6">
      <div className="flex text-slate-400 h-5 mb-3 items-center space-x-4 text-sm">
        {activeItemPath.split("/").map((item) => (
          item && <>
            <div>{item}</div>
            <Separator orientation="vertical" />
          </>
        ))}
      </div>
      {!isLoading ? (activeItemPath && 
        <Editor
          height="90vh"
          width={"100%"}
          defaultLanguage="Markdown"
          defaultValue={content}
          // theme="vs-dark"
        />): <p>Is loading ...</p>
      }
    </div>
  );
};

export default EditorPanelComponents;
