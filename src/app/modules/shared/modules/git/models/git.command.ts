import {GitCommandsEnum} from './git.commands.enum';
import {GitCommandsAttributesEnum} from './git.commands.attributes.enum';

export interface GitCommand {
  command: GitCommandsEnum;
  attributes?: (GitCommandsAttributesEnum | string)[];
}
