import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { workspacesPath } from 'src/utils';


const options: Partial<SimpleGitOptions> = {
    baseDir: workspacesPath,
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

export class VersionningRepository {
    private git: SimpleGit;

    constructor() {
        this.git = simpleGit(options);
        this.initiateRepos()
    }

    private async initiateRepos() {
        try {

            await this.git.init()
        } catch (error) {
            console.log(error);
        }
    }

    async addCommit(path: string, message: string, description: string, author: string) {
        try {
            await this.git.add(path)
            await this.git.commit(message, ["-m", description, `--author==${author}`])

        } catch (error) {
            console.log(error)
        }
    }

    async logHistory(path: string) {
        const logs = await this.git.log(['--', path])
        console.log(logs)
        /**
         * const query: string[] = [];
    const fileName = getFilePath()

    const { total: totalCount } = await this.git.log<DefaultLogFields>([
      ...query,
      '--',
      fileName,
    ]);

    const { all: commits, total: pageLength } =
      await this.git.log<DefaultLogFields>([
        `--max-count=${size}`,
        `--skip=${(page - 1) * size}`,
        ...query,
        '--',
        fileName,
      ]);

    const maxPages = Math.ceil(totalCount / size);

    return {
      items: commits,
      pageLength: pageLength,
      page: page,
      maxPages: maxPages,
      size: size,
      totalCount,
    };
         */
        return logs
    }

    async showCommit(path: string, commitHash: string) {
        const log = await this.git.show(`${commitHash}:${path}`)
        return log
    }

    async diffCommit(path: string, commitHash: string) {
        const changes = await this.git.show([commitHash, '--pretty=format:%b', '--', path]);
        return changes
    }

    rollBack(commitHash: string) {
        /* 
        I found that the answer in stackoverflow is awesome and we can easly build uppon that logic
    
        Link : https://stackoverflow.com/questions/1463340/how-can-i-revert-multiple-git-commits
    
    Expanding what I wrote in a comment
    
    The general rule is that you should not rewrite (change) history that you have published, because somebody might have based their work on it. If you rewrite (change) history, you would make problems with merging their changes and with updating for them.
    
    So the solution is to create a new commit which reverts changes that you want to get rid of. You can do this using git revert command.
    
    You have the following situation:
    
    A <-- B  <-- C <-- D                                  <-- master <-- HEAD
    
    (arrows here refers to the direction of the pointer: the "parent" reference in the case of commits, the top commit in the case of branch head (branch ref), and the name of branch in the case of HEAD reference).
    
    What you need to create is the following:
    
    A <-- B  <-- C <-- D <-- [(BCD)-1]                   <-- master <-- HEAD
    
    where [(BCD)^-1] means the commit that reverts changes in commits B, C, D. Mathematics tells us that (BCD)-1 = D-1 C-1 B-1, so you can get the required situation using the following commands:
    
    $ git revert --no-commit D
    $ git revert --no-commit C
    $ git revert --no-commit B
    $ git commit -m "the commit message for all of them"
    
    Works for everything except merge commits.
    
    Alternate solution would be to checkout contents of commit A, and commit this state. Also works with merge commits. Added files will not be deleted, however. If you have any local changes git stash them first:
    
    $ git checkout -f A -- . # checkout that revision over the top of local files
    $ git commit -a
    
    Then you would have the following situation:
    
    A <-- B  <-- C <-- D <-- A'                       <-- master <-- HEAD
    
    The commit A' has the same contents as commit A, but is a different commit (commit message, parents, commit date).
    
    Alternate solution by Jeff Ferland, modified by Charles Bailey builds upon the same idea, but uses git reset. Here it is slightly modified, this way WORKS FOR EVERYTHING:
    
    $ git reset --hard A
    $ git reset --soft D # (or ORIG_HEAD or @{1} [previous location of HEAD]), all of which are D
    $ git commit
        */
        return 'Rollback is not implemnted yet!';
    }
}