import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { WorkspacesService } from "./workspaces.service";
import { CreateWorkspaceDto, RenameFileOrFolderDto, SaveContentDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";

@Controller("workspaces")
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) { }

  @Post(":workspaceName")
  create(
    @Param("workspaceName") workspaceName: string,
    @Body() createWorkspaceDto: CreateWorkspaceDto
    ) {
    return this.workspacesService.create(workspaceName,createWorkspaceDto);
  }

  @Get(":workspaceName")
  findOne(@Param("workspaceName") workspaceName: string) {
    return this.workspacesService.findOne(workspaceName);
  }

  @Get(":workspaceName/content")
  async getContent(
    @Query("path") path: string,
    @Param("workspaceName") workspaceName: string,
  ) {
    return await this.workspacesService.getContent(workspaceName, path);
  }

  @Post(":workspaceName/content")
  async saveContent(
    @Body() saveContentDto: SaveContentDto,
    @Param("workspaceName") workspaceName: string,
  ) {
    return await this.workspacesService.saveContent(
      workspaceName,
      saveContentDto,
    );
  }

  @Patch(":workspaceName")
  async renameFileOrFolder(
    @Body() renameFileOrFolderDto: RenameFileOrFolderDto,
    @Param("workspaceName") workspaceName: string,
  ) {
    return await this.workspacesService.renameFileOrFolder(
      workspaceName,
      renameFileOrFolderDto,
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(+id, updateWorkspaceDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workspacesService.remove(+id);
  }
}
