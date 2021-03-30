import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuocVanChuyenComponent } from './cuoc-van-chuyen.component';

const routes: Routes = [
    {
        path: '',
        component: CuocVanChuyenComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CuocVanChuyenRoutingModule { }
