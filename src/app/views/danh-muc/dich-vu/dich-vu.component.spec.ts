/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DichVuComponent } from './dich-vu.component';

describe('DichVuComponent', () => {
  let component: DichVuComponent;
  let fixture: ComponentFixture<DichVuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DichVuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
