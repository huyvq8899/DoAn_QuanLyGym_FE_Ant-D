import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { SharedModule } from 'src/app/shared.module';
import { MAccountRoutingModule } from './m-account-rounting.module';
import { MAccountComponent } from './m-account.component';
import { MAccountListComponent } from './m-account-list/m-account-list.component';
import { MAddAccountComponent } from './m-add-account/m-add-account.component';
import { MAccountEditComponent } from './m-account-edit/m-account-edit.component';
import { MAccountChangePasswordComponent } from './m-account-change-password/m-account-change-password.component';
import { MAccountChangepassComponent } from './m-account-changepass/m-account-changepass.component';


@NgModule({
  imports: [
    CommonModule,
    MAccountRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [MAccountComponent
    , MAccountListComponent,
    //MAccountAddEditModalComponent,
    MAddAccountComponent,
    MAccountEditComponent,
    MAccountChangePasswordComponent,
    MAccountChangepassComponent,
  ],
  entryComponents: [
    //MAccountAddEditModalComponent,
    //MAddAccountComponent
    MAccountEditComponent,
    // MAccountChangepassComponent,
  ],
})
export class MAccountModule { }