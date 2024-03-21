"use client";

import React from "react";
import WorkspacePanelComponent from "./helpers/workspace-panel";
import EditorPanelComponents from "./helpers/editor-panel";
import VersionningPanelComponent from "./helpers/versionning-panel";

type Props = {};

const HomeComponent = (props: Props) => {
  return (
    <div className="flex justify-center content-center">
        <WorkspacePanelComponent />
        <EditorPanelComponents />
        <VersionningPanelComponent />
    </div>
  );
};

export default HomeComponent;
