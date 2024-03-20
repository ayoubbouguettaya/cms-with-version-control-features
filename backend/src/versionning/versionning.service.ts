import { Injectable } from '@nestjs/common';
import { InitializeRepos, AddCommit, QueryHistory, ShowCommit } from './dto/versionning.dto';
import { VersionningRepository } from './versionning.repository';
import { join } from 'path';

@Injectable()
export class VersionningService {
  constructor(
    private versionningRepository: VersionningRepository
  ) { }

  async addCommit(addCommit: AddCommit) {
    const { author, description, message, relativeRelativePath, workspaceName } = addCommit;
    
    await this.versionningRepository.addCommit(
      join(workspaceName, relativeRelativePath),
      message,
      description,
      author
    )
  }

  async logHistory(query: QueryHistory) {
    const {relativeRelativePath,workspaceName} = query;

    return await this.versionningRepository.logHistory(
      join(workspaceName, relativeRelativePath)
    )
  }

  async showCommit(commitHash:string,showCommit: ShowCommit) {
    const {relativeRelativePath,workspaceName} = showCommit;

    return await this.versionningRepository.diffCommit(
      join(workspaceName, relativeRelativePath),
      commitHash
    )
  }

  async showContentCommit(commitHash:string,showCommit: ShowCommit) {
    const {relativeRelativePath,workspaceName} = showCommit;

    return await this.versionningRepository.showContentAtCommit(
      join(workspaceName, relativeRelativePath),
      commitHash
    )
  }

}
