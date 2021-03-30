import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'quan-ly-tai-khoan', pathMatch: 'full',
    },
    {
        path: 'quan-ly-tai-khoan',
        loadChildren: () => import('./quan-ly-tai-khoan/quan-ly-tai-khoan.module').then(m => m.QuanLyTaiKhoanModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeThongRoutingModule { }
