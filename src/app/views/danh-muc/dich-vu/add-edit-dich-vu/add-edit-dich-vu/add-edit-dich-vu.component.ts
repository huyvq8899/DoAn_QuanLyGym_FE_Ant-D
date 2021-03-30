import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DichVuService } from 'src/app/services/dich-vu.service';

@Component({
  selector: 'app-add-edit-dich-vu',
  templateUrl: './add-edit-dich-vu.component.html',
  styleUrls: ['./add-edit-dich-vu.component.scss']
})
export class AddEditDichVuComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() ServiceData: any;
  myFormGroup: FormGroup;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private serviceG: DichVuService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`id`).setValue(this.idNew);
    } else {
      
      this.myFormGroup.patchValue({
        ...this.ServiceData
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
      this.serviceG.postService(this.myFormGroup.value).subscribe((rs: any) => {
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
      this.serviceG.putService(this.myFormGroup.getRawValue()).subscribe(
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
      id: [0],
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      money: [null, [Validators.required]],
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
