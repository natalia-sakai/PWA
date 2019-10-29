import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditagapePage } from './editagape.page';

describe('EditagapePage', () => {
  let component: EditagapePage;
  let fixture: ComponentFixture<EditagapePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditagapePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditagapePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
