import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Repository} from "../../../../shared/git/models/Repository";
import {GitService} from "../../../../shared/git/services/git.service";
import {createGitgraph, Orientation} from "@gitgraph/js";
import {TemplateName} from "@gitgraph/core";

@Component({
  selector: 'app-git-graph',
  templateUrl: './git-graph.component.html',
  styleUrls: ['./git-graph.component.scss']
})
export class GitGraphComponent implements OnChanges {

  @Input()
  repository: Repository;

  gitGtraph: any;

  @ViewChild('gitGraph', {read: ElementRef, static: true})
  gitGraphElementRef: ElementRef;

  constructor(
    private readonly gitService: GitService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.gitGtraph = createGitgraph(this.gitGraphElementRef.nativeElement, {
      template: TemplateName.Metro
    });


    this.gitService.getLogs(this.repository)
      .then(data => {
        console.log(data);
        const master = this.gitGtraph.branch("master");
        master
          .commit("Init the project")
          .commit("Add README")
          .commit("Add tests")
          .commit("Implement feature");

        master.tag("v1.0");

        const newFeature = this.gitGtraph.branch("new-feature");

        newFeature.commit("Implement an awesome feature");
        master.commit("Hotfix a bug");
        newFeature.commit("Fix tests");

        master.merge(newFeature, "Release new version");



      });
  }

}
