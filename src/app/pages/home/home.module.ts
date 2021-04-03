import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {TopbarComponent} from "../../components/topbar/topbar.component";
import {BottombarComponent} from "../../components/bottombar/bottombar.component";
import { BrancheManagerComponent } from './components/branche-manager/branche-manager.component';

@NgModule({
  declarations: [HomeComponent, TopbarComponent, BottombarComponent, BrancheManagerComponent],
  imports: [CommonModule, TranslateModule, HomeRoutingModule],
})
export class HomeModule {
}
