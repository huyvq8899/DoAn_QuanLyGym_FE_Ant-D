import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuaHangGuiKhoComponent } from './mua-hang-gui-kho.component';

const routes: Routes = [
    {
        path: '',
        component: MuaHangGuiKhoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MuaHangGuiKhoRoutingModule { }
