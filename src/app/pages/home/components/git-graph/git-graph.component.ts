import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Repository} from "../../../../shared/git/models/Repository";
import {GitService} from "../../../../shared/git/services/git.service";

@Component({
  selector: 'app-git-graph',
  templateUrl: './git-graph.component.html',
  styleUrls: ['./git-graph.component.scss']
})
export class GitGraphComponent implements OnChanges {

  @Input()
  repository: Repository;

  constructor(
    private readonly gitService: GitService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.gitService.getLogs(this.repository)
      .then(data => console.log(data));
  }

}
