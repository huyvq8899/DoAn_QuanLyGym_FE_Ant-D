import { NgModule } from '@angular/core';
import { MDanhMucRoutingModule } from './m-danh-muc-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { MVungComponent } from './m-vung/m-vung.component';
import { MLoiNhuanComponent } from './m-loi-nhuan/m-loi-nhuan.component';
import { MAddEditLoiNhuanComponent } from './m-loi-nhuan/modal/m-add-edit-loi-nhuan/m-add-edit-loi-nhuan.component';
import { MChenhLechComponent } from 'src/app/views/m-danh-muc/m-chenh-lech/m-chenh-lech.component';
import { AddEditMChenhLechComponent } from './m-chenh-lech/modal/add-edit-m-chenh-lech/add-edit-m-chenh-lech.component';
import { MKhoHangComponent } from 'src/app/views/m-danh-muc/m-kho-hang/m-kho-hang.component';
import { MAddEditKhoHangComponent } from 'src/app/views/m-danh-muc/m-kho-hang/m-add-edit-kho-hang/m-add-edit-kho-hang.component';
import { MSanPhamComponent } from './m-san-pham/m-san-pham.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MAddEditSanPhamComponent } from './m-san-pham/m-add-edit-san-pham/m-add-edit-san-pham.component';
import { MNhaCungCapComponent } from './m-nha-cung-cap/m-nha-cung-cap.component';
import { MAddEditNhaCungCapComponent } from './m-nha-cung-cap/m-add-edit-nha-cung-cap/m-add-edit-nha-cung-cap.component';
import { MCuocVanChuyenComponent } from './m-cuoc-van-chuyen/m-cuoc-van-chuyen.component';
import { MAddEditCuocVanChuyenComponent } from './m-cuoc-van-chuyen/m-add-edit-cuoc-van-chuyen/m-add-edit-cuoc-van-chuyen.component';
import { MAddVungComponent } from './m-vung/m-modal/m-add-vung/m-add-vung.component';
import { LongPress } from 'src/app/long-press';
import { MChietKhauComponent } from './m-chiet-khau/m-chiet-khau.component';
import { MAddEditChietKhauComponent } from './m-chiet-khau/m-modal/m-add-edit-chiet-khau/m-add-edit-chiet-khau.component';
import { MLaiXeComponent } from './m-lai-xe/m-lai-xe.component';
import { MAddEditLaiXeComponent } from './m-lai-xe/m-modal/m-add-edit-chiet-khau/m-add-edit-lai-xe.component';
import { MNganhNgheComponent } from './m-nganh-nghe/m-nganh-nghe.component';
import { MAddEditNganhNgheModalComponent } from './m-nganh-nghe/m-modal/m-add-edit-nganh-nghe/m-add-edit-nganh-nghe.component';
import { MPhongBanComponent } from './m-phong-ban/m-phong-ban.component';
import { MAddEditPhongBanModalComponent } from './m-phong-ban/m-modal/m-add-edit-phong-ban/m-add-edit-phong-ban.component';
import { MPhuongAnNhapComponent } from './m-phuong-an-nhap/m-phuong-an-nhap.component';
import { MAddEditPhuongAnNhapComponent } from './m-phuong-an-nhap/m-modal/m-add-edit-phuong-an-nhap/m-add-edit-phuong-an-nhap.component';

@NgModule({
  imports: [
    SharedModule,
    MDanhMucRoutingModule,
    NgZorroAntdMobileModule,
  ],
  declarations: [
    MLoiNhuanComponent, MAddEditLoiNhuanComponent,
    MChenhLechComponent, AddEditMChenhLechComponent,
    MKhoHangComponent, MAddEditKhoHangComponent,
    MSanPhamComponent, MAddEditSanPhamComponent,
    MNhaCungCapComponent, MAddEditNhaCungCapComponent,
    MCuocVanChuyenComponent, MAddEditCuocVanChuyenComponent,
    MVungComponent,MAddVungComponent,
    MChietKhauComponent,MAddEditChietKhauComponent,
    MLaiXeComponent,MAddEditLaiXeComponent,
    MNganhNgheComponent,MAddEditNganhNgheModalComponent,
    MPhongBanComponent,MAddEditPhongBanModalComponent,
    MPhuongAnNhapComponent,MAddEditPhuongAnNhapComponent
  ]
})
export class MDanhMucModule { }
