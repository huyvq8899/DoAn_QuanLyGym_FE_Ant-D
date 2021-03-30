import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProductComponent } from './modals/add-edit-product/add-edit-product.component';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/shared.module';
import { ProductroutingModule } from './product-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductroutingModule
  ],
  declarations: [ProductComponent,AddEditProductComponent]
})
export class ProductModule { }
