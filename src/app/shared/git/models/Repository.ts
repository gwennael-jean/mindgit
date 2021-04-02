import {autoserializeAs} from "cerialize";

export class Repository {

  @autoserializeAs(String)
  name: string;

  @autoserializeAs(String)
  path: string;

}
