/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaoCaoThemKhachHangTheoNhanVienComponent } from './bao-cao-them-khach-hang-theo-nhan-vien.component';

describe('BaoCaoThemKhachHangTheoNhanVienComponent', () => {
  let component: BaoCaoThemKhachHangTheoNhanVienComponent;
  let fixture: ComponentFixture<BaoCaoThemKhachHangTheoNhanVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoThemKhachHangTheoNhanVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoThemKhachHangTheoNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
