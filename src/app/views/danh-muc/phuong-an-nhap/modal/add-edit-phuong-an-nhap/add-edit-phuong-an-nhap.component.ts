import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PhuongAnNhapService } from 'src/app/services/phuong-an-nhap.service';

@Component({
  selector: 'app-add-edit-phuong-an-nhap',
  templateUrl: './add-edit-phuong-an-nhap.component.html',
  styleUrls: ['./add-edit-phuong-an-nhap.component.scss']
})
export class AddEditPhuongAnNhapComponent implements OnInit {

  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() phuongAnNhapData: any;
  myFormGroup: FormGroup;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private PhuongAnNhapService: PhuongAnNhapService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`phuongAnNhapId`).setValue(this.idNew);
    } else {
      this.myFormGroup.patchValue({
        ...this.phuongAnNhapData
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
      this.PhuongAnNhapService.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modal.destroy(rs);
          this.message.create('success', `Thêm phương án thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm phương án không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.PhuongAnNhapService.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật phương án thành công`);
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
      phuongAnNhapId: [0],
      tenPhuongAn:[null],
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}