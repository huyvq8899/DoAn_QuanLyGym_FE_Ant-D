import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuaHangGuiKhoComponent } from './mua-hang-gui-kho.component';
import { SharedModule } from 'src/app/shared.module';
import { MuaHangGuiKhoRoutingModule } from './mua-hang-gui-kho-routing.module';
import { MuaHangGuiKhoModalComponent } from './modals/mua-hang-gui-kho-modal/mua-hang-gui-kho-modal.component';
import { HuyDuyetMuaHangGuiKhoModalComponent } from './modals/huy-duyet-mua-hang-gui-kho-modal/huy-duyet-mua-hang-gui-kho-modal.component';

@NgModule({
  imports: [
    SharedModule,
    MuaHangGuiKhoRoutingModule,
    CommonModule
  ],
  declarations: [
    MuaHangGuiKhoComponent,
    MuaHangGuiKhoModalComponent,
    HuyDuyetMuaHangGuiKhoModalComponent
  ]
})
export class MuaHangGuiKhoModule { }
