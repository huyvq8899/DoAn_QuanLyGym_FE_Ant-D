import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChietKhauComponent } from './chiet-khau.component';
import { SharedModule } from 'src/app/shared.module';
import { ChietKhauRoutingModule } from './chiet-khau-routing.module';
import { AddEditChietKhauModalComponent } from './modals/add-edit-chiet-khau-modal.component';

@NgModule({
  imports: [
    SharedModule,
    ChietKhauRoutingModule,
    CommonModule
  ],
  declarations: [
    ChietKhauComponent,
    AddEditChietKhauModalComponent
  ]
})
export class ChietKhauModule { }
