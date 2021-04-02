import { Injectable } from '@angular/core';
import {Repository} from "../models/Repository";
import {ElectronService} from "../../electron/services/electron/electron.service";

@Injectable({
  providedIn: 'root'
})
export class GitService {

  private repository: Repository;

  private repositories: Array<Repository>;

  constructor(private electronService: ElectronService) {

  }
}
