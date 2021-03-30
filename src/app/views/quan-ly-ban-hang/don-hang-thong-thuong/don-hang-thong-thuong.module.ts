import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { DonHangThongThuongRoutingModule } from './don-hang-thong-thuong-routing.module';
import { DonHangThongThuongComponent } from './don-ban-thong-thuong.component';
import { DatePipe } from '@angular/common'

@NgModule({
  imports: [
    SharedModule,
    DonHangThongThuongRoutingModule
  ],
  declarations: [DonHangThongThuongComponent],
  providers: [DatePipe]
})
export class DonHangThongThuongModule { }