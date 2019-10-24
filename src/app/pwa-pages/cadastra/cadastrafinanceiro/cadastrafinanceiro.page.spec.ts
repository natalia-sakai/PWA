import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrafinanceiroPage } from './cadastrafinanceiro.page';

describe('CadastrafinanceiroPage', () => {
  let component: CadastrafinanceiroPage;
  let fixture: ComponentFixture<CadastrafinanceiroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrafinanceiroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrafinanceiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
