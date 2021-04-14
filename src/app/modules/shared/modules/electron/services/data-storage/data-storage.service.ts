import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ElectronService} from "../electron/electron.service";
import {SAVE_REPOSITORIES_EVENT_RECEIVE, SAVE_REPOSITORY_EVENT_RECEIVE} from '../../constants/constants';
import {RepositoryModel} from '../../../../models/repository.model';

@Injectable({
  providedIn: "root"
})
export class DataStorageService {

  private readonly repository: BehaviorSubject<RepositoryModel | undefined> = new BehaviorSubject<RepositoryModel | undefined>(undefined);
  public readonly repository$: Observable<RepositoryModel | undefined> = this.repository.asObservable();

  private readonly repositories: BehaviorSubject<RepositoryModel[]> = new BehaviorSubject<RepositoryModel[]>([]);
  public readonly repositorie$: Observable<RepositoryModel[]> = this.repositories.asObservable();

  constructor(private readonly electronService: ElectronService) {
    this.electronService.ipcRenderer?.on(SAVE_REPOSITORY_EVENT_RECEIVE, (event: any, repository: RepositoryModel) =>
        this.repository.next(repository)
      );

    this.electronService.ipcRenderer?.on(SAVE_REPOSITORIES_EVENT_RECEIVE, (event: any, repositories: RepositoryModel[]) =>
        this.repositories.next(repositories)
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
