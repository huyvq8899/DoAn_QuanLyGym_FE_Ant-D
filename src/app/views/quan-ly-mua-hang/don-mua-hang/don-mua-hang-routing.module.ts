import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonMuaHangComponent } from './don-mua-hang.component';

const routes: Routes = [
    {
        path: '',
        component: DonMuaHangComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DonMuaHangRoutingModule { }
