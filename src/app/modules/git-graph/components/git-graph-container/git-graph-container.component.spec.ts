import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitGraphContainerComponent } from './git-graph-container.component';

describe('GitGraphContainerComponent', () => {
  let component: GitGraphContainerComponent;
  let fixture: ComponentFixture<GitGraphContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitGraphContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitGraphContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
