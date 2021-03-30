import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QlDonHangHoaDonComponent } from './ql-don-hang-hoa-don.component';

const routes: Routes = [
  {
    path: '',
    component: QlDonHangHoaDonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyTaiKhoanRoutingModule { }

