import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhoHangComponent } from './kho-hang.component';

const routes: Routes = [
    {
        path: '',
        component: KhoHangComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KhoHangRoutingModule { }
