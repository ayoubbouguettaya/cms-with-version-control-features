import { Dispatch, createContext, useReducer } from "react";
import { defaultContextValue } from "./constants";
import { workspaceReducer } from "./reducer";
import { WorkSpaceState } from "./types";

export const WorkSpaceContext = createContext<{
  state?: WorkSpaceState;
  dispatch?: Dispatch<{
    type: any;
    payload: any;
  }>;
}>({});

export type WorkSpaceProviderProps = {
  children: React.ReactNode;
};

export const WorkSpaceProvider = ({ children }: WorkSpaceProviderProps) => {
  const [state, dispatch] = useReducer(workspaceReducer, defaultContextValue);

  return (
    <WorkSpaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkSpaceContext.Provider>
  );
};
