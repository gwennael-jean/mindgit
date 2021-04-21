import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./components/home-container/home.component";
import {BranchManagerComponent} from './components/branch-manager/branch-manager.component';
import {BranchListComponent} from './components/branch-list/branch-list.component';
import {SharedModule} from '../../shared/shared.module';
import {GitGraphModule} from '../../git-graph/git-graph.module';

@NgModule({
  declarations: [
    HomeComponent,
    BranchManagerComponent,
    BranchListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    HomeRoutingModule,
    SharedModule,
    GitGraphModule
  ],
})
export class HomeModule {
}
