import { NgModule } from '@angular/core';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { VungComponent } from './vung/vung.component';
import { NganhNgheComponent } from './nganh-nghe/nganh-nghe.component';
import { AddEditVungComponent } from './vung/modal/add-edit-vung/add-edit-vung.component';
import { AddEditNganhNgheComponent } from './nganh-nghe/modal/add-edit-nganh-nghe/add-edit-nganh-nghe.component';
import { KhoHangComponent } from './kho-hang/kho-hang.component';
import { AddEditKhoHangModalComponent } from './kho-hang/modals/add-edit-kho-hang-modal/add-edit-kho-hang-modal.component';
import { PhuongAnNhapComponent } from './phuong-an-nhap/phuong-an-nhap.component';
import { AddEditPhuongAnNhapComponent } from './phuong-an-nhap/modal/add-edit-phuong-an-nhap/add-edit-phuong-an-nhap.component';
import { CardTypeComponent } from './card-type/card-type.component';
import { AddEditCardTypeComponent } from './card-type/add-edit-card-type/add-edit-card-type/add-edit-card-type.component';
@NgModule({
  imports: [
 
    SharedModule,
    DanhMucRoutingModule
  ],
  declarations: [
    
  VungComponent, AddEditVungComponent,
  NganhNgheComponent, AddEditNganhNgheComponent,
  PhuongAnNhapComponent, AddEditPhuongAnNhapComponent,
  CardTypeComponent,AddEditCardTypeComponent
  
]
})
export class DanhMucModule { }
