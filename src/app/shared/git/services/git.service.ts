import {Injectable} from '@angular/core';
import {Repository} from "../models/Repository";
import {ElectronService} from "../../electron/services/electron/electron.service";
import {BranchHandlerService, BranchResult} from "../handlers/branch-handler.service";
import {LogHandlerService, LogResult, PRETTY_FORMAT} from "../handlers/log-handler.service";

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(
    private readonly electronService: ElectronService,
    private readonly branchHandlerService: BranchHandlerService,
    private readonly logHandlerService: LogHandlerService,
  ) {
  }

  public getLocalBranches(repository: Repository): Promise<BranchResult>
  {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(`cd ${repository.path} && git branch`, (err, stdout) => {
        if (err) reject(err);
        resolve(this.branchHandlerService.handle(stdout));
      });
    });
  }

  public getRemoteBranches(repository: Repository): Promise<BranchResult>
  {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(`cd ${repository.path} && git branch -r`, (err, stdout) => {
        if (err) reject(err);
        resolve(this.branchHandlerService.handle(stdout, true));
      });
    });
  }

  public getLogs(repository: Repository): Promise<LogResult>
  {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(`cd ${repository.path} && git log --all --pretty=format:"${PRETTY_FORMAT}"`, (err, stdout) => {
        if (err) reject(err);
        resolve(this.logHandlerService.handle(stdout));
      });
    });
  }
}
