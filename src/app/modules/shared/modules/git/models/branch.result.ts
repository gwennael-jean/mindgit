import {Result} from '../services/handler-service.interface';
import {Tree} from './tree';

export class BranchResult extends Result {
  public tree: Tree;

  constructor() {
    super();
    this.tree = new Tree('root');
  }

}
