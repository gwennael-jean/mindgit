import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheManagerComponent } from './branche-manager.component';

describe('BrancheManagerComponent', () => {
  let component: BrancheManagerComponent;
  let fixture: ComponentFixture<BrancheManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrancheManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrancheManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
