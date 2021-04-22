import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagingBlockComponent } from './staging-block.component';

describe('StagingBlockComponent', () => {
  let component: StagingBlockComponent;
  let fixture: ComponentFixture<StagingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagingBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
