import {Injectable} from '@angular/core';
import {Repository} from "../models/Repository";
import {ElectronService} from "../../electron/services/electron/electron.service";
import {BranchHandlerService, BranchResult} from "../handlers/branch-handler.service";

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(private electronService: ElectronService, private branchHandlerService: BranchHandlerService) {

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
}
