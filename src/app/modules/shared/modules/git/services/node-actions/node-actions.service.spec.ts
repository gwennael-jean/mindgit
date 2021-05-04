import { TestBed } from '@angular/core/testing';

import { NodeActionsService } from './node-actions.service';
import {BranchHandlerService} from '../handlers/branch-handler.service';
import {TranslateTestingModule} from '../../../../../translate-testing-module/translate.testing.module';

describe('NodeActionsService', () => {
  let service: NodeActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule
      ],
      providers: [
      ]
    });
    service = TestBed.inject(NodeActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
