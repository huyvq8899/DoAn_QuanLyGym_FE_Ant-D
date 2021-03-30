import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { KhoHangService } from 'src/app/services/kho-hang.service';

@Component({
  selector: 'app-add-edit-kho-hang-modal',
  templateUrl: './add-edit-kho-hang-modal.component.html',
  styleUrls: ['./add-edit-kho-hang-modal.component.scss']
})
export class AddEditKhoHangModalComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() myFormData: any;
  @Input() KhoHangData: any;
  @Input() listOfData: any[] = [];
  myFormGroup: FormGroup;
  nzErrorTipMaKhoHang = 'Phải nhập!';
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private khohangsv: KhoHangService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`khoHangId`).setValue(this.idNew);
    } else {
      this.myFormGroup.patchValue({
        ...this.myFormData
      });
    }
  }

  duplicateValidator = (control: FormControl): { [s: string]: boolean } => {
    const checkMaKho = this.listOfData.find(x => x.maKho == control.value);
    if (!control.value) {
      return { error: true, required: true };
    } else if (checkMaKho && this.isAddNew) {
      return { duplicate: true, error: true };
    }
    return {};
  };

  saveChanges() {
    const myFormData = this.myFormGroup.getRawValue();
    const checkMaKho = this.listOfData.find(x => x.maKho == myFormData.maKho);
    if(this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
    }
    
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.khohangsv.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          //console.log(this.myFormGroup.value);
          this.modal.destroy(rs);
          this.message.create('success', `Thêm kho hàng thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.khohangsv.Update(this.myFormGroup.getRawValue()).subscribe(
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
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      khoHangId: [0],
      maKho: [null, [this.duplicateValidator]],
      tenKho: [null, [Validators.required]]
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
