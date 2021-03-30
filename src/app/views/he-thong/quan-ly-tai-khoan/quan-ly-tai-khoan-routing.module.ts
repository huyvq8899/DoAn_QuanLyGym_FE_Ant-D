import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyTaiKhoanComponent } from './quan-ly-tai-khoan.component';

const routes: Routes = [
    {
        path: '',
        component: QuanLyTaiKhoanComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuanLyTaiKhoanRoutingModule { }
