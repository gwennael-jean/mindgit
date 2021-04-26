import {NgModule} from "@angular/core";
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ElectronModule} from './modules/electron/electron.module';
import {GitModule} from './modules/git/git.module';
import {UserPreferencesModule} from '../user-preferences/user-preferences.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ElectronModule,
    GitModule,
    UserPreferencesModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})
export class SharedModule {
}
