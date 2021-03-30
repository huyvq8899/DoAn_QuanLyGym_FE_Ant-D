import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { LuuLichSuKhRoutingModule } from './luu-lich-su-thay-doi-KH-routing.module';
import { LuuLichSuThayDoiKHComponent } from './luu-lich-su-thay-doi-KH.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    LuuLichSuKhRoutingModule
  ],

  declarations: [
    LuuLichSuThayDoiKHComponent
  ]
})
export class LuuLichSuThayDoiModule { }
