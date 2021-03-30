import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MThongKeSoLuongKhachHangComponent } from './m-thong-ke-so-luong-khach-hang/m-thong-ke-so-luong-khach-hang.component';
import { MThongKeRoutingModule } from './m-thong-ke-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { SharedModule } from 'src/app/shared.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    MThongKeRoutingModule,
    NgZorroAntdMobileModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  exports: [],
  declarations: [MThongKeSoLuongKhachHangComponent],
  entryComponents: [MThongKeSoLuongKhachHangComponent],
})
export class MThongKeModule { }
