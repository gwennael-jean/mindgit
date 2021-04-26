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

  protected regexIsCurrent = /^\* /;

  protected regexBranchInFolder = /\//;

  protected regexBranchHead = /HEAD \-\>/;

  protected isRemote: boolean = false;

  public handle(stdout: string): BranchResult {
    const result = new BranchResult();

    stdout.split('\n')
      .filter(b => b.length > 0)
      .filter(b => this.removeHeadLine(b))
      .sort((a: string, b: string) => this.sortBranch(a, b))
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
              folder = i === 0 && this.isRemote ? new Remote(part) : new Folder(part);
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

  protected removeHeadLine(b: string) {
    return null === this.regexBranchHead.exec(b);
  }

  protected sortBranch(a: string, b: string) {
    let branchA = a;
    let branchB = b;

    if (this.isRemote) {
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
