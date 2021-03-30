import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaiXeComponent } from './lai-xe.component';

const routes: Routes = [
    {
        path: '',
        component: LaiXeComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LaiXeRoutingModule { }
