import { Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { WorkspaceRepository } from "./workspace.repository";

@Injectable()
export class WorkspacesService {
  constructor(private workspaceRepository: WorkspaceRepository) {}

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
