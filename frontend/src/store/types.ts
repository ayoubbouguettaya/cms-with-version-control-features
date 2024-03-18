export type WorkSpaceState = {
    activeWorkSpace: string,
    activeItemIsDirectory: boolean,
    relativeActivePath : string,
    workspace: WorkSpaceItemProps,
    commitsHistory: commitHistory[] 
}

export type WorkSpaceItemProps = {
    name: string;
    type: "folder";
    items: WorkSpaceItems[];
  };
  
  export type WorkSpaceItems = {
    name: string;
    type: "folder" | "file";
    items?: WorkSpaceItems[];
  };

  
  export type commitHistory = {
    
        hash: string;
        author: string;
        message: string;
        date: string;
      
  }
