import { WorkSpaceState, commitHistory } from "./types";

const commitsHistoryData = [] as commitHistory[];

  export const defaultContextValue = {
    author: {
      userName: "ayoub_bougue",
      email: "ayoubbougue@foobarz.blog"
    },
    activeWorkSpaceName: "workspace-1",
    activeItemIsDirectory: true,
    activeItemPath : "",
    workspace: {
        name: "workspace-1",
        items: [],
        type: "folder"
    },
    commitsHistory: commitsHistoryData 
} satisfies WorkSpaceState;
