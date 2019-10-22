import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfinanceiroPage } from './adminfinanceiro.page';

describe('AdminfinanceiroPage', () => {
  let component: AdminfinanceiroPage;
  let fixture: ComponentFixture<AdminfinanceiroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfinanceiroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfinanceiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
