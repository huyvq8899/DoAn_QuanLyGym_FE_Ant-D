import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoiNhuanComponent } from './loi-nhuan.component';
import { SharedModule } from 'src/app/shared.module';
import { LoiNhuanRoutingModule } from './loi-nhuan-routing.module';
import { AddEditLoiNhuanModalComponent } from './modals/add-edit-loi-nhuan-modal.component';

@NgModule({
  imports: [
    SharedModule,
    LoiNhuanRoutingModule,
    CommonModule
  ],
  declarations: [
    LoiNhuanComponent,
    AddEditLoiNhuanModalComponent
  ]
})
export class LoiNhuanModule { }
