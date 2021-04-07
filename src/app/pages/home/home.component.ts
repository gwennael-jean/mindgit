import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ElectronService} from '../../shared/electron/services/electron/electron.service';
import {Repository} from '../../shared/git/models/Repository';
import {DataStorageService} from "../../shared/electron/services/data-storage/data-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public repository: Repository;

  constructor(
    private dataStorageService: DataStorageService,
    private electronService: ElectronService
  ) {

  }

  ngOnInit(): void {
    this.dataStorageService.repository.subscribe(val => {
      this.repository = val;
      console.log(this.repository);
    });
  }

}
