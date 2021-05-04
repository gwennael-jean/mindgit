import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchListComponent} from './branch-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BranchListNodeComponent} from '../branch-list-node/branch-list-node.component';

describe('BranchListComponent', () => {
  let component: BranchListComponent;
  let fixture: ComponentFixture<BranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BranchListComponent,
        BranchListNodeComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
