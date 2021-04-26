import {GitCommand} from '../../models/git.command';
import {GitCommandsAttributesEnum} from '../../models/git.commands.attributes.enum';
import {GitCommandsEnum} from '../../models/git.commands.enum';

/**
 * Used to construct git commands
 */
export class GitCommandHelper {
  public static fromSingleCommand(command: GitCommand): string {
    let commandLine: string = 'git ' + command.command;
    if (command.attributes) {
      command.attributes.forEach((attribute: GitCommandsAttributesEnum | string) => {
        // special case of commit where message must be embedded with ""
        if (command.command === GitCommandsEnum.COMMIT && commandLine.indexOf(GitCommandsAttributesEnum.MESSAGE) > -1 && typeof attribute === 'string') {
          attribute = `"${attribute}"`;
        }
        commandLine = commandLine + ' ' + attribute;
      });
    }
    return commandLine;
  }

  public static fromMultipleCommands(commands: GitCommand[]): string {
    let commandLine: string | undefined;

    commands.forEach((command: GitCommand) => {
      if (commandLine) {
        commandLine = commandLine + ' && ';
      }
      commandLine = (commandLine ? commandLine : '') + GitCommandHelper.fromSingleCommand(command);
    });


    return commandLine ? commandLine : '';
  }


}
