import {Folder} from "./folder";

export class Remote extends Folder {
  private static readonly DEFAULT_CSS_CLASS = 'fa fa-crosshairs';

  constructor(name: string) {
    super(name);
    this.iconClass = Remote.DEFAULT_CSS_CLASS;
  }
}
