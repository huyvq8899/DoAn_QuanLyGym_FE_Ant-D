import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoiNhuanComponent } from './loi-nhuan.component';

const routes: Routes = [
    {
        path: '',
        component: LoiNhuanComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoiNhuanRoutingModule { }
