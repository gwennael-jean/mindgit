import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./components/home-container/home.component";
import {BranchManagerComponent} from './components/branch-manager/branch-manager.component';
import {BranchListComponent} from './components/branch-list/branch-list.component';
import {StagingBlockComponent} from './components/staging-block/staging-block.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    BranchManagerComponent,
    BranchListComponent,
    StagingBlockComponent
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
