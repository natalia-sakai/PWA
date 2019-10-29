import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastramuralPage } from './cadastramural.page';

describe('CadastramuralPage', () => {
  let component: CadastramuralPage;
  let fixture: ComponentFixture<CadastramuralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastramuralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastramuralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
