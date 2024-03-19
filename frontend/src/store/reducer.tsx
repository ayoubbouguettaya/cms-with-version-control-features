import { ACTIONS } from "./actions";
import { WorkSpaceState } from "./types";

export const workspaceReducer = (
  state: WorkSpaceState,
  action: { type: ACTIONS; payload: any }
): WorkSpaceState => {
  switch (action.type) {
    case "SET_ACTIVE_PATH":
        return {...state,activeItemPath: action.payload}
    case "SET_IS_ACTIVE_PATH_DIRECTORY":
        return {...state,activeItemIsDirectory: action.payload}
    case "SET_WORKSPACE":
        return {...state,workspace: action.payload}
    case "SET_COMMITS_HISTORY":
        return {...state,commitsHistory: action.payload}
    default:
      break;
  }

  return state;
};
