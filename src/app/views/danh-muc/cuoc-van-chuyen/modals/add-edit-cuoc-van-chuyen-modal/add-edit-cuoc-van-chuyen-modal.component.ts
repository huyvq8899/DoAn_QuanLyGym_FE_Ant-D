import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CuocVanChuyenService } from 'src/app/services/cuoc-van-chuyen.service';

@Component({
  selector: 'app-add-edit-cuoc-van-chuyen-modal',
  templateUrl: './add-edit-cuoc-van-chuyen-modal.component.html',
  styleUrls: ['./add-edit-cuoc-van-chuyen-modal.component.scss']
})
export class AddEditCuocVanChuyenModalComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() myFormData: any;
  @Input() cuocVanChuyenData: any;
  @Input() listOfData: any[] = [];
  myFormGroup: FormGroup;
  nzErrorTipMaVanChuyen = 'Phải nhập!';
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private cuocvanchuyen: CuocVanChuyenService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`cuocVanChuyenId`).setValue(this.idNew);
    } else {
      //this.myFormGroup.get(`maVanChuyen`).disable();
      this.myFormGroup.patchValue({
        ...this.myFormData
      });
    }
  }

  duplicateValidator = (control: FormControl): { [s: string]: boolean } => {
    const checkMaVanChuyen = this.listOfData.find(x => x.maVanChuyen == control.value);
    if (!control.value) {
      return { error: true, required: true };
    } else if (checkMaVanChuyen && this.isAddNew) {
      return { duplicate: true, error: true };
    }
    return {};
  };

  saveChanges() {
    const myFormData = this.myFormGroup.getRawValue();
    const checkMaVanChuyen = this.listOfData.find(x => x.maVanChuyen == myFormData.maVanChuyen);
    if(this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
    }
    
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.cuocvanchuyen.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          //console.log(this.myFormGroup.value);
          this.modal.destroy(rs);
          this.message.create('success', `Thêm cước thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.cuocvanchuyen.Update(this.myFormGroup.getRawValue()).subscribe(
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
      cuocVanChuyenId: [0],
      maVanChuyen: [null, [this.duplicateValidator]],
      tinhThanhPho: [null, [Validators.required]],
      quanHuyen: [null, [Validators.required]],
      giaCuoc: [null, [Validators.required]]
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }


}
