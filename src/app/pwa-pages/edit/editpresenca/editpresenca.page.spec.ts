import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpresencaPage } from './editpresenca.page';

describe('EditpresencaPage', () => {
  let component: EditpresencaPage;
  let fixture: ComponentFixture<EditpresencaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpresencaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpresencaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
