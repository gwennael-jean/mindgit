import {app, remote} from 'electron';
import * as path from 'path';
import * as fs from 'fs';

interface LocalStorageOptions {
  defaults: any;
}

export default class LocalStorage {

  private path: string;

  private data: any;

  constructor(configName: string, opts: LocalStorageOptions) {
    const userDataPath = (app || remote.app).getPath('userData');
    this.path = path.join(userDataPath, configName + '.json');
    this.data = this.parseDataFile(this.path, opts.defaults);
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, val: any) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  parseDataFile(filePath: string, defaults: any) {
    try {
      console.log('Load file informations :' + filePath);
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      return defaults;
    }
  }
}
