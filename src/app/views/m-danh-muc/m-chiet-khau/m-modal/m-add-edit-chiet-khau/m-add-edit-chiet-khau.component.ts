import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChietKhauService } from 'src/app/services/chiet-khau.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-add-edit-chiet-khau',
  templateUrl: './m-add-edit-chiet-khau.component.html',
  styleUrls: ['./m-add-edit-chiet-khau.component.scss']
})
export class MAddEditChietKhauComponent implements OnInit {
  @Input() idNew: any;
  stt: number
  isAddNew: boolean;
  chietKhauData: any;
  myFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private chietkhau: ChietKhauService,
    private router: Router,
    private sharedService: SharedService,
    private modal:NzModalService
  ) { }

  ngOnInit() {
    this.sharedService.currentAddNew.subscribe(isAddNew => this.isAddNew = isAddNew);
    if (this.isAddNew)
      this.sharedService.emitChange({
        title: 'Thêm mới chiết khấu'
      });
    else
      this.sharedService.emitChange({
        title: 'Cập nhật chiết khấu'
      });
    this.createForm();
    if (this.isAddNew) {
      this.myFormGroup.get(`id`).setValue(this.idNew);
    } else {
      this.sharedService.currentData.subscribe(data => this.chietKhauData = data)
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
      this.myFormGroup.patchValue({
        ...this.chietKhauData
      });
    }
  }

  saveChanges() {
    if (this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
    }
    // console.log('submitted');
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.chietkhau.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.message.create('success', `Thêm chiết khấu thành công`);
          this.router.navigate(['m-layout/m-danh-muc/m-chiet-khau']);
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          // console.log(rs);
        }
      });
    }
    else {
      this.chietkhau.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin chiết khấu thành công`);
            this.BackPages();
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
          }
        }
      );
    }
  }
  createForm() {
    this.myFormGroup = this.fb.group({
      id: [0],
      vungChietKhau: [null, [Validators.required]],
      chietKhau: [0, [Validators.required]]
    });
  }

  BackPages() {
    this.router.navigate(['m-layout/m-danh-muc/m-chiet-khau']);
    this.sharedService.sendData(this.stt)
  }
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.chietkhau.Delete(this.chietKhauData.id).subscribe((rs: any) => {
          if (rs === -1) {
            this.message.error('Dữ liệu đang được sử dụng, không thể xóa');
            return;
          }
          if (rs > 0) {
            this.message.success('Xóa thành công');
            this.BackPages();
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