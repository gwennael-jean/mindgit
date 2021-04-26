import { Component } from "@angular/core";
import {AppConfig} from "../../../../../environments/environment";

@Component({
  selector: "app-bottombar",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
  public version: string= AppConfig.version;
}
