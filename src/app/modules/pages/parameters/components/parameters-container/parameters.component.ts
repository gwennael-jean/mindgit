import {Component} from "@angular/core";
import * as path from "path";
import {ElectronService} from '../../../../shared/modules/electron/services/electron/electron.service';
import {Router} from "@angular/router";
import {Repository} from '../../../../shared/modules/git/models/repository';
import {DataStorageService} from "../../../../shared/modules/electron/services/data-storage/data-storage.service";
import {DELETE_REPOSITORY_EVENT_EMIT, SAVE_REPOSITORY_EVENT_EMIT} from '../../../../shared/modules/electron/constants/constants';
import {HOME_ROUTE} from '../../../../shared/configurations/routes.constants';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent {

  public routes: { home: string } = {home: `/${HOME_ROUTE}`};

  constructor(
    private readonly router: Router,
    public readonly  dataStorageService: DataStorageService,
    private readonly  electronService: ElectronService
  ) {
  }

  public openNewProject(): void {
    this.electronService.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    })
      .then(result => { // FIXME type var
        if (result.filePaths.length) {

          const repository: Repository = new Repository();
          repository.path = result.filePaths[0];
          repository.name = path.basename(repository.path);

          this.electronService.ipcRenderer.send(SAVE_REPOSITORY_EVENT_EMIT, repository);
          this.router.navigate([HOME_ROUTE]);
        }
      });
  }

  public saveMainRepository(repository: Repository): void {
    this.electronService.ipcRenderer.send(SAVE_REPOSITORY_EVENT_EMIT, repository);
    this.router.navigate([HOME_ROUTE]);
  }

  public deleteRepository(repository: Repository): void {
    this.electronService.ipcRenderer.send(DELETE_REPOSITORY_EVENT_EMIT, repository);
  }
}
