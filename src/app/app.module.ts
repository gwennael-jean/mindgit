import {BrowserModule} from "@angular/platform-browser";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {ElectronModule} from "./modules/shared/modules/electron/electron.module";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";

import {HomeModule} from "./modules/pages/home/home.module";
import {ParametersModule} from "./modules/pages/parameters/parameters.module";
import {ElectronService} from "./modules/shared/modules/electron/services/electron/electron.service";
import {GitModule} from "./modules/shared/modules/git/git.module";
import {DataStorageService} from "./modules/shared/modules/electron/services/data-storage/data-storage.service";
import {ElectronDataModel} from './modules/shared/modules/electron/models/electron.data.model';
import {LOAD_DATA_ELECTRON_IPC_RENDERER} from './modules/shared/modules/electron/constants/constants';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function loadingProvide(electronService: ElectronService, dataStorageService: DataStorageService) {
  return (): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
    electronService.ipcRenderer.invoke(LOAD_DATA_ELECTRON_IPC_RENDERER)
      .then((data: ElectronDataModel) => {
        if (!data) {
          reject('Configuration error with electron');
        }

        if (data.repository) {
          dataStorageService.publishRepository(data.repository);
        }
        if (data.repositories) {
          dataStorageService.publishRepositories(data.repositories);
        }
        resolve(true);
      });
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ElectronModule,
    GitModule,
    HomeModule,
    ParametersModule,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: loadingProvide, deps: [ElectronService, DataStorageService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
