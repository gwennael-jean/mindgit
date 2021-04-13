import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./components/home-container/home.component";
import {BrancheManagerComponent} from './components/branche-manager/branche-manager.component';
import {BranchListComponent} from './components/branch-list/branch-list.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    BrancheManagerComponent,
    BranchListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    HomeRoutingModule,
    SharedModule
  ],
})
export class HomeModule {
}
