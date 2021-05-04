import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Branch} from '../../modules/git/models/branch';
import {BranchListNodeComponent} from './branch-list-node.component';
import {TranslateTestingModule} from '../../../translate-testing-module/translate.testing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {BranchListComponent} from '../branch-list/branch-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('BranchListNodeComponent', () => {
  let component: BranchListNodeComponent;
  let fixture: ComponentFixture<BranchListNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatMenuModule,
        MatButtonModule,
      ],
      declarations: [
        BranchListNodeComponent,
        BranchListComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchListNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.node = new Branch('test-node');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
