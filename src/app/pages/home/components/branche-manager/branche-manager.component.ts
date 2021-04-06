import {Component, Input, OnInit} from '@angular/core';
import {GitService} from "../../../../shared/git/services/git.service";
import {Repository} from "../../../../shared/git/models/Repository";
import {BranchResult, Tree} from "../../../../shared/git/handlers/branch-handler.service";

@Component({
  selector: 'app-branche-manager',
  templateUrl: './branche-manager.component.html',
  styleUrls: ['./branche-manager.component.scss']
})
export class BrancheManagerComponent implements OnInit {

  @Input()
  public repository: Repository;

  public localBranches: Tree;

  public remoteBranches: Tree;

  constructor(private gitService: GitService) {
    this.localBranches = null;
    this.remoteBranches = null;
  }

  ngOnInit(): void {
    this.gitService.getLocalBranches(this.repository)
      .then((branchResult: BranchResult) => this.localBranches = branchResult.tree);

    this.gitService.getRemoteBranches(this.repository)
      .then((branchResult: BranchResult) => this.remoteBranches = branchResult.tree);
  }

}
