import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininfoPage } from './admininfo.page';

describe('AdmininfoPage', () => {
  let component: AdmininfoPage;
  let fixture: ComponentFixture<AdmininfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmininfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmininfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
