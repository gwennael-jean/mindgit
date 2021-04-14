import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserPreferencesService} from '../../services/user-preferences.service';

@Component({
  selector: 'app-user-preferences-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponent implements OnInit {

  public user?: UserModel;

  constructor(private readonly userPreferencesService: UserPreferencesService) {
  }

  public ngOnInit(): void {
    this.user = this.userPreferencesService.currentUser;
  }

}
