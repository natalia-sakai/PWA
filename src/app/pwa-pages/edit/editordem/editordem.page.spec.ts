import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditordemPage } from './editordem.page';

describe('EditordemPage', () => {
  let component: EditordemPage;
  let fixture: ComponentFixture<EditordemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditordemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditordemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
