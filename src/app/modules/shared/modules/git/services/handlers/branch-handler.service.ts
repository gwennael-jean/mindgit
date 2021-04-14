import {Injectable} from '@angular/core';
import {HandlerServiceInterface} from "../handler-service.interface";
import {Folder} from "../../models/folder";
import {Branch} from "../../models/branch";
import {Remote} from "../../models/remote";
import {BranchResult} from '../../models/branch.result';

@Injectable({
  providedIn: 'root'
})
export class BranchHandlerService implements HandlerServiceInterface<BranchResult> {

  private regexIsCurrent = /^\* /;
  private regexBranchInFolder = /\//;
  private regexBranchHead = /HEAD \-\>/;

  public handle(stdout: string, isRemote = false): BranchResult {
    const result = new BranchResult();

    stdout.split('\n')
      .filter(b => b.length > 0)
      .filter(b => this.removeHeadLine(b))
      .sort((a: string, b: string) => this.sortBranch(a, b, isRemote))
      .forEach(b => {
        const isCurrent: boolean = null !== this.regexIsCurrent.exec(b);
        const path: string = b.substr(2);
        const pathSplitted: string[] = path.split('/');
        let currentLevel: Folder | null = result.tree;

        for (let i = 0; i < pathSplitted.length; i++) {
          const part = pathSplitted[i];

          if (i !== pathSplitted.length - 1) {
            let folder = null; // var type ? Node ? Folder? poney?

            if (!currentLevel?.has(part)) {
              folder = i === 0 && isRemote ? new Remote(part) : new Folder(part);
              currentLevel?.add(folder);
            } else {
              folder = currentLevel.get(part);
            }

            // @ts-ignore
            currentLevel = folder;

          } else {
            const branch = new Branch(part, isCurrent);
            currentLevel?.add(branch);
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

    if (this.regexBranchInFolder.exec(branchA) && this.regexBranchInFolder.exec(branchB)) {
      return 0;
    }
    else if (this.regexBranchInFolder.exec(branchA)) {
      return -1;
    }
    else if (this.regexBranchInFolder.exec(branchB)) {
      return 1;
    }
    return 0;
  }
}
