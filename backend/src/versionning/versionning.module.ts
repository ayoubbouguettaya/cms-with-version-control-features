import { Module } from '@nestjs/common';
import { VersionningService } from './versionning.service';
import { VersionningController } from './versionning.controller';
import { VersionningRepository } from './versionning.repository';

@Module({
  controllers: [VersionningController],
  providers: [VersionningService,VersionningRepository],
})
export class VersionningModule {}
