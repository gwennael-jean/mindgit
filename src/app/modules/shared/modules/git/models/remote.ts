import {Folder} from "./folder";

export class Remote extends Folder {
  protected static readonly DEFAULT_CSS_CLASS: string = 'fa fa-crosshairs';

  constructor(name: string) {
    super(name);
    this.iconClass = Remote.DEFAULT_CSS_CLASS;
  }
}
