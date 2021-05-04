import {NgModule} from "@angular/core";
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ElectronModule} from './modules/electron/electron.module';
import {GitModule} from './modules/git/git.module';
import {UserPreferencesModule} from '../user-preferences/user-preferences.module';
import {BranchListNodeComponent} from './components/branch-list-node/branch-list-node.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {BranchListComponent} from './components/branch-list/branch-list.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BranchListComponent,
    BranchListNodeComponent,
  ],
  imports: [
    CommonModule,
    ElectronModule,
    GitModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    TranslateModule,
    UserPreferencesModule,
  ],
  exports: [
    BranchListComponent,
    BranchListNodeComponent,
    FooterComponent,
    NavbarComponent,
  ]
})
export class SharedModule {
}
