import { Injectable } from "@nestjs/common";

const workspacesData = [
  {
    name: "workspace",
    type: "folder",
    items: [
      {
        type: "folder",
        name: "folder-1",
        items: [
          {
            type: "folder",
            name: "sub-folder1",
            items: [
              {
                type: "file",
                name: "folder-568.md",
              },
            ],
          },
          {
            type: "file",
            name: "file-example.md",
          },
        ],
      },
      {
        type: "folder",
        name: "folder-2",
        items: [
          {
            type: "file",
            name: "folder-98.md",
          },
        ],
      },
      {
        type: "file",
        name: "file-example2.md",
      },
    ],
  },
] as Item[];

export type Item = {
  name: string;
  type: "folder" | "file";
  items: Item[];
};

@Injectable()
export class WorkspaceRepository {
  findOne(id: number) {
    console.log("ignore", id);
    return workspacesData[0];
  }

  async create(relatedPath: string, type: "folder" | "file") {
    console.log("ignore", type);
    const paths = relatedPath.split("/").slice(1);

    const cleanedPaths = paths[paths.length - 1].includes(".")
      ? paths.slice(0, paths.length - 1)
      : paths;

    if (type === "file")
      this.addFile(workspacesData[0], 0, ["workspace", ...cleanedPaths]);

    if (type === "folder")
      this.addFolder(workspacesData[0], 0, ["workspace", ...cleanedPaths]);

    return workspacesData[0];
  }

  addFile(data: Item, level, cleanedPaths) {
    const currentLevel = level;

    if (data.name === cleanedPaths[level]) {
      if (cleanedPaths.length - 1 === level) {
        data.items.push({
          type: "file",
          name: `new-file-${data.items.length}.md`,
          items: [],
        });
        console.log("_____________________we made it");
        return true;
      }

      data.items.forEach((item) => {
        if (this.addFile(item, currentLevel + 1, cleanedPaths)) return true;
      });
    }
    return false;
  }

  addFolder(data: Item, level, cleanedPaths) {
    const currentLevel = level;

    if (data.name === cleanedPaths[level]) {
      if (cleanedPaths.length - 1 === level) {
        data.items.push({
          type: "folder",
          name: `new-folder-${data.items.length}`,
          items: [],
        });
        console.log("_____________________we made it");
        return true;
      }

      data.items.forEach((item) => {
        if (this.addFolder(item, currentLevel + 1, cleanedPaths)) return true;
      });
    }
    return false;
  }
}
