
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MAddEditMuaHangCnComponent } from './m-add-edit-mua-hang-cn/m-add-edit-mua-hang-cn.component';
import { MMuaHangCongNghiepComponent } from './m-mua-hang-cong-nghiep.component';


const routes: Routes = [
    {
        path: '',
        component: MMuaHangCongNghiepComponent
    },
    {
        path:'m-add-edit-mua-hang-cn',
        component: MAddEditMuaHangCnComponent,
        data: {
            customBreadcrumb: 'm-add-edit-mua-hang-cn'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MMuaHangCongNghiepRoutingModule { }
