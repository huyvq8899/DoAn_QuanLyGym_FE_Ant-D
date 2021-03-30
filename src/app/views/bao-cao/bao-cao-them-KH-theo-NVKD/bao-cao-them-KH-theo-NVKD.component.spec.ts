/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaoCaoThemKHTheoNVKDComponent } from './bao-cao-them-KH-theo-NVKD.component';

describe('BaoCaoThemKHTheoNVKDComponent', () => {
  let component: BaoCaoThemKHTheoNVKDComponent;
  let fixture: ComponentFixture<BaoCaoThemKHTheoNVKDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoThemKHTheoNVKDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoThemKHTheoNVKDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
