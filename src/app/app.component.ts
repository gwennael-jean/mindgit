import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from "./modules/shared/modules/electron/services/electron/electron.service";
import {GitService} from "./modules/shared/modules/git/services/git-service/git.service";
import {AppConfig} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private gitService: GitService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('fr'); // TODO create a component to change language

    console.log(`${AppConfig.appName} is running in ${electronService.isElectron ? 'electron' : 'browser' } v${AppConfig.version}`);
  }
}
