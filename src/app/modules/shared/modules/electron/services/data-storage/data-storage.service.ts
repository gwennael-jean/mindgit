import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Deserialize} from "cerialize";
import {ElectronService} from "../electron/electron.service";
import {Repository} from "../../../git/models/repository";
import {SAVE_REPOSITORIES_EVENT_RECEIVE, SAVE_REPOSITORY_EVENT_RECEIVE} from '../../constants/constants';
import {RepositoryModel} from '../../models/repository.model';

@Injectable({
  providedIn: "root"
})
export class DataStorageService {

  private readonly repository: BehaviorSubject<Repository> = new BehaviorSubject(undefined);
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

  /**
   * Used to publish a repository (from storage) in this private Subject repository
   * @param repository repository to publish
   */
  public publishRepository(repository: RepositoryModel): void {
    this.repository.next(repository);
  }

  /**
   * Used to publish the repositories (from storage) in this private Subject repositories
   * @param repositories array of repository to publish
   */
  public publishRepositories(repositories: RepositoryModel[]): void {
    this.repositories.next(repositories);
  }
}
