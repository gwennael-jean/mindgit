import {Component, Input, OnInit} from '@angular/core';
import {Folder} from "../../../../shared/git/models/Folder";

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  @Input()
  folder: Folder;

  constructor() {
  }

  ngOnInit(): void {
  }

}
