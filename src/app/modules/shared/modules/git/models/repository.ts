import {autoserializeAs} from "cerialize";

export class Repository { // TODO change to interface and remove cerialize

  @autoserializeAs(String)
  name: string;

  @autoserializeAs(String)
  path: string;

}
