import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GitGraphContainerComponent} from './components/git-graph-container/git-graph-container.component';


@NgModule({
  declarations: [
    GitGraphContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GitGraphContainerComponent
  ]
})
export class GitGraphModule {
}
