import {Injectable} from '@angular/core';
import {HandlerServiceInterface} from "../handler-service.interface";
import {Folder} from "../../models/folder";
import {Branch} from "../../models/branch";
import {Remote} from "../../models/remote";
import {BranchResult} from '../../models/branch.result';
import {StatusResult} from '../../models/status.result';

@Injectable({
  providedIn: 'root'
})
export class StatusHandlerService implements HandlerServiceInterface<StatusResult> {

  handle(stdout: string): StatusResult {
    console.log(stdout);
    return new StatusResult();
  }

}
