import {Injectable} from '@angular/core';
import {ElectronService} from "../../../electron/services/electron/electron.service";
import {BranchHandlerService} from '../handlers/branch-handler.service';
import {BranchResult} from '../../models/branch.result';
import {RepositoryModel} from '../../../../models/repository.model';
import {GitCommand} from '../../models/git.command';
import {GitCommandHelper} from './git.command.helper';
import {GitCommandsEnum} from '../../models/git.commands.enum';
import {GitCommandsAttributesEnum} from '../../models/git.commands.attributes.enum';
import {HandlerServiceInterface} from '../handler-service.interface';
import {LocalBranchHandlerService} from '../handlers/local-branch-handler.service';
import {RemoteBranchHandlerService} from '../handlers/remote-branch-handler.service';
import {StatusHandlerService} from '../handlers/status-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GitService {
  constructor(
    private readonly electronService: ElectronService,
    private readonly localBranchHandlerService: LocalBranchHandlerService,
    private readonly remoteBranchHandlerService: RemoteBranchHandlerService,
    private readonly statusHandlerService: StatusHandlerService,
  ) {
  }

  public fetch(repository: RepositoryModel): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.FETCH};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  /**
   /* TODO see how to login when we change from a repository to another
   * Be careful of authentication and config (ssh key/ pgp key, what else...)
   * @param repository target repository
   * @param remoteUrl git remote url
   */
  public clone(repository: RepositoryModel, remoteUrl: string): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.CLONE, attributes: [remoteUrl]};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public checkout(repository: RepositoryModel, branch: string): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.CHECKOUT, attributes: [branch]};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public status(repository: RepositoryModel): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.STATUS, attributes: [GitCommandsAttributesEnum.PORCELAIN]};
    return this.execGitCommand(repository, this.statusHandlerService, [command]);
  }

  public getLocalBranches(repository: RepositoryModel): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.BRANCH};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public getRemoteBranches(repository: RepositoryModel): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.BRANCH, attributes: [GitCommandsAttributesEnum.REMOTE]};
    return this.execGitCommand(repository, this.remoteBranchHandlerService, [command]);
  }

  public checkoutBranch(repository: RepositoryModel, branchName: string, create: boolean = false): Promise<BranchResult> {
    const attributes: (GitCommandsAttributesEnum | string)[] = create ? [GitCommandsAttributesEnum.NEW_BRANCH, branchName] : [branchName];
    const command: GitCommand = {command: GitCommandsEnum.CHECKOUT, attributes: attributes};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public commit(repository: RepositoryModel, message?: string): Promise<BranchResult> {
    const attributes: (GitCommandsAttributesEnum | string)[] = !message ? [] : [GitCommandsAttributesEnum.MESSAGE, message];
    const command: GitCommand = {command: GitCommandsEnum.COMMIT, attributes: attributes};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public add(repository: RepositoryModel, files: string[]): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.ADD, attributes: files};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public pull(repository: RepositoryModel, branch: string): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.PULL, attributes: [branch]};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public push(repository: RepositoryModel, branch: string, all: boolean = false): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.PUSH, attributes: all ? [GitCommandsAttributesEnum.ALL] : [branch]};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public stashUntracked(repository: RepositoryModel): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.STASH, attributes: [GitCommandsAttributesEnum.UNTRACKED]};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  public stashPop(repository: RepositoryModel): Promise<BranchResult> {
    const command: GitCommand = {command: GitCommandsEnum.STASH, attributes: [GitCommandsAttributesEnum.POP]};
    return this.execGitCommand(repository, this.localBranchHandlerService, [command]);
  }

  private execGitCommand(repository: RepositoryModel, handlerServiceInterface: HandlerServiceInterface<any>, commands: GitCommand[]): Promise<BranchResult> {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess?.exec(`cd ${repository.path} && ${GitCommandHelper.fromMultipleCommands(commands)}`,
        (err, stdout) => {
          err ? reject(err) : resolve(handlerServiceInterface.handle(stdout));
        });
    });
  }
}
