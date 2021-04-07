import {Folder} from "./Folder";

export class Remote extends Folder {

  constructor(name: string) {
    super(name);
    this.iconClass = 'fa fa-crosshairs';
  }
}
