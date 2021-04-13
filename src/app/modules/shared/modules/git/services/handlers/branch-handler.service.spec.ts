import { TestBed } from '@angular/core/testing';

import { BranchHandlerService } from './branch-handler.service';

describe('BranchHandlerService', () => {
  let service: BranchHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
