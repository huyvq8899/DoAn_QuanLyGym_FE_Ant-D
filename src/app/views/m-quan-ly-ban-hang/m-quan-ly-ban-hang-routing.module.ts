
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MAddEditBanHangCongNghiepComponent } from './m-ban-hang-cong-nghiep/m-add-edit-ban-hang-cong-nghiep/m-add-edit-ban-hang-cong-nghiep.component';
import { MBanHangCongNghiepComponent } from './m-ban-hang-cong-nghiep/m-ban-hang-cong-nghiep.component';
import { MChiTietBanHangCongNghiepComponent } from './m-ban-hang-cong-nghiep/m-chi-tiet-ban-hang-cong-nghiep/m-chi-tiet-ban-hang-cong-nghiep.component';
import { MAddEditBanHangThuongMaiComponent } from './m-ban-hang-thuong-mai/m-add-edit-ban-hang-thuong-mai/m-add-edit-ban-hang-thuong-mai.component';
import { MBanHangThuongMaiComponent } from './m-ban-hang-thuong-mai/m-ban-hang-thuong-mai.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'm-don-hang-thuong-mai',
        component: MBanHangThuongMaiComponent
    },
    {
        path: 'm-don-hang-thuong-mai/m-add-edit-don-hang-thuong-mai',
        component: MAddEditBanHangThuongMaiComponent
    },
    {
        path: 'm-don-hang-cong-nghiep',
        component: MBanHangCongNghiepComponent
    },
    {
        path: 'm-don-hang-cong-nghiep/m-add-edit-ban-hang-cong-nghiep',
        component: MAddEditBanHangCongNghiepComponent
    },
    {
        path: 'm-don-hang-cong-nghiep/m-chi-tiet-ban-hang-cong-nghiep',
        component: MChiTietBanHangCongNghiepComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MQuanLyBanHangRoutingModule { }
