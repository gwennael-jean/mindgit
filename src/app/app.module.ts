import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {ElectronModule} from "./shared/electron/electron.module";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";

import {HomeModule} from "./pages/home/home.module";
import {ParametersModule} from "./pages/parameters/parameters.module";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
