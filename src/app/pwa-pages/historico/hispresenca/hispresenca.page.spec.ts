import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HispresencaPage } from './hispresenca.page';

describe('HispresencaPage', () => {
  let component: HispresencaPage;
  let fixture: ComponentFixture<HispresencaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HispresencaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HispresencaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
