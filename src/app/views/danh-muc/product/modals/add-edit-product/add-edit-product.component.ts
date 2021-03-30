import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ValidatorsDupcateMaKhachHang, ValidatorsDupcateProductCode } from 'src/app/customValidators/validatorsDupcateName';
import { ProductService } from './../../../../../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() productData: any;
  myFormGroup: FormGroup;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private productService: ProductService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`productId`).setValue(this.idNew);
    } else {
      
      this.myFormGroup.patchValue({
        ...this.productData
      });
    }
  }

  saveChanges() {
    if(this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
    }
    // console.log('submitted');
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.productService.postProduct(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          console.log(this.myFormGroup.value);
          this.modal.destroy(rs);
          this.message.create('success', `Thêm thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.productService.putProduct(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin thành công`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modal.destroy(result);
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }


  createForm() {
    this.myFormGroup = this.fb.group({
      productId: [0],
      productCode: [null, [Validators.required],[ValidatorsDupcateProductCode(this.productService,"")]],
      productName: [null, [Validators.required]],
      retailPrice: [0, [Validators.required]]

    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
   
}
