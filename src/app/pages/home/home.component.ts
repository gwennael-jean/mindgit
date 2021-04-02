import {Component, OnInit} from "@angular/core";
import {ElectronService} from '../../shared/electron/services/electron/electron.service';
import {Repository} from '../../shared/git/models/Repository';
import {Deserialize} from 'cerialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public repository: Repository;

  constructor(private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('app:saved:repository', (event, repository: any) => {
      this.repository = Deserialize(repository, Repository);
    });
  }

  ngOnInit(): void {
    this.repository = this.electronService.data.repository;
  }

}
