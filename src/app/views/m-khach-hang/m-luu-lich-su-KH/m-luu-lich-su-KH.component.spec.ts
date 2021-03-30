/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MLuuLichSuKHComponent } from './m-luu-lich-su-KH.component';

describe('MLuuLichSuKHComponent', () => {
  let component: MLuuLichSuKHComponent;
  let fixture: ComponentFixture<MLuuLichSuKHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MLuuLichSuKHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MLuuLichSuKHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
