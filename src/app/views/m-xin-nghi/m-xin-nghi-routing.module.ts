
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MAddEditXinNghiComponent } from './m-add-edit-xin-nghi/m-add-edit-xin-nghi.component';
import { MThongKeXinNghiComponent } from './m-thong-ke-xin-nghi/m-thong-ke-xin-nghi.component';
import { MXinNghiComponent } from './m-xin-nghi.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'm-de-xuat-xin-nghi',
        component: MXinNghiComponent
    },
    {
        path: 'm-add-edit-xin-nghi',
        component: MAddEditXinNghiComponent
    },
    {
        path: 'm-thong-ke-xin-nghi',
        component: MThongKeXinNghiComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MXinNghiRoutingModule { }
