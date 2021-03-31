import {BrowserModule} from "@angular/platform-browser";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {ElectronModule} from "./shared/electron/electron.module";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";

import {HomeModule} from "./pages/home/home.module";
import {ParametersModule} from "./pages/parameters/parameters.module";
import {ElectronService} from "./shared/electron/services/electron/electron.service";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function loadingProvide(electronService: ElectronService) {
  return (): Promise<boolean> => new Promise<boolean>(resolve => {
    electronService.ipcRenderer.invoke('load:data')
      .then((data) => {
        electronService.data = data;
        resolve(true);
      });
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ElectronModule,
    HomeModule,
    ParametersModule,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: loadingProvide, deps: [ElectronService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
