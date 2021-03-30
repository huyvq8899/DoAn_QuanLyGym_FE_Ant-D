import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaiXeComponent } from './lai-xe.component';
import { SharedModule } from 'src/app/shared.module';
import { LaiXeRoutingModule } from './lai-xe-routing.module';
import { AddEditLaiXeModalComponent } from './modals/add-edit-lai-xe-modal/add-edit-lai-xe-modal.component';

@NgModule({
  imports: [
    SharedModule,
    LaiXeRoutingModule,
    CommonModule
  ],
  declarations: [
    AddEditLaiXeModalComponent,
    LaiXeComponent
  ]
})
export class LaiXeModule { }
