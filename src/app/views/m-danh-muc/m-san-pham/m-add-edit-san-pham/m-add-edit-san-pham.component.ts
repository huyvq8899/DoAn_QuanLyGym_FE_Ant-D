import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-add-edit-san-pham',
  templateUrl: './m-add-edit-san-pham.component.html',
  styleUrls: ['./m-add-edit-san-pham.component.scss']
})
export class MAddEditSanPhamComponent implements OnInit {

  stt: number;
 isAddNew: boolean;
 productData: any;
  myFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private productService: ProductService,
    private router: Router,
    private modal: NzModalService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.createForm();
    this.sharedService.currentAddNew.subscribe(isAddNew=>this.isAddNew=isAddNew)
    if(this.isAddNew) {
      this.sharedService.emitChange({
        title: 'Thêm sản phẩm'
      });
    } else {
      this.sharedService.emitChange({
        title: 'Sửa sản phẩm'
      });
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
      this.sharedService.currentData.subscribe(data=>this.productData=data);
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
     

          this.message.create('success', `Thêm thành công`);
          this.Back();
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);

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
            this.Back();
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
           
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }
  Back(){
    this.router.navigate(['m-layout/m-danh-muc/m-san-pham']);
    this.sharedService.sendData(this.stt)
  }


  createForm() {
    this.myFormGroup = this.fb.group({
      productId: [0],
      productCode: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      retailPrice: [0, [Validators.required]]

    });
  }

  removeItem() {
    this.modal.confirm({
      nzTitle: "Bạn có chắc chắn muốn xóa không?",
      nzContent:
        '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: "Yes",
      nzOkType: "danger",
      nzOnOk: () => {
        this.productService.deleteProduct(this.productData.productId).subscribe(
          (rs: any) => {
            if (rs === -1) {
              this.message.error("Dữ liệu đang được sử dụng, không thể xóa");
              return;
            }
            if (rs > 0) {
              this.message.success("Xóa thành công");
              this.Back();
            } else {
              this.message.error("Lỗi xóa dữ liệu");
            }
          },
          (_) => {
            this.message.error("Error delete");
            console.log("Error delete");
          }
        );
      },
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel"),
    });
  }
   
}
