export abstract class Node {
  public name: string;
  public iconClass: string;

  protected constructor(name: string) {
    this.name = name;
  }
}
