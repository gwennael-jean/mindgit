import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ParametersComponent} from "./parameters.component";

const routes: Routes = [
  {
    path: 'parameters',
    component: ParametersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule {
}
