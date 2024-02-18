import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [WorkspacesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
