import { MMuaHangCongNghiepComponent } from './m-mua-hang-cong-nghiep/m-mua-hang-cong-nghiep.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', 
        redirectTo: 'm-mua-hang-cong-nghiep', 
        pathMatch: 'full',
    },
    {
        path: 'm-mua-hang-cong-nghiep',
        loadChildren: () => import('./m-mua-hang-cong-nghiep/m-mua-hang-cong-nghiep.module').then(m => m.MMuaHangCongNghiepModule),
    },
    {
        path: 'm-mua-hang-thuong-mai',
        loadChildren: () => import('./m-mua-hang-thuong-mai/m-mua-hang-thuong-mai.module').then(m => m.MMuaHangThuongMaiModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MQuanLyMuaHangRoutingModule { }
