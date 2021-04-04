import {Injectable} from '@angular/core';
import {GitModule} from "../git.module";
import {HandlerService, Result} from "../HandlerService";
import {Folder} from "../models/Folder";
import {Branch} from "../models/Branch";

export class BranchResult extends Result {
  tree: Tree;

  constructor() {
    super();
    this.tree = new Tree('root');
  }

}

export class Tree extends Folder {

}

@Injectable({
  providedIn: GitModule
})
export class BranchHandlerService implements HandlerService<BranchResult> {

  constructor() {
  }

  handle(stdout: string): BranchResult {
    const result = new BranchResult();

    const branches = stdout.split('\n')
      .filter(b => b.length > 0)
      .forEach(b => {
        const isCurrent = b.startsWith('* ');

        const path = b.substr(2);
        const pathSplitted = path.split('/');
        let currentLevel = result.tree;

        for (let i = 0; i < pathSplitted.length; i++) {
          const part = pathSplitted[i];

          if (i !== pathSplitted.length - 1) {
            let folder = null;
            if (!currentLevel.has(part)) {
              folder = new Folder(part);
              currentLevel.add(folder);
            } else {
              folder = currentLevel.get(part);
            }

            currentLevel = folder;

          } else {
            const branch = new Branch(part);
            branch.isCurrent = isCurrent;

            currentLevel.add(branch);
          }
        }
      });

    return result;
  }
}
