import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MMuaHangThuongMaiComponent } from './m-mua-hang-thuong-mai.component';

const routes: Routes = [
    {
        path: '',
        component: MMuaHangThuongMaiComponent
    },
    {
        path:'modal',
        component: ModalComponent,
        data: {
            customBreadcrumb: 'modal'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MMuaHangThuongMaiRoutingModule { }
