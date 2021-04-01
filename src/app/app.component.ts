import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from "./shared/electron/services/electron/electron.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('fr');

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

      this.electronService.ipcRenderer.on('app:saved', (event, data) => {
        this.electronService.data = data;
      });
    } else {
      console.log('Run in browser');
    }
  }
}
