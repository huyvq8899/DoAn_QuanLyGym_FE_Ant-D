import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhachHangComponent } from './khach-hang.component';
import { SharedModule } from 'src/app/shared.module';
import { KhachHangRoutingModule } from './khach-hang-routing.module';

import { AddEditKhachHangModalComponent } from './add-edit-khach-hang/add-edit-khach-hang.component';

@NgModule({
  imports: [
    SharedModule,
    KhachHangRoutingModule,
    CommonModule,
    
  ],
  declarations: [
    KhachHangComponent,
    AddEditKhachHangModalComponent,
  ]
})
export class KhachHangModule { }
