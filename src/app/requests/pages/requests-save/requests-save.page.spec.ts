import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsSavePage } from './requests-save.page';

describe('RequestsSavePage', () => {
  let component: RequestsSavePage;
  let fixture: ComponentFixture<RequestsSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
