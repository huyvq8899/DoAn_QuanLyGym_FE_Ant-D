import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThongKeSoLuongKhachHangComponent } from './thong-ke-so-luong-khach-hang/thong-ke-so-luong-khach-hang.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'thong-ke-so-luong-khach-hang', pathMatch: 'full',
    },
    {
        path: 'thong-ke-so-luong-khach-hang',
        component: ThongKeSoLuongKhachHangComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThongKeRoutingModule { }
