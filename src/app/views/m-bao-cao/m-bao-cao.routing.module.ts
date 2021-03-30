import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MBaoCaoThemKhachHangComponent } from './m-bao-cao-them-khach-hang/m-bao-cao-them-khach-hang.component';
import { MBaoCaoThemKhachHangTheoNhanVienComponent } from './m-bao-cao-them-khach-hang-theo-nhan-vien/m-bao-cao-them-khach-hang-theo-nhan-vien.component';
import { MBaoCaoThemKHTheoNVKDComponent } from './m-bao-cao-them-KH-theo-NVKD/m-bao-cao-them-KH-theo-NVKD.component';
const routes: Routes = [
    {
        path: '', redirectTo: 'm-bao-cao-them-khach-hang', pathMatch: 'full',
    },
    {
        path: 'm-bao-cao-them-khach-hang',
        component: MBaoCaoThemKhachHangComponent,
    },
    {
        path: 'm-bao-cao-them-khach-hang-theo-nhan-vien',
        component: MBaoCaoThemKhachHangTheoNhanVienComponent,
    },
    {
        path: 'm-bao-cao-them-khach-hang-theo-nhan-vien-KD',
        component: MBaoCaoThemKHTheoNVKDComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
   
exports: [RouterModule]
})
export class MBaoCaoRoutingModule { }
