import {GitCommandHelper} from './git.command.helper';
import {GitCommand} from '../../models/git.command';
import {GitCommandsEnum} from '../../models/git.commands.enum';
import {GitCommandsAttributesEnum} from '../../models/git.commands.attributes.enum';

describe('GitCommandHelper', () => {
  let expectedCommandLine: string;

  it('git branch local', () => {
    expectedCommandLine = 'git branch';
    const gitCommand: GitCommand = {command: GitCommandsEnum.BRANCH};
    expect(GitCommandHelper.fromSingleCommand(gitCommand))
      .toBe(expectedCommandLine);
  });

  it('git branch remote', () => {
    expectedCommandLine = 'git branch -r';
    const gitCommand: GitCommand = {
      command: GitCommandsEnum.BRANCH,
      attributes: [GitCommandsAttributesEnum.REMOTE]
    };
    expect(GitCommandHelper.fromSingleCommand(gitCommand))
      .toBe(expectedCommandLine);
  });

  it('git branch local in a pool of commands', () => {
    expectedCommandLine = 'git branch';
    const gitCommand: GitCommand = {command: GitCommandsEnum.BRANCH};
    expect(GitCommandHelper.fromMultipleCommands([gitCommand]))
      .toBe(expectedCommandLine);
  });

  it('git branch remote in a pool of commands', () => {
    expectedCommandLine = 'git branch -r';
    const gitCommand: GitCommand = {
      command: GitCommandsEnum.BRANCH,
      attributes: [GitCommandsAttributesEnum.REMOTE]
    };
    expect(GitCommandHelper.fromMultipleCommands([gitCommand]))
      .toBe(expectedCommandLine);
  });

  it('git add 1 file', () => {
    const files: string[] = ['test.ts'];
    expectedCommandLine = 'git add test.ts';
    const gitCommand: GitCommand = {
      command: GitCommandsEnum.ADD,
      attributes: files
    };
    expect(GitCommandHelper.fromSingleCommand(gitCommand))
      .toBe(expectedCommandLine);
  });

  it('git add 3 files', () => {
    const files: string[] = ['test.ts', 'test.css', 'test.html'];
    expectedCommandLine = 'git add test.ts test.css test.html';
    const gitCommand: GitCommand = {
      command: GitCommandsEnum.ADD,
      attributes: files
    };
    expect(GitCommandHelper.fromSingleCommand(gitCommand))
      .toBe(expectedCommandLine);
  });

  it('git commit with message', () => {
    expectedCommandLine = 'git commit -m "test"';
    const gitCommand: GitCommand = {
      command: GitCommandsEnum.COMMIT,
      attributes: [GitCommandsAttributesEnum.MESSAGE, 'test']
    };
    expect(GitCommandHelper.fromSingleCommand(gitCommand))
      .toBe(expectedCommandLine);
  });
});
