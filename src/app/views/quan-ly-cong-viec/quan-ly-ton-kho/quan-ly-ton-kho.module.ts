import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyTonKhoComponent } from './quan-ly-ton-kho.component';
import { SharedModule } from 'src/app/shared.module';
import { QuanLyTonKhoRoutingModule } from './quan-ly-ton-kho-routing.module';

@NgModule({
  imports: [
    SharedModule,
    QuanLyTonKhoRoutingModule,
    CommonModule
  ],
  declarations: [QuanLyTonKhoComponent]
})
export class QuanLyTonKhoModule { }
