import { Dispatch, createContext, useReducer } from "react";
import { defaultContextValue } from "./constants";
import { workspaceReducer } from "./reducer";
import { WorkSpaceState } from "./types";
import { ACTIONS } from "./actions";

export const WorkSpaceContext = createContext<{
  state?: WorkSpaceState;
  dispatch?: Dispatch<{
    type: ACTIONS;
    payload: any;
  }>;
}>({});

export type WorkSpaceProviderProps = {
  children: React.ReactNode;
};

export const WorkSpaceProvider = ({ children }: WorkSpaceProviderProps) => {
  const [state, dispatch] = useReducer(workspaceReducer, defaultContextValue);

  if(!WorkSpaceContext) throw new Error("context undefined");

  
  return (
    <WorkSpaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkSpaceContext.Provider>
  );
};
