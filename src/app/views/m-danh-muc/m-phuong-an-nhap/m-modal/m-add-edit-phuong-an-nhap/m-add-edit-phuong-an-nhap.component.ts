import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PhuongAnNhapService } from 'src/app/services/phuong-an-nhap.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-add-edit-phuong-an-nhap',
  templateUrl: './m-add-edit-phuong-an-nhap.component.html',
  styleUrls: ['./m-add-edit-phuong-an-nhap.component.scss']
})
export class MAddEditPhuongAnNhapComponent implements OnInit {
  @Input() idNew: any;
  stt: number;
  isAddNew: boolean;
  phuongAnNhapData: any;
  myFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private PhuongAnNhapService: PhuongAnNhapService,
    private router: Router,
    private sharedService: SharedService,
    private modal:NzModalService
  ) { }

  ngOnInit() {
    this.sharedService.currentAddNew.subscribe(isAddNew => this.isAddNew = isAddNew);
    if (this.isAddNew)
      this.sharedService.emitChange({
        title: 'Thêm mới phương án nhập',
      });
    else
      this.sharedService.emitChange({
        title: 'Cập nhật phương án nhập'
      });
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
    this.createForm();
    if (this.isAddNew) {
      this.myFormGroup.get(`phuongAnNhapId`).setValue(this.idNew);
    } else {
      this.sharedService.currentData.subscribe(data => this.phuongAnNhapData = data);
      this.myFormGroup.patchValue({
        ...this.phuongAnNhapData
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
      this.PhuongAnNhapService.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.message.create('success', `Thêm phương án thành công`);
          this.router.navigate(['m-layout/m-danh-muc/m-phuong-an-nhap']);
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm phương án không thành công`);
          // console.log(rs);
        }
      });
    }
    else {
      this.PhuongAnNhapService.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            this.message.create('success', `Cập nhật phương án thành công`);
            this.router.navigate(['m-layout/m-danh-muc/m-phuong-an-nhap']);

          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
          }
        }
      );
    }
  }


  createForm() {
    this.myFormGroup = this.fb.group({
      phuongAnNhapId: [0],
      tenPhuongAn: [null],
    });
  }

  BackPages() {
    this.router.navigate(['m-layout/m-danh-muc/m-phuong-an-nhap']);
    this.sharedService.sendData(this.stt)
  }
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.PhuongAnNhapService.Delete(this.phuongAnNhapData.phuongAnNhapId).subscribe((rs: any) => {
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