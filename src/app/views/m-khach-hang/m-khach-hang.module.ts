import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MKhachHangComponent } from './m-khach-hang.component';
import { SharedModule } from 'src/app/shared.module';
import { MKhachHangRoutingModule } from './m-khach-hang-routing.module';
import { MAddEditKhachHangComponent } from './m-add-edit-khach-hang/m-add-edit-khach-hang.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MAddKhachHangComponent } from './m-add-khach-hang/m-add-khach-hang.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MLuuLichSuKHComponent } from './m-luu-lich-su-KH/m-luu-lich-su-KH.component';
import { MChiTietLuuLichSuComponent } from './m-luu-lich-su-KH/modals/m-chi-tiet-luu-lich-su/m-chi-tiet-luu-lich-su.component';


@NgModule({
  imports: [
    // SharedModule,
    // MKhachHangRoutingModule,
    // CommonModule,
    //NgZorroAntdMobileModule,
    NgZorroAntdMobileModule,
    CommonModule,
    MKhachHangRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    MKhachHangComponent,
    MAddEditKhachHangComponent,
    MAddKhachHangComponent,
    MLuuLichSuKHComponent,
    MChiTietLuuLichSuComponent
    
  ]
})
export class MKhachHangModule { }
