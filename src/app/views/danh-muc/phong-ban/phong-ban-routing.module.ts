import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhongBanComponent } from './phong-ban.component';

const routes: Routes = [
    {
        path: '',
        component: PhongBanComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhongBanRoutingModule { }
