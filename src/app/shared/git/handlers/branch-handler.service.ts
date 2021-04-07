import {Injectable} from '@angular/core';
import {GitModule} from "../git.module";
import {HandlerService, Result} from "../HandlerService";
import {Folder} from "../models/Folder";
import {Branch} from "../models/Branch";
import {Remote} from "../models/Remote";

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

  regexIsCurrent = /^\* /;

  regexBranchInFolder = /\//;

  regexBranchHead = /HEAD \-\>/;

  constructor() {
  }

  handle(stdout: string, isRemote = false): BranchResult {
    const result = new BranchResult();

    const branches = stdout.split('\n')
      .filter(b => b.length > 0)
      .filter(b => this.removeHeadLine(b))
      .sort((a: string, b: string) => this.sortBranch(a, b, isRemote))
      .forEach(b => {
        const isCurrent = null !== this.regexIsCurrent.exec(b);

        const path = b.substr(2);
        const pathSplitted = path.split('/');
        let currentLevel = result.tree;

        for (let i = 0; i < pathSplitted.length; i++) {
          const part = pathSplitted[i];

          if (i !== pathSplitted.length - 1) {
            let folder = null;

            if (!currentLevel.has(part)) {
              folder = i === 0 && isRemote ? new Remote(part) : new Folder(part);
              currentLevel.add(folder);
            } else {
              folder = currentLevel.get(part);
            }

            currentLevel = folder;

          } else {
            const branch = new Branch(part, isCurrent);

            currentLevel.add(branch);
          }
        }
      });

    return result;
  }

  private removeHeadLine(b: string) {
    return null === this.regexBranchHead.exec(b);
  }

  private sortBranch(a: string, b: string, isRemote: boolean) {
    let branchA = a;
    let branchB = b;

    if (isRemote) {
      branchA = branchA.substr(branchA.indexOf("/") + 1);
      branchB = branchB.substr(branchB.indexOf("/") + 1);
    }

    if (this.regexBranchInFolder.exec(branchA) && this.regexBranchInFolder.exec(branchB))
      return 0;
    else if (this.regexBranchInFolder.exec(branchA))
      return -1;
    else if (this.regexBranchInFolder.exec(branchB))
      return 1;
    return 0;
  }
}
