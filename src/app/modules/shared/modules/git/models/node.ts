export abstract class Node {
  protected static readonly DEFAULT_CSS_CLASS: string = '';

  public name: string;
  public iconClass: string = Node.DEFAULT_CSS_CLASS;

  protected constructor(name: string) {
    this.name = name;
  }
}
