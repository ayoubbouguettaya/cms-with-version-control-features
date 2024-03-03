import { Module } from "@nestjs/common";
import { WorkspacesService } from "./workspaces.service";
import { WorkspacesController } from "./workspaces.controller";
import { WorkspaceRepository } from "./workspace.repository";

@Module({
  controllers: [WorkspacesController],
  providers: [WorkspacesService, WorkspaceRepository],
})
export class WorkspacesModule {}
