import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraordemPage } from './cadastraordem.page';

describe('CadastraordemPage', () => {
  let component: CadastraordemPage;
  let fixture: ComponentFixture<CadastraordemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastraordemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastraordemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
