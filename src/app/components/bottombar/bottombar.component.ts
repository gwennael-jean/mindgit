import { Component } from "@angular/core";
import {AppConfig} from "../../../environments/environment";

@Component({
  selector: "app-bottombar",
  templateUrl: "./bottombar.component.html",
  styleUrls: ["./bottombar.component.scss"]
})
export class BottombarComponent {

  public version: string;

  constructor() {
    this.version = AppConfig.version;
  }

}
