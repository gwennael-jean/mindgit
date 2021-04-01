import {Component, OnInit} from "@angular/core";
import {ElectronService} from '../../shared/electron/services/electron/electron.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  public repositories: Array<string>;

  constructor(private router: Router, private electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.repositories = this.electronService.data.repositories;
  }

  openNewProject(): void {
    this.electronService.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (result.filePaths.length) {
        const repository = result.filePaths[0];
        this.electronService.ipcRenderer.send('save:app:repository', repository);
        this.router.navigate(['home']);
      }
    });
  }

  saveMainRepository(repository: string): void {
    this.electronService.ipcRenderer.send('save:app:repository', repository);
    this.router.navigate(['home']);
  }

  deleteRepository(repository: string): void {
    this.electronService.ipcRenderer.send('delete:app:repository', repository);
  }
}
