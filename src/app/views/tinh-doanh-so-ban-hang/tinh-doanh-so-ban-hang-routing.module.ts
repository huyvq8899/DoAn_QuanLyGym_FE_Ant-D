import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'tinh-luong-lai-xe', pathMatch: 'full',
    },
    {
        path: 'tinh-luong-lai-xe',
        loadChildren: () => import('./tinh-luong-lai-xe/tinh-luong-lai-xe.module').then(m => m.TinhLuongLaiXeModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TinhDoanhSoBanHangRoutingModule { }
