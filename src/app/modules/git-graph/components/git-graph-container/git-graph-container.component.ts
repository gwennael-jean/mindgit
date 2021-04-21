import {Component, OnInit} from '@angular/core';
import {createGitgraph, MergeStyle, Mode, Orientation, templateExtend, TemplateName} from '@gitgraph/js';
import {BranchUserApi, GitgraphOptions} from '@gitgraph/core';

@Component({
  selector: 'app-git-graph-container',
  templateUrl: './git-graph-container.component.html',
  styleUrls: ['./git-graph-container.component.scss']
})
export class GitGraphContainerComponent implements OnInit {

  constructor() {
  }

  public ngOnInit(): void {
    const graphContainer: HTMLElement | null = document.getElementById('graph-container');

    if (graphContainer) {
      this.displayGraph(graphContainer);
    }
  }

  private displayGraph(graphContainer: HTMLElement): void {
    const options: GitgraphOptions = {
      orientation: Orientation.VerticalReverse,
      template: templateExtend(TemplateName.Metro, {
        colors: ['red', 'blue', 'orange'],
        arrow: {color: 'green', offset: 3, size: 15},
        branch: {color: 'pink', lineWidth: 7, mergeStyle: MergeStyle.Bezier},
        commit: {}
      }),
      reverseArrow: true,
      mode: Mode.Compact,
      // author: 'Stef',
      branchLabelOnEveryCommit: false,

    };
    const gitgraph = createGitgraph(graphContainer, /*options*/);

    const master: BranchUserApi<any> = gitgraph.branch('master'); // TNode comes from where?
    master.commit('Initial commit');

    const develop: BranchUserApi<any> = gitgraph.branch('develop');
    develop.commit('Add TypeScript');

    const aFeature: BranchUserApi<any> = gitgraph.branch('a-feature');
    // const bFeature = gitgraph.branch('b-feature');
    aFeature
      .commit('Make it work')
      .commit(
        {
          subject: "commit to click",
          onMessageClick: (commit) => {
            alert(`Commit ${commit.hash} selected`);
            console.log('commit selected', commit)
          }
        }
      )
      .commit(
        {
          subject: 'scaffolding',
          author: 'stef',
          body: 'body content of the commit',
          hash: 'fleskfhjeslfhelskfhesklfh',
          onClick: (commit) => {
            console.log('clicked on commit', commit)
          },
          onMessageClick: (commit) => {
            console.log('clicked on commit message', commit)
          },
          onMouseOver: (commit) => {
            console.log('mouse on commit', commit)
          },
          onMouseOut: (commit) => {
            console.log('mouse over commit', commit)
          }
        }
      );
    // bFeature.commit('Make angular great again');


    develop.merge(aFeature);
    develop.commit('Prepare v1');

    master.merge(develop).tag('v1.0.0');


  }
}
