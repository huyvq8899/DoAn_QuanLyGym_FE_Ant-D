import { MAddEditLoiNhuanComponent } from './m-loi-nhuan/modal/m-add-edit-loi-nhuan/m-add-edit-loi-nhuan.component';
import { MLoiNhuanComponent } from 'src/app/views/m-danh-muc/m-loi-nhuan/m-loi-nhuan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MVungComponent } from './m-vung/m-vung.component';
import { MAddVungComponent } from './m-vung/m-modal/m-add-vung/m-add-vung.component';
import { MChenhLechComponent } from 'src/app/views/m-danh-muc/m-chenh-lech/m-chenh-lech.component';
import { AddEditMChenhLechComponent } from './m-chenh-lech/modal/add-edit-m-chenh-lech/add-edit-m-chenh-lech.component';
import { MKhoHangComponent } from './m-kho-hang/m-kho-hang.component';
import { MAddEditKhoHangComponent } from './m-kho-hang/m-add-edit-kho-hang/m-add-edit-kho-hang.component';
import { MSanPhamComponent } from './m-san-pham/m-san-pham.component';
import { MAddEditSanPhamComponent } from './m-san-pham/m-add-edit-san-pham/m-add-edit-san-pham.component';
import { MNhaCungCapComponent } from './m-nha-cung-cap/m-nha-cung-cap.component';
import { MAddEditNhaCungCapComponent } from './m-nha-cung-cap/m-add-edit-nha-cung-cap/m-add-edit-nha-cung-cap.component';
import { MCuocVanChuyenComponent } from './m-cuoc-van-chuyen/m-cuoc-van-chuyen.component';
import { MAddEditCuocVanChuyenComponent } from './m-cuoc-van-chuyen/m-add-edit-cuoc-van-chuyen/m-add-edit-cuoc-van-chuyen.component';
import { MPhuongAnNhapComponent } from './m-phuong-an-nhap/m-phuong-an-nhap.component';
import { MAddEditPhuongAnNhapComponent } from './m-phuong-an-nhap/m-modal/m-add-edit-phuong-an-nhap/m-add-edit-phuong-an-nhap.component';
import { MPhongBanComponent } from './m-phong-ban/m-phong-ban.component';
import { MAddEditPhongBanModalComponent } from './m-phong-ban/m-modal/m-add-edit-phong-ban/m-add-edit-phong-ban.component';
import { MNganhNgheComponent } from './m-nganh-nghe/m-nganh-nghe.component';
import { MAddEditNganhNgheModalComponent } from './m-nganh-nghe/m-modal/m-add-edit-nganh-nghe/m-add-edit-nganh-nghe.component';
import { MChietKhauComponent } from './m-chiet-khau/m-chiet-khau.component';
import { MAddEditChietKhauComponent } from './m-chiet-khau/m-modal/m-add-edit-chiet-khau/m-add-edit-chiet-khau.component';
import { MLaiXeComponent } from './m-lai-xe/m-lai-xe.component';
import { MAddEditLaiXeComponent } from './m-lai-xe/m-modal/m-add-edit-chiet-khau/m-add-edit-lai-xe.component';
import { MCardTypeComponent } from './m-card-type/m-card-type.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'm-phuong-an-nhap',
        component: MPhuongAnNhapComponent
    },
    {
        path: 'm-phuong-an-nhap/m-add-edit-phuong-an-nhap',
        component: MAddEditPhuongAnNhapComponent,
    },
    {
        path: 'm-phong-ban',
        component: MPhongBanComponent
    },
    {
        path: 'm-phong-ban/m-add-edit-phong-ban',
        component: MAddEditPhongBanModalComponent,
    },
    {
        path: 'm-nganh-nghe',
        component: MNganhNgheComponent
    },
    {
        path: 'm-nganh-nghe/m-add-edit-nganh-nghe',
        component: MAddEditNganhNgheModalComponent,
    },
    {
        path: 'm-chiet-khau',
        component: MChietKhauComponent
    },
    {
        path: 'm-chiet-khau/m-add-edit-chiet-khau',
        component: MAddEditChietKhauComponent,
    },
    {
        path: 'm-lai-xe',
        component: MLaiXeComponent
    },
    {
        path: 'm-lai-xe/m-add-edit-lai-xe',
        component: MAddEditLaiXeComponent,
    },



    {
        path: 'm-vung',
        component: MVungComponent
    },
    {
        path: 'm-vung/m-add-vung',
        component: MAddVungComponent,
    },
    {
        path: 'm-loi-nhuan',
        component: MLoiNhuanComponent
    },
    {
        path: 'm-loi-nhuan/m-add-loi-nhuan',
        component: MAddEditLoiNhuanComponent
    },
    {
        path: 'm-card-type',
        component: MCardTypeComponent
    },
    {
        path: 'm-chenh-lech/m-add-edit-chenh-lech',
        component: AddEditMChenhLechComponent
    },
    {
        path: 'm-kho-hang',
        component: MKhoHangComponent
    },
    {
        path: 'm-kho-hang/m-add-edit-kho-hang',
        component: MAddEditKhoHangComponent
    },
    {
        path: 'm-san-pham',
        component: MSanPhamComponent
    },
    {
        path: 'm-san-pham/m-add-edit-san-pham',
        component: MAddEditSanPhamComponent
    },
    {
        path: 'm-nha-cung-cap',
        component: MNhaCungCapComponent
    },
    {
        path: 'm-nha-cung-cap/m-add-edit-nha-cung-cap',
        component: MAddEditNhaCungCapComponent
    },
    {
        path: 'm-cuoc-van-chuyen',
        component: MCuocVanChuyenComponent
    },
    {
        path: 'm-cuoc-van-chuyen/m-add-edit-cuoc-van-chuyen',
        component: MAddEditCuocVanChuyenComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MDanhMucRoutingModule { }
