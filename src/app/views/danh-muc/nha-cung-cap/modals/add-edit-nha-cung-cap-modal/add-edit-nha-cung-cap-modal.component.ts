import { NhaCungCapService } from '../../../../../services/nha-cung-cap.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-edit-nha-cung-cap-modal',
  templateUrl: './add-edit-nha-cung-cap-modal.component.html',
  styleUrls: ['./add-edit-nha-cung-cap-modal.component.scss']
})
export class AddEditNhaCungCapModalComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() myFormData: any;
  @Input() listOfData: any[] = [];
  myFormGroup: FormGroup;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private NhaCungCapService: NhaCungCapService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`nhaCungCapId`).setValue(this.idNew);
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
    const checkMaKho = this.listOfData.find(x => x.maNhaCungCap == myFormData.maNhaCungCap);
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
      this.NhaCungCapService.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modal.destroy(rs);
          this.message.create('success', `Th??m nh?? cung c???p th??nh c??ng`);

          console.log(rs);
        } else {
          this.message.create('error', `Th??m th??ng tin kh??ng th??nh c??ng`);
          this.modal.destroy(rs);
          console.log(rs);
        }
      });
    }
    else {
      this.NhaCungCapService.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `C???p nh???t th??ng tin nh?? cung c???p th??nh c??ng`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `S???a th??ng tin kh??ng th??nh c??ng`);
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
      nhaCungCapId: [0],
      maNhaCungCap: [null, [this.duplicateValidator]],
      tenNhaCungCap: [null, [Validators.required]],
      maSoThueNhaCungCap:[null],
      diaChiDKKD:[null],
      diaChiPhongGiaoDich:[null],
      emailNhaCungCap:[null],
      soDienThoaiNGuoiDaiDienPhapLuat:[null],
      soDienThoaiKeToan:[null],
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}