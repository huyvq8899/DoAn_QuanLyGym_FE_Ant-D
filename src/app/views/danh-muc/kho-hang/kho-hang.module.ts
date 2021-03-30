import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhoHangComponent } from './kho-hang.component';
import { SharedModule } from 'src/app/shared.module';
import { KhoHangRoutingModule } from './kho-hang-routing.module';
import { AddEditKhoHangModalComponent } from './modals/add-edit-kho-hang-modal/add-edit-kho-hang-modal.component';

@NgModule({
  imports: [
    SharedModule,
    KhoHangRoutingModule,
    CommonModule
  ],
  declarations: [
    KhoHangComponent,
    AddEditKhoHangModalComponent
  ]
})
export class KhoHangModule { }
