import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../../../../shared/modules/electron/services/data-storage/data-storage.service";
import {Subscription} from 'rxjs';
import {RepositoryModel} from '../../../../shared/models/repository.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public repository?: RepositoryModel;

  constructor(
    public readonly dataStorageService: DataStorageService
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataStorageService.repository$
        .subscribe(repository => this.repository = repository)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
