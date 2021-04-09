import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {HandlerService, Result} from "../HandlerService";

export const PRETTY_FORMAT = ["%H", "%P", "%T", "%aN", "%ae", "%s", "%b", "%ai", "%D", "%s"].join('%n');

export class LogResult extends Result {
  public logs: Log[];

  constructor(logs: Log[]) {
    super();
    this.logs = logs;
  }

}

export class Log {

  hash: string;

  parent: string;

  tree: string;

  authorName: string;

  authorEmail: string;

  subject: string;

  body: string;

  date: string;

  refs: string;

  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogHandlerService implements HandlerService<LogResult> {

  constructor() {
  }

  handle(stdout: string): LogResult {
    const logs = _.chunk(stdout.split('\n'), 10)
      .map(data => {
        const log = new Log();

        log.hash = data[0];
        log.parent = data[1];
        log.tree = data[2];
        log.authorName = data[3];
        log.authorEmail = data[4];
        log.subject = data[5];
        log.body = data[6];
        log.date = data[7];
        log.refs = data[8];
        log.message = data[9];

        return log;
      });

    return new LogResult(logs);
  }
}
