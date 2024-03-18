import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { VersionningService } from './versionning.service';
import { AddCommit, QueryHistory, ShowCommit } from './dto/versionning.dto';

@Controller('versionning')
@UsePipes(new ValidationPipe({transform: true,whitelist: true, forbidNonWhitelisted: true}))
export class VersionningController {
  constructor(private readonly versionningService: VersionningService) {}

  @Post('commit')
  async addCommit(
    @Body() addCommit: AddCommit) {
      return await this.versionningService.addCommit(addCommit)
  }

  @Get('commit')
  async logHistory(
    @Query() query: QueryHistory
    ) {
      return await this.versionningService.logHistory(query)

  }

  @Get('commit/:commitHash')
  async showCommit(
    @Param('commitHash') commitHash:string,
    @Query() showCommit: ShowCommit
    ) {
      return await this.versionningService.showCommit(commitHash,showCommit)

  }

  
}
