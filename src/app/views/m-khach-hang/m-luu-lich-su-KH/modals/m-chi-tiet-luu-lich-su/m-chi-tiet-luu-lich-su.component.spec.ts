/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MChiTietLuuLichSuComponent } from './m-chi-tiet-luu-lich-su.component';

describe('MChiTietLuuLichSuComponent', () => {
  let component: MChiTietLuuLichSuComponent;
  let fixture: ComponentFixture<MChiTietLuuLichSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MChiTietLuuLichSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MChiTietLuuLichSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
