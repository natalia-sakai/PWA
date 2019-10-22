import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminagapePage } from './adminagape.page';

describe('AdminagapePage', () => {
  let component: AdminagapePage;
  let fixture: ComponentFixture<AdminagapePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminagapePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminagapePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
