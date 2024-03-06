import { ConflictException, Injectable } from "@nestjs/common";
import { CreateWorkspaceDto, RenameFileOrFolderDto, SaveContentDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { WorkspaceRepository } from "./workspace.repository";

@Injectable()
export class WorkspacesService {
  constructor(private workspaceRepository: WorkspaceRepository) { }

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    return await this.workspaceRepository.create(
      createWorkspaceDto.relatedPath,
      createWorkspaceDto.type,
    );
  }

  async findOne(id: number) {
    return await this.workspaceRepository.findOne(id);
  }

  async getContent(workspaceName: string, path: string) {
    return await this.workspaceRepository.getContent(workspaceName, path);
  }

  async saveContent(workspaceName: string, saveContentDto: SaveContentDto) {
    const { content, relativePath } = saveContentDto;

    if (!(await this.workspaceRepository.isPathExisted(workspaceName,relativePath))) {
      console.log("the file doesn't existe");
      return;
    }

    return await this.workspaceRepository.saveFile(workspaceName,relativePath, content);
  }

  async renameFileOrFolder(
    workspaceName: string,
    renameFileOrFolderDto: RenameFileOrFolderDto,
  ) {
    const { newRelativePath, oldRelativePath } = renameFileOrFolderDto;
    console.log(workspaceName);
    if (!(await this.workspaceRepository.isPathExisted(workspaceName,oldRelativePath))) {
      throw new ConflictException("old path  doesn't existe")
      
    }
    if (await this.workspaceRepository.isPathExisted(workspaceName,newRelativePath)) {
      throw new ConflictException("new path does existe")
    }

    return await this.workspaceRepository.renamePath(workspaceName,oldRelativePath, newRelativePath);
  }

  findAll() {
    return `This action returns all workspaces`;
  }
  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    console.log(updateWorkspaceDto);
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
