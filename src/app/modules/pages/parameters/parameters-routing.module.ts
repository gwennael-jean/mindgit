import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ParametersComponent} from "./components/parameters-container/parameters.component";

const routes: Routes = [
  {
    path: 'parameters',
    component: ParametersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ParametersRoutingModule {
}
