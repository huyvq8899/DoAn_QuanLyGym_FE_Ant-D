import { NgModule } from '@angular/core';
import { DonBanHangsComponent } from './don-ban-hangs.component';
import { SharedModule } from 'src/app/shared.module';
import { DonBanHangRoutingModule } from './don-ban-hangs-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DonBanHangRoutingModule
  ],
  declarations: [DonBanHangsComponent]
})
export class DonBanHangsModule { }
