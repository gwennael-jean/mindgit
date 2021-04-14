import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderButtonComponent } from './header-button.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

describe('HeaderButtonComponent', () => {
  let component: HeaderButtonComponent;
  let fixture: ComponentFixture<HeaderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderButtonComponent ],
      imports:[
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
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
