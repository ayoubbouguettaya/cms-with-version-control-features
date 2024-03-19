export type WorkSpaceState = {
    activeWorkSpaceName: string,
    activeItemIsDirectory: boolean,
    activeItemPath : string,
    workspace: WorkSpaceItemProps,
    commitsHistory: commitHistory[];
    author?: {
      userName: string,
      email: string
    }
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
        author_email: string;
        author_name: string;
        message: string;
        body: string;
        date: string;
  }

