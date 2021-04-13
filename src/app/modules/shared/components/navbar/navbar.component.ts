import {Component} from "@angular/core";
import {AppConfig} from '../../../../../environments/environment';

@Component({
  selector: "app-topbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  public author: string = AppConfig.author;
}
