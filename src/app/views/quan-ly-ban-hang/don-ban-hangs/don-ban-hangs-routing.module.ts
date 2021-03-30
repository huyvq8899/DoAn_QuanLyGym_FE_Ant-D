import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonBanHangsComponent } from './don-ban-hangs.component';

const routes: Routes = [
  {
    path: '',
    component: DonBanHangsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonBanHangRoutingModule { }
