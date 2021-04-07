
export abstract class Node {

  name: string;

  iconClass: string;

  protected constructor(name: string) {
    this.name = name;
  }
}
