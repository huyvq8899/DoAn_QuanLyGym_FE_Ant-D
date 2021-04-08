/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThongKeSoLuongTheTapComponent } from './thong-ke-so-luong-the-tap.component';

describe('ThongKeSoLuongTheTapComponent', () => {
  let component: ThongKeSoLuongTheTapComponent;
  let fixture: ComponentFixture<ThongKeSoLuongTheTapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeSoLuongTheTapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeSoLuongTheTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
