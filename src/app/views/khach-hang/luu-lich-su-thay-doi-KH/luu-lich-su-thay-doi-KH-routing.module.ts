import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LuuLichSuThayDoiKHComponent } from './luu-lich-su-thay-doi-KH.component';

const routes: Routes = [
    {
        path: "",
        component:LuuLichSuThayDoiKHComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LuuLichSuKhRoutingModule { }
