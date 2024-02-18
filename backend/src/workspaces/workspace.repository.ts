import { Injectable } from '@nestjs/common';

const workspacesData = [
  {
    id: 1,
    workspaceName: 'workspace',
    items: [
      {
        type: 'folder',
        name: 'folder-1',
        items: [
          {
            type: 'folder',
            name: 'sub-folder1',
            items: [
              {
                type: 'file',
                name: 'folder-568.md',
              },
            ],
          },
          {
            type: 'file',
            name: 'file-example.md',
          },
        ],
      },
      {
        type: 'folder',
        name: 'folder-2',
        items: [
          {
            type: 'file',
            name: 'folder-98.md',
          },
        ],
      },
      {
        type: 'file',
        name: 'file-example2.md',
      },
    ],
  },
];

@Injectable()
export class WorkspaceRepository {
  constructor() {}

  findOne(id: number) {
    return workspacesData.find((item) => item.id === id);
  }
}
