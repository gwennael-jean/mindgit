import { TestBed } from '@angular/core/testing';

import { NodeActionsService } from './node-actions.service';

describe('NodeActionsService', () => {
  let service: NodeActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
