import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerComponent } from './branch-manager.component';
import {TranslateTestingModule} from '../../../../translate-testing-module/translate.testing.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('BranchManagerComponent', () => {
  let component: BranchManagerComponent;
  let fixture: ComponentFixture<BranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerComponent ],
      imports:[
        TranslateTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
