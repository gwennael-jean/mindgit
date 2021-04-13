import {Node} from "./node";

export class Branch extends Node {
  private static readonly DEFAULT_CSS_CLASS = 'fas fa-code-branch';

  private isCurrent: boolean;

  public path: string;

  constructor(name: string, isCurrent = false) {
    super(name);
    this.iconClass = Branch.DEFAULT_CSS_CLASS;
    this.isCurrent = isCurrent;
  }
}
