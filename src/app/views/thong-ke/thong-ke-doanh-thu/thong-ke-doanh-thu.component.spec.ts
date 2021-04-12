/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThongKeDoanhThuComponent } from './thong-ke-doanh-thu.component';

describe('ThongKeDoanhThuComponent', () => {
  let component: ThongKeDoanhThuComponent;
  let fixture: ComponentFixture<ThongKeDoanhThuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeDoanhThuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeDoanhThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
