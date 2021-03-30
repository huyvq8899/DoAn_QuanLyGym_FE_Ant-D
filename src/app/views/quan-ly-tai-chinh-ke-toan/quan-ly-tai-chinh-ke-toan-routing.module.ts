import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'danh-muc-tai-chinh-ke-toan', pathMatch: 'full',
    },
    {
        path: 'danh-muc-tai-chinh-ke-toan',
        loadChildren: () => import('./danh-muc-tai-chinh-ke-toan/danh-muc-tai-chinh-ke-toan.module').then(m => m.DanhMucTaiChinhKeToanModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuanLyTaiChinhKeRoutingModule { }
