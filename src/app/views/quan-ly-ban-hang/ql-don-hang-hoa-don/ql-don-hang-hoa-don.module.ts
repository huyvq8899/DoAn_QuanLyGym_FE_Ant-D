import { NgModule } from '@angular/core';
import { QlDonHangHoaDonComponent } from './ql-don-hang-hoa-don.component';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyTaiKhoanRoutingModule } from './ql-don-hang-hoa-don-routing.module';
import { TabTrangThaiDonHangHoaDonComponent } from './tab-trang-thai-don-hang-hoa-don/tab-trang-thai-don-hang-hoa-don.component';

@NgModule({
  imports: [
    SharedModule,
    QuanLyTaiKhoanRoutingModule
  ],
  declarations: [QlDonHangHoaDonComponent, TabTrangThaiDonHangHoaDonComponent]
})
export class QlDonHangHoaDonModule { }
