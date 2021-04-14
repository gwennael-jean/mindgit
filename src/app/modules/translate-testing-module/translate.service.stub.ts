import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class TranslateServiceStub {
  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line
  private _defaultLang: string;
  // tslint:disable-next-line
  private _currentLang: string;

  public get<T>(key: T, params: any): Observable<T> {
    return new Subject<T>().asObservable();
  }

  public getBrowserLang(): string {
    return 'en';
  }

  get defaultLang(): string {
    return this._defaultLang ? this.defaultLang : 'en';
  }

  set defaultLang(defaultLang: string) {
    // tslint:disable-next-line
    this._defaultLang = defaultLang;
  }


  get currentLang(): string {
    // tslint:disable-next-line
    return this._currentLang ? this._currentLang : 'en';
  }

  set currentLang(currentLang: string) {
    // tslint:disable-next-line
    this._currentLang = currentLang;
  }

  // tslint:disable-next-line
  public instant(key: string | Array<string>, interpolateParams?: Object): string | any {
    return key ? key : '';
  }

}
