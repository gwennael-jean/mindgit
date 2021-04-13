import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {GitService} from "../../../../shared/modules/git/services/git-service/git.service";
import {Repository} from "../../../../shared/modules/git/models/repository";
import {Tree} from '../../../../shared/modules/git/models/tree';
import {BranchResult} from '../../../../shared/modules/git/models/branch.result';

@Component({
  selector: 'app-branche-manager',
  templateUrl: './branche-manager.component.html',
  styleUrls: ['./branche-manager.component.scss']
})
export class BrancheManagerComponent implements OnChanges {

  @Input()
  public repository: Repository;

  public localBranches: Tree;

  public remoteBranches: Tree;

  constructor(private gitService: GitService) {
    this.localBranches = null;
    this.remoteBranches = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.gitService.getLocalBranches(this.repository)
      .then((branchResult: BranchResult) => this.localBranches = branchResult.tree);

    this.gitService.getRemoteBranches(this.repository)
      .then((branchResult: BranchResult) => this.remoteBranches = branchResult.tree);
  }
}
