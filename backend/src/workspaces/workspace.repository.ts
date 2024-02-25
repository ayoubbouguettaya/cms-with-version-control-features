import { Injectable } from "@nestjs/common";
import { mkdir, readFile, readdir, stat, writeFile } from "fs/promises";
import { join } from "path";

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

const workspacesPath = "/home/ayoub/applications/cms";

@Injectable()
export class WorkspaceRepository {
  async findOne(id: number) {
    const workspaces = await readdir(workspacesPath);

    const data = [] as Item[];

    await Promise.all(
      workspaces.map(async (item) => {
        const stats = await stat(join(workspacesPath, item));

        if (stats.isDirectory()) {
          const workspace = {
            name: item,
            type: "folder",
            items: [],
          } satisfies Item;

          await this.readWorkspace(workspace, join(workspacesPath, item));

          data.push(workspace);
        }
        return null;
      }),
    );

    return data[0];
  }

  private async readWorkspace(data: Item, currentPath: string) {
    const childrenItems = await readdir(currentPath);

    await Promise.all(
      childrenItems.map(async (item) => {
        const stats = await stat(join(currentPath, item));
        if (stats.isFile()) {
          const file = {
            name: item,
            type: "file",
            items: [],
          } satisfies Item;

          data.items.push(file);
        }
        if (stats.isDirectory()) {
          const directory = {
            name: item,
            type: "folder",
            items: [],
          } satisfies Item;

          await this.readWorkspace(directory, join(currentPath, item));

          data.items.push(directory);
        }
      }),
    );
  }

  async getContent(workspaceName: string, path: string) {
    try {
      const absolutePath = join(workspacesPath, workspaceName, path);
      console.log(absolutePath);
      return await readFile(absolutePath, "utf8");
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async create(relatedPath: string, type: "folder" | "file") {
    const paths = relatedPath.split("/");

    const cleanedPaths = paths[paths.length - 1].includes(".")
      ? paths.slice(0, paths.length - 1)
      : paths;

    const workspace = await this.findOne(0);

    if (type === "file") this.addFile(workspace, 0, cleanedPaths);

    if (type === "folder") this.addFolder(workspace, 0, cleanedPaths);

    return workspace;
  }

  async addFile(data: Item, level, cleanedPaths: string[]) {
    const currentLevel = level;

    if (data.name === cleanedPaths[level]) {
      if (cleanedPaths.length - 1 === level) {
        data.items.push({
          type: "file",
          name: `new-file-${data.items.length}.md`,
          items: [],
        });

        const absolutePath = join(workspacesPath, ...cleanedPaths);
        await writeFile(
          join(absolutePath, `new-file-${data.items.length}.md`),
          "just file",
          "utf-8",
        );

        console.log("_____________________we made it");
        return true;
      }

      data.items.forEach((item) => {
        if (this.addFile(item, currentLevel + 1, cleanedPaths)) return true;
      });
    }
    return false;
  }

  async addFolder(data: Item, level, cleanedPaths) {
    const currentLevel = level;

    if (data.name === cleanedPaths[level]) {
      if (cleanedPaths.length - 1 === level) {
        data.items.push({
          type: "folder",
          name: `new-folder-${data.items.length}`,
          items: [],
        });

        const absolutePath = join(workspacesPath, ...cleanedPaths);
        await mkdir(join(absolutePath, `new-folder-${data.items.length}`));

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
