import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaoCaoComponent } from './bao-cao.component';
import { BaoCaoThemKhachHangComponent } from './bao-cao-them-khach-hang/bao-cao-them-khach-hang.component';
import { BaoCaoThemKhachHangTheoNhanVienComponent } from './bao-cao-them-khach-hang-theo-nhan-vien/bao-cao-them-khach-hang-theo-nhan-vien.component';
import { BaoCaoThemKHTheoNVKDComponent } from './bao-cao-them-KH-theo-NVKD/bao-cao-them-KH-theo-NVKD.component';
const routes: Routes = [
    {
        path: '', redirectTo: 'bao-cao-them-khach-hang', pathMatch: 'full',
    },
    {
        path: 'bao-cao-them-khach-hang',
        component: BaoCaoThemKhachHangComponent,
    },
    {
        path: 'bao-cao-them-khach-hang-theo-nhan-vien',
        component: BaoCaoThemKhachHangTheoNhanVienComponent,
    },
    {
        path: 'bao-cao-them-khach-hang-theo-nhan-vien-KD',
        component: BaoCaoThemKHTheoNVKDComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
   
exports: [RouterModule]
})
export class BaoCaoRoutingModule { }
