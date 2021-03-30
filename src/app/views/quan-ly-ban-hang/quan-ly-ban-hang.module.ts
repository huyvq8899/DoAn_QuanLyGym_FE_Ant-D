import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyBanHangRoutingModule } from './quan-ly-ban-hang-routing.module';
import { DieuXeModalComponent } from './modals/dieu-xe-modal/dieu-xe-modal.component';
import { AddEditDonBanHangModalComponent } from './modals/add-edit-don-ban-hang-modal/add-edit-don-ban-hang-modal.component';
import { TaoDonMuaHangModalComponent } from './modals/tao-don-mua-hang-modal/tao-don-mua-hang-modal.component';
import { LyDoHuyDuyetModalComponent } from './modals/ly-do-huy-duyet-modal/ly-do-huy-duyet-modal.component';
import { AddEditDonHangThuongMaiModalComponent } from './modals/add-edit-don-hang-thuong-mai-modal/add-edit-don-hang-thuong-mai-modal.component';
import { ThanhToanModalComponent } from './modals/thanh-toan-modal/thanh-toan-modal.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';


const APP_MODALS = [
  AddEditDonBanHangModalComponent,
  AddEditDonHangThuongMaiModalComponent,
  TaoDonMuaHangModalComponent,
  DieuXeModalComponent,
  LyDoHuyDuyetModalComponent,
  ThanhToanModalComponent
];

@NgModule({
  imports: [
    SharedModule,
    NzAutocompleteModule,
    QuanLyBanHangRoutingModule
  ],
  declarations: [
    ...APP_MODALS
  ]
})
export class QuanLyBanHangModule { }
