import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmuralPage } from './editmural.page';

describe('EditmuralPage', () => {
  let component: EditmuralPage;
  let fixture: ComponentFixture<EditmuralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmuralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmuralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
