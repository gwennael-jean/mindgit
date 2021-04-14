import {RepositoryModel} from './repository.model';

export interface ElectronDataModel {
  repository: RepositoryModel;
  repositories: RepositoryModel[];
}
