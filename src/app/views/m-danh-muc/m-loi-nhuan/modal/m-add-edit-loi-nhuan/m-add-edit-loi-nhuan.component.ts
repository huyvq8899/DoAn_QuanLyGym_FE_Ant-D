import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { LoiNhuanService } from 'src/app/services/loi-nhuan.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-add-edit-loi-nhuan',
  templateUrl: './m-add-edit-loi-nhuan.component.html',
  styleUrls: ['./m-add-edit-loi-nhuan.component.scss']
})
export class MAddEditLoiNhuanComponent implements OnInit {
  stt: number;
  isAddNew: boolean=false;
  loiNhuanData: any;
  myFormGroup: FormGroup;
  constructor(
    private sharedService :SharedService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private loinhuan: LoiNhuanService,
    private router: Router,
    private modal:NzModalService

  ) { }

  ngOnInit() {

    this.createForm();
    this.loinhuan.currentAddNew.subscribe(isAddNew=>this.isAddNew=isAddNew)
    console.log(this.isAddNew)
    if(this.isAddNew) {

      this.sharedService.emitChange({
        title: 'Thêm lợi nhuận'
      });
    } else {
      this.sharedService.emitChange({
        title: 'Sửa lợi nhuận'
      });
      this.loinhuan.currentData.subscribe(data=>this.loiNhuanData=data);
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
      this.myFormGroup.patchValue({
        ...this.loiNhuanData
      });
    }

  }
  Back(){
    this.router.navigate(['m-layout/m-danh-muc/m-loi-nhuan']);
    this.sharedService.changeStt(this.stt)
  }
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.loinhuan.Delete(this.loiNhuanData.loiNhuanId).subscribe((rs: any) => {
          if (rs === -1) {
            this.message.error('Dữ liệu đang được sử dụng, không thể xóa');
            return;
          }
          if (rs > 0) {
            this.message.success('Xóa thành công');
            this.Back();
          } else {
            this.message.error('Lỗi xóa dữ liệu');
          }
        }, _ => {
          this.message.error('Error delete');
          console.log('Error delete');
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
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
      this.loinhuan.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {

          this.message.create('success', `Thêm lợi nhuận thành công`);
          this.router.navigate(['m-layout/m-danh-muc/m-loi-nhuan']);
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);

          // console.log(rs);
        }
      });
    }
    else {
      this.loinhuan.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin lợi nhuận thành công`);
            this.router.navigate(['m-layout/m-danh-muc/m-loi-nhuan']);
            
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


  createForm() {
    this.myFormGroup = this.fb.group({
      loiNhuanId: [0],
      tenLoiNhuan: [null, [Validators.required]],
      mucLoiNhuan: [0, [Validators.required]]
    });
  }


}


