import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkGridViewPage } from './framework-grid-view.page';

describe('FrameworkGridViewPage', () => {
  let component: FrameworkGridViewPage;
  let fixture: ComponentFixture<FrameworkGridViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameworkGridViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameworkGridViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
