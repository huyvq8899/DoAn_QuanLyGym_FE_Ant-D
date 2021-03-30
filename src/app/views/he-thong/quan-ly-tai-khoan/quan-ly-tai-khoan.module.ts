import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyTaiKhoanComponent } from './quan-ly-tai-khoan.component';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyTaiKhoanRoutingModule } from './quan-ly-tai-khoan-routing.module';

@NgModule({
  imports: [
    SharedModule,
    QuanLyTaiKhoanRoutingModule,
    CommonModule
  ],
  declarations: [QuanLyTaiKhoanComponent]
})
export class QuanLyTaiKhoanModule { }
