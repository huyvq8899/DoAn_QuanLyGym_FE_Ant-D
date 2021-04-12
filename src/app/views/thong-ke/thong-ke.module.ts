import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongKeSoLuongKhachHangComponent } from './thong-ke-so-luong-khach-hang/thong-ke-so-luong-khach-hang.component';
import { ThongKeRoutingModule } from './thong-ke-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { SharedModule } from 'src/app/shared.module';
import { ThongKeSoLuongTheTapComponent } from './thong-ke-so-luong-the-tap/thong-ke-so-luong-the-tap.component';
import { ThongKeDoanhThuComponent } from './thong-ke-doanh-thu/thong-ke-doanh-thu.component';

@NgModule({
  imports: [
    ThongKeRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    NgZorroModule,
    FormsModule,
  ],
  exports: [],
  declarations: [ThongKeSoLuongKhachHangComponent,ThongKeSoLuongTheTapComponent,ThongKeDoanhThuComponent],
  entryComponents: [ThongKeSoLuongKhachHangComponent,ThongKeSoLuongTheTapComponent,ThongKeDoanhThuComponent],
})
export class ThongKeModule { }
