import {Result} from '../services/handler-service.interface';
import {Tree} from './tree';

export class BranchResult extends Result {
  private static readonly DEFAULT_TREE_NAME: string = 'root';
  public tree: Tree;

  constructor() {
    super();
    this.tree = new Tree(BranchResult.DEFAULT_TREE_NAME);
  }

}
