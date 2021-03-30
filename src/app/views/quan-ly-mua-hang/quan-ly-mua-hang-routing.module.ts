import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'don-mua-hang', pathMatch: 'full',
    },
    {
        path: 'don-mua-hang',
        loadChildren: () => import('./don-mua-hang/don-mua-hang.module').then(m => m.DonMuaHangModule),
    },
    {
        path: 'mua-hang-gui-kho',
        loadChildren: () => import('./mua-hang-gui-kho/mua-hang-gui-kho.module').then(m => m.MuaHangGuiKhoModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuanLyMuaHangRoutingModule { }
