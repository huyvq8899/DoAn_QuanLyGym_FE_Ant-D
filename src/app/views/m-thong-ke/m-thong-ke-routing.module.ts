import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MThongKeSoLuongKhachHangComponent } from './m-thong-ke-so-luong-khach-hang/m-thong-ke-so-luong-khach-hang.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'm-thong-ke-so-luong-khach-hang', pathMatch: 'full',
    },
    {
        path: 'm-thong-ke-so-luong-khach-hang',
        component: MThongKeSoLuongKhachHangComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MThongKeRoutingModule { }
