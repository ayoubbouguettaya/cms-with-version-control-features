import { WorkSpaceState } from "./types";

const commitsHistoryData = [
    {
      hash: "fshv565EHGEVCEG",
      author: "ayoub bouguettaya",
      message: "update docs / v1 / products/",
      date: "Wed Mar 6 09:57:54 2024 +0100",
    },
    {
      hash: "fshv565EqdjfnvCEG",
      author: "ayoub bouguettaya",
      message: "update docs / v1 / orders/",
      date: "Wed Mar 6 08:57:54 2024 +0100",
    },
    {
      hash: "fshv565EqdrernvCEG",
      author: "ayoub bouguettaya",
      message: "update docs / v1 / orders/",
      date: "Wed Mar 6 08:57:54 2024 +0100",
    }, {
      hash: "fshv565EererjfnvCEG",
      author: "ayoub bouguettaya",
      message: "update docs / v0 / orders/",
      date: "Wed Mar 6 07:57:54 2024 +0100",
    }, {
      hash: "fshv565EqdjcdddrrvCEG",
      author: "ayoub bouguettaya",
      message: "update docs / v0/ orders/",
      date: "Wed Mar 6 06:57:54 2024 +0100",
    },
  ];

  export const defaultContextValue = {
    activeWorkSpace: "",
    activeItemIsDirectory: false,
    relativeActivePath : "",
    workspace: {
        name: "workspace-1",
        items: [],
        type: "folder"
    },
    commitsHistory: commitsHistoryData 
} satisfies WorkSpaceState;
