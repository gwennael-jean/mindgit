import {Node} from "./Node";

export class Branch extends Node {

  path: string;

  isCurrent: boolean;

  constructor(name: string, isCurrent = false) {
    super(name);
    this.iconClass = 'fas fa-code-branch';
    this.isCurrent = isCurrent;
  }
}
