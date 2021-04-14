import {Component, Input} from '@angular/core';
import {Folder} from "../../../../shared/modules/git/models/folder";

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent {

  @Input()
  folder?: Folder;

  @Input()
  prefix?: string;

  @Input()
  open = true;

  @Input()
  openSubFolder = true;

  @Input()
  icon = 'fas fa-folder';
}
