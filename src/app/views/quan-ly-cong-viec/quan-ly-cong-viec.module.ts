import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyCongViecRoutingModule } from './quan-ly-cong-viec-routing.module';

@NgModule({
  imports: [
    SharedModule,
    QuanLyCongViecRoutingModule,
    CommonModule
  ],
  declarations: []
})
export class QuanLyCongViecModule { }
