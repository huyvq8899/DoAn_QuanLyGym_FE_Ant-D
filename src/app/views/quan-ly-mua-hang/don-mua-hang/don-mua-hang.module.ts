import { DonMuaHangComponent } from './don-mua-hang.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { DonMuaHangRoutingModule } from './don-mua-hang-routing.module';
import { MuaHangKhongQuaKhoModalComponent } from './modals/mua-hang-khong-qua-kho-modal/mua-hang-khong-qua-kho-modal.component';
import { HuyDuyetMuaHangKhongQuaKhoModalComponent } from './modals/huy-duyet-mua-hang-khong-qua-kho-modal/huy-duyet-mua-hang-khong-qua-kho-modal.component';

@NgModule({
  imports: [
    SharedModule,
    DonMuaHangRoutingModule,
    CommonModule
  ],
  declarations: [
    DonMuaHangComponent,
    MuaHangKhongQuaKhoModalComponent,
    HuyDuyetMuaHangKhongQuaKhoModalComponent
  ]
})
export class DonMuaHangModule { }
