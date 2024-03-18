import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { VersionningModule } from './versionning/versionning.module';

@Module({
  imports: [WorkspacesModule, VersionningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
