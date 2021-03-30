import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChietKhauComponent } from './chiet-khau.component';

const routes: Routes = [
    {
        path: '',
        component: ChietKhauComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChietKhauRoutingModule { }
