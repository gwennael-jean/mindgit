import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

export class FakeLoader implements TranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    return of({});
  }
}
