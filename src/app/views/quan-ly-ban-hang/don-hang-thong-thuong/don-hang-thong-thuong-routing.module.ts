import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonHangThongThuongComponent } from './don-ban-thong-thuong.component';

const routes: Routes = [
  {
    path: '',
    component: DonHangThongThuongComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonHangThongThuongRoutingModule { }