import {Node} from "./node";

export class Folder extends Node {
  public children: Node[];

  constructor(name: string) {
    super(name);
    this.children = [];
    this.iconClass = 'fa fa-folder';
  }

  public get(path: string): Node {
    const filteredNodes = this.children.filter(n => n.name === path);
    return filteredNodes.length === 1 ? filteredNodes[0] : null;
  }

  public isEmpty(): boolean {
    return !this.children.length;
  }

  public has(path: string): boolean {
    return !!this.children.filter(n => n.name === path).length;
  }

  public add(node: Node) {
    if (!this.has(node.name)) {
      this.children.push(node);
    }
  }
}
