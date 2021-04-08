/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaoCaoThemTheTapTheoNvComponent } from './bao-cao-them-the-tap-theo-nv.component';

describe('BaoCaoThemTheTapTheoNvComponent', () => {
  let component: BaoCaoThemTheTapTheoNvComponent;
  let fixture: ComponentFixture<BaoCaoThemTheTapTheoNvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoThemTheTapTheoNvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoThemTheTapTheoNvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
