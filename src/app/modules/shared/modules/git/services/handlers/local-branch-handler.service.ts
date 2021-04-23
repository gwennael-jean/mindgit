import {Injectable} from '@angular/core';
import {HandlerServiceInterface} from "../handler-service.interface";
import {Folder} from "../../models/folder";
import {Branch} from "../../models/branch";
import {Remote} from "../../models/remote";
import {BranchResult} from '../../models/branch.result';
import {BranchHandlerService} from './branch-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LocalBranchHandlerService extends BranchHandlerService {

  protected isRemote: boolean = false;

}
