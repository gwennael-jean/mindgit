import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Deserialize} from "cerialize";
import {ElectronService} from "../electron/electron.service";
import {Repository} from "../../../git/models/Repository";

interface DataInterface {
  repository: any;
  repositories: any;
}

@Injectable({
  providedIn: "root"
})
export class DataStorageService {

  repository: BehaviorSubject<Repository>;

  repositories: BehaviorSubject<Array<Repository>>;

  constructor(private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('app:saved:repository', (event, repository: any) => {
      this.repository.next(Deserialize(repository, Repository));
    });

    this.electronService.ipcRenderer.on('app:saved:repositories', (event, repositories: any) => {
      this.repositories.next(repositories.map(repository => Deserialize(repository, Repository)));
    });
  }

  init(data: DataInterface): void {
    this.repository = new BehaviorSubject<Repository>(Deserialize(data.repository, Repository));
    this.repositories = new BehaviorSubject<Array<Repository>>(data.repositories.map(repository => Deserialize(repository, Repository)));
  }
}
