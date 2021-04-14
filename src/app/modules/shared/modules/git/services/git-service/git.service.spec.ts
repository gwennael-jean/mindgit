import {TestBed} from '@angular/core/testing';

import {GitService} from './git.service';
import {BranchHandlerService} from '../handlers/branch-handler.service';

describe('GitService', () => {
  let service: GitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provivide: BranchHandlerService, useValue: new BranchHandlerService()}
      ]

    });
    service = TestBed.inject(GitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
