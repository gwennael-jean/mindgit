import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {GitService} from "../../../../shared/modules/git/services/git-service/git.service";
import {Tree} from '../../../../shared/modules/git/models/tree';
import {BranchResult} from '../../../../shared/modules/git/models/branch.result';
import {RepositoryModel} from '../../../../shared/models/repository.model';

@Component({
  selector: 'app-branch-manager',
  templateUrl: './branch-manager.component.html',
  styleUrls: ['./branch-manager.component.scss']
})
export class BranchManagerComponent implements OnChanges {

  @Input()
  public repository?: RepositoryModel;

  public localBranches?: Tree;
  public remoteBranches?: Tree;

  constructor(private gitService: GitService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.repository) {
      this.gitService.getLocalBranches(this.repository)
        .then((branchResult: BranchResult) => this.localBranches = branchResult.tree);

      this.gitService.getRemoteBranches(this.repository)
        .then((branchResult: BranchResult) => this.remoteBranches = branchResult.tree);
    }
  }
}
