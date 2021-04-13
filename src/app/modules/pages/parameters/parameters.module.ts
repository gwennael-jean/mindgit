import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ParametersRoutingModule} from "./parameters-routing.module";
import {ParametersComponent} from "./components/parameters-container/parameters.component";

@NgModule({
  declarations: [
    ParametersComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule {
}
