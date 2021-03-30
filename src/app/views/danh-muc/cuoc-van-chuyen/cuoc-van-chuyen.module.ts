import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuocVanChuyenComponent } from './cuoc-van-chuyen.component';
import { SharedModule } from 'src/app/shared.module';
import { CuocVanChuyenRoutingModule } from './cuoc-van-chuyen-routing.module';
import { AddEditCuocVanChuyenModalComponent } from './modals/add-edit-cuoc-van-chuyen-modal/add-edit-cuoc-van-chuyen-modal.component';

@NgModule({
  imports: [
    SharedModule,
    CuocVanChuyenRoutingModule,
    CommonModule
  ],
  declarations: [
    CuocVanChuyenComponent,
    AddEditCuocVanChuyenModalComponent
  ]
})
export class CuocVanChuyenModule { }
