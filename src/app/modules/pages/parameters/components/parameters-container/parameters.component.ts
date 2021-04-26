import {Component, OnInit} from "@angular/core";
import * as path from "path";
import {ElectronService} from '../../../../shared/modules/electron/services/electron/electron.service';
import {Router} from "@angular/router";
import {DataStorageService} from "../../../../shared/modules/electron/services/data-storage/data-storage.service";
import {DELETE_REPOSITORY_EVENT_EMIT, SAVE_REPOSITORY_EVENT_EMIT} from '../../../../shared/modules/electron/constants/constants';
import {HOME_ROUTE} from '../../../../shared/configurations/routes.constants';
import {RepositoryModel} from '../../../../shared/models/repository.model';
import OpenDialogReturnValue = Electron.OpenDialogReturnValue;

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  public repositories?: RepositoryModel[];

  public routes: { home: string } = {home: `/${HOME_ROUTE}`};

  constructor(
    private readonly router: Router,
    public readonly  dataStorageService: DataStorageService,
    private readonly  electronService: ElectronService
  ) {
  }

  ngOnInit(): void {
    this.dataStorageService.repositorie$.subscribe(repositories => this.repositories = repositories)
  }

  public openNewProject(): void {
    this.electronService.remote?.dialog.showOpenDialog({
      properties: ['openDirectory']
    })
      .then((result: OpenDialogReturnValue) => {
        if (result.filePaths.length) {
          const repository: RepositoryModel = {path: result.filePaths[0], name: path.basename(result.filePaths[0])};

          this.electronService.ipcRenderer?.send(SAVE_REPOSITORY_EVENT_EMIT, repository);
          this.router.navigate([HOME_ROUTE]);
        }
      });
  }

  public saveMainRepository(repository: RepositoryModel): void {
    this.electronService.ipcRenderer?.send(SAVE_REPOSITORY_EVENT_EMIT, repository);
    this.router.navigate([HOME_ROUTE]);
  }

  public deleteRepository(repository: RepositoryModel): void {
    this.electronService.ipcRenderer?.send(DELETE_REPOSITORY_EVENT_EMIT, repository);
  }
}
