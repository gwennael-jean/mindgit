import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeRoutingModule} from "./modules/pages/home/home-routing.module";
import {ParametersRoutingModule} from "./modules/pages/parameters/parameters-routing.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
    HomeRoutingModule,
    ParametersRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
