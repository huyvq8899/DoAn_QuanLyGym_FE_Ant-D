import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeThongRoutingModule } from './he-thong-routing.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HeThongRoutingModule,
    CommonModule
  ],
  declarations: []
})
export class HeThongModule { }
