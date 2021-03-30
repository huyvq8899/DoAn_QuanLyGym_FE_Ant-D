import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MLoginComponent } from './m-login.component';

const routes: Routes = [
    {
        path: '',
        component: MLoginComponent,
        data: {
            title: 'Trang đăng nhập'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MLoginRoutingModule { }
