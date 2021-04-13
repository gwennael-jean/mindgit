import {Component, OnDestroy, OnInit} from "@angular/core";
import {ElectronService} from '../../../../shared/modules/electron/services/electron/electron.service';
import {Repository} from '../../../../shared/modules/git/models/repository';
import {DataStorageService} from "../../../../shared/modules/electron/services/data-storage/data-storage.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public repository: Repository;

  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly electronService: ElectronService
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
