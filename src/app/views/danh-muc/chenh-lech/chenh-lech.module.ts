import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChenhLechComponent } from './chenh-lech.component';
import { SharedModule } from 'src/app/shared.module';
import { ChenhLechRoutingModule } from './chenh-lech-routing.module';
import { AddEditChenhLechModalComponent } from './modals/add-edit-chenh-lech-modal.component';

@NgModule({
  imports: [
    SharedModule,
    ChenhLechRoutingModule,
    CommonModule
  ],
  declarations: [
    ChenhLechComponent,
    AddEditChenhLechModalComponent
  ]
})
export class ChenhLechModule { }
