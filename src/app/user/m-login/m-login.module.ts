import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MLoginRoutingModule } from './m-login-routing.module';

import { MLoginComponent } from './m-login.component';
import { SharedModule } from 'src/app/shared.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    CommonModule,
    MLoginRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgZorroAntdMobileModule
  ],
  declarations: [MLoginComponent],
  schemas: [
    
  ]
})
export class MLoginModule { }
