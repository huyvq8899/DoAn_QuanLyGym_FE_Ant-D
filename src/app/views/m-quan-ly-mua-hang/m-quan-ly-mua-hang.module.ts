
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { MQuanLyMuaHangRoutingModule } from './m-quan-ly-mua-hang-routing.module';
import { MMuaHangThuongMaiComponent } from './m-mua-hang-thuong-mai/m-mua-hang-thuong-mai.component';

@NgModule({
  imports: [
    SharedModule,
    MQuanLyMuaHangRoutingModule,
    CommonModule
  ],
  declarations: [
  ]
})
export class MQuanLyMuaHangModule { }
