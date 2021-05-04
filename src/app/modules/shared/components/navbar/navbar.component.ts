import {Component} from "@angular/core";
import {AppConfig} from '../../../../../environments/environment';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  public author: string = AppConfig.author;
}
