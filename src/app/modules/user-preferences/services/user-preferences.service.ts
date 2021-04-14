import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  public currentUser: UserModel;

  constructor() {
    // TODO
    this.currentUser = {name: 'Doe', firstName: 'John'}
  }

}
