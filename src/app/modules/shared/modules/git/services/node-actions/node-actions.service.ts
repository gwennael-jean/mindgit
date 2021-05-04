import {Injectable} from '@angular/core';
import {GitNodeAction} from '../../../../models/git.node.action';
import {Node} from '../../models/node';
import {ActionTypeEnum} from '../../../../models/action.type.enum';
import {RepositoryModel} from '../../../../models/repository.model';
import {GitCommandsEnum} from '../../models/git.commands.enum';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NodeActionsService {

  constructor(private readonly translateService: TranslateService) {
  }

  public getActions(node: Node | undefined, repository: RepositoryModel | undefined): GitNodeAction[] {
    const actions: GitNodeAction[] = [];
    const branch: string = node ? node.name : '';

    if (node && repository) {
      // TODO add actions in function of node type local/remote?
      actions.push({
        messageI18n: this.translateService.instant('SHARED.MODULES.GIT.SERVICES.NODE-ACTIONS.PULL', {branch}),
        node: node,
        action: {
          gitCommand: GitCommandsEnum.PULL,
          actionType: ActionTypeEnum.NONE
        }
      });
      actions.push({
        messageI18n: this.translateService.instant('SHARED.MODULES.GIT.SERVICES.NODE-ACTIONS.PUSH', {branch}),
        node: node,
        action: {
          gitCommand: GitCommandsEnum.PUSH,
          actionType: ActionTypeEnum.NONE
        }
      });
      actions.push({
        messageI18n:  this.translateService.instant('SHARED.MODULES.GIT.SERVICES.NODE-ACTIONS.CHECKOUT', {branch}),
        node: node,
        action: {
          gitCommand: GitCommandsEnum.CHECKOUT,
          actionType: ActionTypeEnum.NONE
        }
      });
    }

    return actions;
  }
}
