import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChenhLechService } from 'src/app/services/chenh-lech.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-add-edit-m-chenh-lech',
  templateUrl: './add-edit-m-chenh-lech.component.html',
  styleUrls: ['./add-edit-m-chenh-lech.component.scss']
})
export class AddEditMChenhLechComponent implements OnInit {


  isAddNew: boolean;
  stt: number
  chenhLechData: any;
  myFormGroup: FormGroup;
  constructor(

    private fb: FormBuilder,
    private message: NzMessageService,
    private chenhlech: ChenhLechService,
    private router: Router,
    private sharedService :SharedService,
    private modal:NzModalService
  ) { }

  ngOnInit() {
    this.createForm();
    this.sharedService.currentAddNew.subscribe(isAddNew=>this.isAddNew=isAddNew)
    if(this.isAddNew) {
      this.sharedService.emitChange({
        title: 'Thêm chênh lệch'
      });
    } else {
      this.sharedService.emitChange({
        title: 'Sửa chênh lệch'
      });
      this.sharedService.currentData.subscribe(data=>this.chenhLechData=data);
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
      this.myFormGroup.patchValue({
        ...this.chenhLechData
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
      this.chenhlech.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {

          this.message.create('success', `Thêm chênh lệch thành công`);
          this.Back();
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);

          // console.log(rs);
        }
      });
    }
    else {
      this.chenhlech.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin chênh lệch thành công`);
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
    this.router.navigate(['m-layout/m-danh-muc/m-chenh-lech']);
    this.sharedService.sendData(this.stt)
  }


  createForm() {
    this.myFormGroup = this.fb.group({
      chenhLechId: [0],
      tenChenhLech: [null, [Validators.required]],
      soChenhLech: [0, [Validators.required]]
    });
  }
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.chenhlech.Delete(this.chenhLechData.chenhLechId).subscribe((rs: any) => {
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
}

