import {Node} from '../modules/git/models/node';
import {ActionTypeEnum} from './action.type.enum';
import {GitCommandsEnum} from '../modules/git/models/git.commands.enum';

export interface GitNodeAction {
  messageI18n: string;
  node: Node;
  action: {
    gitCommand: GitCommandsEnum,
    actionType: ActionTypeEnum,
  };
}
