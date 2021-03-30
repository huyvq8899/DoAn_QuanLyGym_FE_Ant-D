import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'quan-ly-ban-hang-theo-quy-trinh', pathMatch: 'full',
    },
    {
        path: 'quan-ly-ban-hang-theo-quy-trinh',
        loadChildren: () => import('./quan-ly-ban-hang-theo-quy-trinh/quan-ly-ban-hang-theo-quy-trinh.module').then(m => m.QuanLyBanHangTheoQuyTrinhModule),
    },
    {
        path: 'don-hang-thong-thuong',
        loadChildren: () => import('./don-hang-thong-thuong/don-hang-thong-thuong.module').then(m => m.DonHangThongThuongModule),
    },
    {
        path: 'don-hang-thuong-mai',
        loadChildren: () => import('./don-ban-hangs/don-ban-hangs.module').then(m => m.DonBanHangsModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuanLyBanHangRoutingModule { }
