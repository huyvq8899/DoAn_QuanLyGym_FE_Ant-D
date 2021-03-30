import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { AddEditNhaCungCapModalComponent } from './modals/add-edit-nha-cung-cap-modal/add-edit-nha-cung-cap-modal.component';
import { NhaCungCapRoutingModule } from './nha-cung-cap-routing.module';
import { NhaCungCapComponent } from './nha-cung-cap.component';

@NgModule({
  imports: [
    SharedModule,
    NhaCungCapRoutingModule,
    CommonModule
  ],
  declarations: [
    NhaCungCapComponent,
    AddEditNhaCungCapModalComponent
  ]
})
export class NhaCungCapModule { }
