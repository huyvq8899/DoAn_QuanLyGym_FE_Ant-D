import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucTaiChinhKeToanComponent } from './danh-muc-tai-chinh-ke-toan.component';
import { SharedModule } from 'src/app/shared.module';
import { DanhMucTaiChinhKeRoutingModule } from './danh-muc-tai-chinh-ke-toan-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DanhMucTaiChinhKeRoutingModule,
    CommonModule
  ],
  declarations: [DanhMucTaiChinhKeToanComponent]
})
export class DanhMucTaiChinhKeToanModule { }
