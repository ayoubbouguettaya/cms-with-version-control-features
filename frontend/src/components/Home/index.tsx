"use client";

import React, { useState } from "react";
import WorkspacePanelComponent from "./helpers/workspace-panel";
import EditorPanelComponents from "./helpers/editor-panel";
import VersionningPanelComponent from "./helpers/versionning-panel";
import { WorkSpaceProvider } from "@/store/context";

type Props = {};

const HomeComponent = (props: Props) => {
  const [activeItemPath, setActiveItemPath] = useState("");
  const [activeItemIsDirectory, setActiveItemIsDirectory] = useState(true);

  return (
    <div className="flex justify-center content-center">
      <WorkSpaceProvider>
        <WorkspacePanelComponent
          activeItemPath={activeItemPath}
          setactiveItemPath={setActiveItemPath}
          setActiveItemIsDirectory={setActiveItemIsDirectory}
        />
        <EditorPanelComponents
          activeItemIsDirectory={activeItemIsDirectory}
          activeItemPath={activeItemPath}
        />
        <VersionningPanelComponent />
      </WorkSpaceProvider>
    </div>
  );
};

export default HomeComponent;
