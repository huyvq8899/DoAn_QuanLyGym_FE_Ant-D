import { NhaCungCapComponent } from './nha-cung-cap/nha-cung-cap.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KhoHangComponent } from './kho-hang/kho-hang.component';
import { NganhNgheComponent } from './nganh-nghe/nganh-nghe.component';
import { PhuongAnNhapComponent } from './phuong-an-nhap/phuong-an-nhap.component';
import { VungComponent } from './vung/vung.component';
import { CardTypeComponent } from './card-type/card-type.component';
import { FacilityComponent } from './facility/facility.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { JobComponent } from './job/job.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'bao-gia', pathMatch: 'full',
    },
    {
        path: 'cuoc-van-chuyen',
        loadChildren: () => import('./cuoc-van-chuyen/cuoc-van-chuyen.module').then(m => m.CuocVanChuyenModule),
    },
    {
        path: 'lai-xe',
        loadChildren: () => import('./lai-xe/lai-xe.module').then(m => m.LaiXeModule),
    },
    {
        path: 'chiet-khau',
        loadChildren: () => import('./chiet-khau/chiet-khau.module').then(m => m.ChietKhauModule),
    },
    {

        path: 'vung',
        component:VungComponent
    },
    {
        path: 'nganh-nghe',
        component:NganhNgheComponent
    },

    {
        path: 'phong-ban',
        loadChildren: () => import('./phong-ban/phong-ban.module').then(m => m.PhongBanModule),
    }
    ,
    {
        path: 'kho-hang',
        loadChildren: () => import('./kho-hang/kho-hang.module').then(m => m.KhoHangModule),
    },
    {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    },
    {
        path: 'nha-cung-cap',
        loadChildren: () => import('./nha-cung-cap/nha-cung-cap.module').then(m => m.NhaCungCapModule),
    },
    {
        path: 'phuong-an-nhap',
        component:PhuongAnNhapComponent
    },
    {
        path: 'loi-nhuan',
        loadChildren: () => import('./loi-nhuan/loi-nhuan.module').then(m => m.LoiNhuanModule),
    },
    {
        path: 'chenh-lech',
        loadChildren: () => import('./chenh-lech/chenh-lech.module').then(m => m.ChenhLechModule),
    },
    {

        path: 'cardtype',
        component:CardTypeComponent
    },
    {
        path: 'facility',
        component:FacilityComponent
    },
    {
        path: 'equipment',
        component:EquipmentComponent
    },
    {
        path: 'dich-vu',
        component:DichVuComponent
    },
    {
        path: 'job',
        component:JobComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DanhMucRoutingModule { }
