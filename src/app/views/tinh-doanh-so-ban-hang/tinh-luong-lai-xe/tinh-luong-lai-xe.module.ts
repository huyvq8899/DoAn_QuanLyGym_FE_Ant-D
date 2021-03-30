import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinhLuongLaiXeComponent } from './tinh-luong-lai-xe.component';
import { SharedModule } from 'src/app/shared.module';
import { TinhLuongLaiXeRoutingModule } from './tinh-luong-lai-xe-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TinhLuongLaiXeRoutingModule,
    CommonModule
  ],
  declarations: [TinhLuongLaiXeComponent]
})
export class TinhLuongLaiXeModule { }
