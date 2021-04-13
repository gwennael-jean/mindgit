import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Deserialize} from "cerialize";
import {ElectronService} from "../electron/electron.service";
import {Repository} from "../../../git/models/repository";
import {SAVE_REPOSITORIES_EVENT_RECEIVE, SAVE_REPOSITORY_EVENT_RECEIVE} from '../../constants/constants';

interface DataInterface {
  repository: {name: string, path: string};
  repositories: {name: string, path: string}[];
}

@Injectable({
  providedIn: "root"
})
export class DataStorageService {

  private readonly repository: BehaviorSubject<Repository> = new BehaviorSubject(null);
  public readonly repository$: Observable<Repository> = this.repository.asObservable();

  private readonly repositories: BehaviorSubject<Repository[]> = new BehaviorSubject([]);
  public readonly repositorie$: Observable<Repository[]> = this.repositories.asObservable();

  constructor(private readonly electronService: ElectronService) {
    this.electronService.ipcRenderer
      .on(SAVE_REPOSITORY_EVENT_RECEIVE, (event, repository: any) =>
        this.repository.next(Deserialize(repository, Repository))
      );

    this.electronService.ipcRenderer
      .on(SAVE_REPOSITORIES_EVENT_RECEIVE, (event, repositories: any) =>
        this.repositories.next(repositories.map(repository => Deserialize(repository, Repository)))
      );
  }

  public init(data: DataInterface): void {
    this.repository.next(Deserialize(data.repository, Repository));
    this.repositories.next(data.repositories.map(repository => Deserialize(repository, Repository)));
  }
}
