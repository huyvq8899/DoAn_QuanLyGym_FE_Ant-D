import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhMucTaiChinhKeToanComponent } from './danh-muc-tai-chinh-ke-toan.component';

const routes: Routes = [
    {
        path: '',
        component: DanhMucTaiChinhKeToanComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DanhMucTaiChinhKeRoutingModule { }
