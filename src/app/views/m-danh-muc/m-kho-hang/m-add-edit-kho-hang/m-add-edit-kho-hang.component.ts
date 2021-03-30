import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { KhoHangService } from 'src/app/services/kho-hang.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-add-edit-kho-hang',
  templateUrl: './m-add-edit-kho-hang.component.html',
  styleUrls: ['./m-add-edit-kho-hang.component.scss']
})
export class MAddEditKhoHangComponent implements OnInit {

  stt:number;
  isAddNew: boolean;
  myFormData: any;
  listOfData: any[] = [];
  myFormGroup: FormGroup;
  nzErrorTipMaKhoHang = 'Phải nhập!';
  constructor(

    private fb: FormBuilder,
    private message: NzMessageService,
    private khohangsv: KhoHangService,
    private router: Router,
    private sharedService: SharedService,
    private modal:NzModalService

  ) { }

  ngOnInit() {
    this.createForm();
    this.khohangsv.currentData.subscribe(data=>this.listOfData=data)
    this.sharedService.currentAddNew.subscribe(isAddNew=>this.isAddNew=isAddNew)
    if(this.isAddNew) {
      this.sharedService.emitChange({
        title: 'Thêm kho hàng'
      });
    } else {
      this.sharedService.emitChange({
        title: 'Sửa kho hàng'
      });
      this.sharedService.currentData.subscribe(data=>this.myFormData=data);
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
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
  Back(){
    this.router.navigate(['m-layout/m-danh-muc/m-kho-hang']);
    this.sharedService.sendData(this.stt)
  }
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
          this.Back();
          this.message.create('success', `Thêm kho hàng thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);

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
            this.Back();
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);

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
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.khohangsv.Delete(this.myFormData.khoHangId).subscribe((rs: any) => {
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
