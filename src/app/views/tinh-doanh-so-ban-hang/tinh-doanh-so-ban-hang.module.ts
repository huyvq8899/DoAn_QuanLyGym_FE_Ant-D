import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { TinhDoanhSoBanHangRoutingModule } from './tinh-doanh-so-ban-hang-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TinhDoanhSoBanHangRoutingModule,
    CommonModule
  ],
  declarations: []
})
export class TinhDoanhSoBanHangModule { }
