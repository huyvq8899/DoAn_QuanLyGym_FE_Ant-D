import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhongBanComponent } from './phong-ban.component';
import { SharedModule } from 'src/app/shared.module';
import { PhongBanRoutingModule } from './phong-ban-routing.module';
import { AddEditPhongBanModalComponent } from './modals/add-edit-phong-ban-modal.component';

@NgModule({
  imports: [
    SharedModule,
    PhongBanRoutingModule,
    CommonModule
  ],
  declarations: [
    PhongBanComponent,
    AddEditPhongBanModalComponent
  ]
})
export class PhongBanModule { }
