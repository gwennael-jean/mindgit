import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../../../../shared/modules/electron/services/data-storage/data-storage.service";
import {Subscription} from 'rxjs';
import {RepositoryModel} from '../../../../shared/models/repository.model';
import {GitService} from '../../../../shared/modules/git/services/git-service/git.service';
import {BranchResult} from '../../../../shared/modules/git/models/branch.result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public repository?: RepositoryModel;

  constructor(
    public readonly dataStorageService: DataStorageService,
    public readonly gitService: GitService,
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataStorageService.repository$
        .subscribe(repository => this.repository = repository),
    );

    if (this.repository) {
      console.log(this.repository);
      this.gitService.status(this.repository)
        .then((branchResult: BranchResult) => console.log());
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
