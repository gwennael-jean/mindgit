import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../modules/git/models/node';
import {GitNodeAction} from '../../models/git.node.action';
import {NodeActionsService} from '../../modules/git/services/node-actions/node-actions.service';
import {RepositoryModel} from '../../models/repository.model';
import {GitCommandsEnum} from '../../modules/git/models/git.commands.enum';
import {GitService} from '../../modules/git/services/git-service/git.service';
import {BranchResult} from '../../modules/git/models/branch.result';

@Component({
  selector: 'app-branch-list-node',
  templateUrl: './branch-list-node.component.html',
  styleUrls: ['./branch-list-node.component.scss']
})
export class BranchListNodeComponent {

  @Input()
  public repository?: RepositoryModel;

  @Input()
  public node?: Node;

  @Input()
  public openSubFolder = true;

  @Input()
  public open = true;

  public actions: GitNodeAction[] = [];

  constructor(private readonly nodeActionsService: NodeActionsService,
              private readonly gitService: GitService) {
  }

  /**
   *actions must be evaluated on click, if the branch is already checkouted, its status, etc.
   */
  public getActions(): GitNodeAction[] {
    return this.actions = this.nodeActionsService.getActions(this.node, this.repository);
  }

  public async doAction(gitNodeAction: GitNodeAction): Promise<void> {
    // TODO open modal or workflow (cherry pick/rebase), conflicts...
    if (this.repository && this.node) {
      let result: Promise<BranchResult> | undefined;
      switch (gitNodeAction.action.gitCommand) {
        case GitCommandsEnum.PULL:
          console.log('pulling');
          result = this.gitService.pull(this.repository, this.node.name);
          break;
        default:
          console.log('nothing to do');
          break;
      }

      if (result) {
        result.then((branchResult: BranchResult) => {
            console.log('doAction result', branchResult);
          }
        )
      }
    }
  }
}
