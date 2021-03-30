import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyTaiChinhKeRoutingModule } from './quan-ly-tai-chinh-ke-toan-routing.module';

@NgModule({
  imports: [
    SharedModule,
    QuanLyTaiChinhKeRoutingModule,
    CommonModule
  ],
  declarations: []
})
export class QuanLyTaiChinhKeToanModule { }
