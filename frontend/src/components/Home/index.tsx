"use client";

import React, { useState } from "react";
import WorkspacePanelComponent from "./helpers/workspace-panel";
import EditorPanelComponents from "./helpers/editor-panel";
import VersionningPanelComponent from "./helpers/versionning-panel";

type Props = {};

const HomeComponent = (props: Props) => {
  const [activeItemPath, setactiveItemPath] = useState("");
  const [activeItemIsDirectory,setActiveItemIsDirectory] = useState(true);

  return (
    <div className="flex justify-center content-center">
      <WorkspacePanelComponent
        activeItemPath={activeItemPath}
        setactiveItemPath={setactiveItemPath}
        setActiveItemIsDirectory={setActiveItemIsDirectory}
      />
      <EditorPanelComponents activeItemIsDirectory={activeItemIsDirectory} activeItemPath={activeItemPath} />
      <VersionningPanelComponent />
    </div>
  );
};

export default HomeComponent;
