import {Component, OnInit} from "@angular/core";
import {ElectronService} from '../../shared/electron/services/electron/electron.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  public repositories: Array<string>;

  constructor(private electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.repositories = this.electronService.data.repositories;
    console.log(this.repositories);
  }

  openNewProject(): void {
    this.electronService.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (result.filePaths.length) {
        const directory = result.filePaths[0];
        this.electronService.ipcRenderer.send('save:app:repository', directory);
      }
    });
  }
}
