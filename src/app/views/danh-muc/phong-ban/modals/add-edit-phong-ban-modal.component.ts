import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PhongBanService } from 'src/app/services/phong-ban.service';

@Component({
  selector: 'app-add-phong-ban-modal',
  templateUrl: './add-edit-phong-ban-modal.html',
  styleUrls: ['./add-edit-phong-ban-modal.scss']
})
export class AddEditPhongBanModalComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() phongBanData: any;
  myFormGroup: FormGroup;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private phongban: PhongBanService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`phongBanPhongId`).setValue(this.idNew);
    } else {
      
      this.myFormGroup.patchValue({
        ...this.phongBanData
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
      this.phongban.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          //console.log(this.myFormGroup.value);
          this.modal.destroy(rs);
          this.message.create('success', `Thêm phòng ban thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.phongban.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin phòng ban thành công`);
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
      phongBanPhongId: [0],
      phongName: [null, [Validators.required]]

    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}

