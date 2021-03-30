
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { MQuanLyBanHangRoutingModule } from './m-quan-ly-ban-hang-routing.module';
import { MBanHangThuongMaiComponent } from './m-ban-hang-thuong-mai/m-ban-hang-thuong-mai.component';
import { MAddEditBanHangThuongMaiComponent } from './m-ban-hang-thuong-mai/m-add-edit-ban-hang-thuong-mai/m-add-edit-ban-hang-thuong-mai.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MBanHangCongNghiepComponent } from './m-ban-hang-cong-nghiep/m-ban-hang-cong-nghiep.component';
import { MAddEditBanHangCongNghiepComponent } from './m-ban-hang-cong-nghiep/m-add-edit-ban-hang-cong-nghiep/m-add-edit-ban-hang-cong-nghiep.component';
import { MChiTietBanHangCongNghiepComponent } from './m-ban-hang-cong-nghiep/m-chi-tiet-ban-hang-cong-nghiep/m-chi-tiet-ban-hang-cong-nghiep.component';


@NgModule({
  imports: [
    SharedModule,
    MQuanLyBanHangRoutingModule,
    CommonModule,
    NgZorroAntdMobileModule
  ],
  declarations: [
  MBanHangThuongMaiComponent,
  MAddEditBanHangThuongMaiComponent,
  MBanHangCongNghiepComponent,
  MAddEditBanHangCongNghiepComponent,
  MChiTietBanHangCongNghiepComponent
]
})
export class MQuanLyBanHangModule { }
