import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderButtonComponent } from './header-button.component';

describe('HeaderButtonComponent', () => {
  let component: HeaderButtonComponent;
  let fixture: ComponentFixture<HeaderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
