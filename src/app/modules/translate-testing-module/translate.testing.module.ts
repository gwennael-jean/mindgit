import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslatePipeMock} from './translate.pipe.mock';
import {TranslateServiceStub} from './translate.service.stub';
import {instance, mock} from 'ts-mockito';


@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: () => instance(mock(TranslateLoader))},
    })
  ],
  exports: [
    TranslateModule
  ],
  declarations: [
    TranslatePipeMock
  ],
  providers: [
    {provide: TranslateService, useClass: TranslateServiceStub},
    {provide: TranslatePipe, useClass: TranslatePipeMock},
    {provide: TranslateStore, useFactory: () => instance(mock(TranslateStore))}
  ],
})
export class TranslateTestingModule {

}
