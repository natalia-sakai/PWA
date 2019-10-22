import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrainfoPage } from './cadastrainfo.page';

describe('CadastrainfoPage', () => {
  let component: CadastrainfoPage;
  let fixture: ComponentFixture<CadastrainfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrainfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrainfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
