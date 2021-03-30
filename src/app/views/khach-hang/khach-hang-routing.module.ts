import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhachHangComponent } from './khach-hang.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'khach-hang', pathMatch: 'full',
    },
    {

        path: 'khach-hang',
        component:KhachHangComponent
    },
    {
        path: 'luu-lich-su-kh',
        loadChildren: () => import('./luu-lich-su-thay-doi-KH/luu-lich-su-thay-doi-KH.module').then(m => m.LuuLichSuThayDoiModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KhachHangRoutingModule { }
