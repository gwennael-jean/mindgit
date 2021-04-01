import {Component, OnInit} from "@angular/core";
import {ElectronService} from '../../shared/electron/services/electron/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public repository: string;

  constructor(private electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.repository = this.electronService.data.repository;
  }

}
