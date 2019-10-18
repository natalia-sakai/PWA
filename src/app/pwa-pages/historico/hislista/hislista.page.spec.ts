import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HislistaPage } from './hislista.page';

describe('HislistaPage', () => {
  let component: HislistaPage;
  let fixture: ComponentFixture<HislistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HislistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HislistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
