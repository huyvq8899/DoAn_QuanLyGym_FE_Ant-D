import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyBanHangTheoQuyTrinhComponent } from './quan-ly-ban-hang-theo-quy-trinh.component';

const routes: Routes = [
    {
        path: '',
        component: QuanLyBanHangTheoQuyTrinhComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuanLyTaiKhoanRoutingModule { }
