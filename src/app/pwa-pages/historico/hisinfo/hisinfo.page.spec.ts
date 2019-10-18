import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HisinfoPage } from './hisinfo.page';

describe('HisinfoPage', () => {
  let component: HisinfoPage;
  let fixture: ComponentFixture<HisinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HisinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
