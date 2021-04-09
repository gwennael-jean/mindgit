import { TestBed } from '@angular/core/testing';

import { LogHandlerService } from './log-handler.service';

describe('LogHandlerService', () => {
  let service: LogHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
