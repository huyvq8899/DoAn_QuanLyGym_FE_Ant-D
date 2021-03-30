
import { MMuaHangCongNghiepComponent } from './m-mua-hang-cong-nghiep.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MMuaHangCongNghiepRoutingModule } from './m-mua-hang-cong-nghiep-routing.module';
import { MAddEditMuaHangCnComponent } from './m-add-edit-mua-hang-cn/m-add-edit-mua-hang-cn.component';

@NgModule({
  imports: [
    // SharedModule,
    // MKhachHangRoutingModule,
    // CommonModule,
    //NgZorroAntdMobileModule,
    MMuaHangCongNghiepRoutingModule,
    NgZorroAntdMobileModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [MMuaHangCongNghiepComponent,
    MAddEditMuaHangCnComponent,
  ]
})
export class MMuaHangCongNghiepModule { }
