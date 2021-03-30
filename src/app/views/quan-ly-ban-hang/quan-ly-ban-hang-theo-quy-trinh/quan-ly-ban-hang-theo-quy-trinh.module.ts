import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyBanHangTheoQuyTrinhComponent } from './quan-ly-ban-hang-theo-quy-trinh.component';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyTaiKhoanRoutingModule } from '../../he-thong/quan-ly-tai-khoan/quan-ly-tai-khoan-routing.module';

@NgModule({
  imports: [
    SharedModule,
    QuanLyTaiKhoanRoutingModule,
    CommonModule
  ],
  declarations: [QuanLyBanHangTheoQuyTrinhComponent]
})
export class QuanLyBanHangTheoQuyTrinhModule { }
