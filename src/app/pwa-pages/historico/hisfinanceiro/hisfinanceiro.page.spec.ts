import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HisfinanceiroPage } from './hisfinanceiro.page';

describe('HisfinanceiroPage', () => {
  let component: HisfinanceiroPage;
  let fixture: ComponentFixture<HisfinanceiroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisfinanceiroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HisfinanceiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
