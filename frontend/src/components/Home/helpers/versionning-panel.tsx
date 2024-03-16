import { GitGraph } from "lucide-react";
import React from "react";

type Props = {};

const VersionningPanelComponent = (props: Props) => {
  return (
    <div className="w-96 p-3 bg-slate-100 border border-l-slate-200 h-dvh">
      <h2 className="bg-slate-500 text-green-300 p-2 rounded flex font-semibold border-b pb-2 mb-2">
        <GitGraph className="mr-1" />
        Versionning
      </h2>
    </div>
  );
};

export default VersionningPanelComponent;
