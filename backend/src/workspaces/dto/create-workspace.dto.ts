export class CreateWorkspaceDto {
  relatedPath: string;
  type: "folder" | "file";
}

export class SaveContentDto {
  content: string;
  relativePath: string;
}

export class RenameFileOrFolderDto {
  oldRelativePath: string;
  newRelativePath: string;
}
