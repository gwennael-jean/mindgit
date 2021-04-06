import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import * as path from "path";
import {ElectronService} from '../../shared/electron/services/electron/electron.service';
import {Router} from "@angular/router";
import {Repository} from '../../shared/git/models/Repository';
import {DataStorageService} from "../../shared/electron/services/data-storage/data-storage.service";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  public repositories: Array<Repository>;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private dataStorageService: DataStorageService,
    private electronService: ElectronService
  ) {

  }

  ngOnInit(): void {
    this.dataStorageService.repositories.subscribe(val => {
      this.repositories = val;
    });
  }

  openNewProject(): void {
    this.electronService.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (result.filePaths.length) {

        const repository = new Repository();
        repository.path = result.filePaths[0];
        repository.name = path.basename(repository.path);

        this.electronService.ipcRenderer.send('save:app:repository', repository);
        this.router.navigate(['home']);
      }
    });
  }

  saveMainRepository(repository: Repository): void {
    this.electronService.ipcRenderer.send('save:app:repository', repository);
    this.router.navigate(['home']);
  }

  deleteRepository(repository: Repository): void {
    this.electronService.ipcRenderer.send('delete:app:repository', repository);
  }
}
