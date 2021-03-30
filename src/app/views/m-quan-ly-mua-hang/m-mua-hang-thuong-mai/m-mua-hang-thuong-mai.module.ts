
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MMuaHangThuongMaiComponent } from './m-mua-hang-thuong-mai.component';
import { MMuaHangThuongMaiRoutingModule } from './m-mua-hang-thuong-mai-routing.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    // SharedModule,
    // MKhachHangRoutingModule,
    // CommonModule,
    //NgZorroAntdMobileModule,
    MMuaHangThuongMaiRoutingModule,
    NgZorroAntdMobileModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    MMuaHangThuongMaiComponent,
    ModalComponent 
  ]
})
export class MMuaHangThuongMaiModule { }
