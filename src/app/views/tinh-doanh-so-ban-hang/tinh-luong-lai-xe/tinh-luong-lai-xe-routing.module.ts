import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TinhLuongLaiXeComponent } from './tinh-luong-lai-xe.component';

const routes: Routes = [
    {
        path: '',
        component: TinhLuongLaiXeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TinhLuongLaiXeRoutingModule { }
