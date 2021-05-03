import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchListNodeComponent } from './branch-list-node.component';

describe('BranchListNodeComponent', () => {
  let component: BranchListNodeComponent;
  let fixture: ComponentFixture<BranchListNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchListNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchListNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
