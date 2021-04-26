import {RepositoryModel} from '../../../models/repository.model';

export interface ElectronDataModel {
  repository: RepositoryModel;
  repositories: RepositoryModel[];
}
