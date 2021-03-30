import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyMuaHangRoutingModule } from './quan-ly-mua-hang-routing.module';

@NgModule({
  imports: [
    SharedModule,
    QuanLyMuaHangRoutingModule,
    CommonModule
  ],
  declarations: []
})
export class QuanLyMuaHangModule { }
