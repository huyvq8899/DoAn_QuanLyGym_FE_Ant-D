import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'quan-ly-ton-kho', pathMatch: 'full',
    },
    {
        path: 'quan-ly-ton-kho',
        loadChildren: () => import('./quan-ly-ton-kho/quan-ly-ton-kho.module').then(m => m.QuanLyTonKhoModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuanLyCongViecRoutingModule { }
