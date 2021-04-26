import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderButtonComponent} from './components/header-button/header-button.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports:[
    HeaderButtonComponent
  ]
})
export class UserPreferencesModule {
}
