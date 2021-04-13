import {Injectable} from '@angular/core';
import {Repository} from "../../models/repository";
import {ElectronService} from "../../../electron/services/electron/electron.service";
import {BranchHandlerService} from '../handlers/branch-handler.service';
import {BranchResult} from '../../models/branch.result';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(private readonly electronService: ElectronService,
              private readonly branchHandlerService: BranchHandlerService) {
  }

  public getLocalBranches(repository: Repository): Promise<BranchResult> {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(`cd ${repository.path} && git branch`, (err, stdout) => {
        err ? reject(err) : resolve(this.branchHandlerService.handle(stdout));
      });
    });
  }

  public getRemoteBranches(repository: Repository): Promise<BranchResult> {
    return new Promise((resolve, reject) => {
      this.electronService.childProcess.exec(`cd ${repository.path} && git branch -r`, (err, stdout) => {
        err ? reject(err) : resolve(this.branchHandlerService.handle(stdout, true));
      });
    });
  }
}
