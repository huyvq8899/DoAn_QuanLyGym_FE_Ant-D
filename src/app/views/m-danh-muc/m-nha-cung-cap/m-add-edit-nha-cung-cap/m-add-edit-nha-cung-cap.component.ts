import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/shared/shared.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-m-add-edit-nha-cung-cap',
  templateUrl: './m-add-edit-nha-cung-cap.component.html',
  styleUrls: ['./m-add-edit-nha-cung-cap.component.scss']
})
export class MAddEditNhaCungCapComponent implements OnInit {
  isAddNew: boolean;
  myFormData: any;
  stt: number;
  listOfData: any[] = [];
  myFormGroup: FormGroup;
  constructor(
   
    private fb: FormBuilder,
    private message: NzMessageService,
    private NhaCungCapService: NhaCungCapService,
    private router: Router,
    private sharedService: SharedService,
    private modal:NzModalService
  ) { }

  ngOnInit() {
    this.sharedService.currentAddNew.subscribe(isAddNew=>this.isAddNew=isAddNew)
    this.createForm();
    this.NhaCungCapService.getAll().subscribe((rs: any)=>{
      this.listOfData=rs;
    })
    if(this.isAddNew) {
      this.sharedService.emitChange({
        title: 'Thêm nhà cung cấp'
      });
    } else {
      this.sharedService.emitChange({
        title: 'Sửa nhà cung cấp'
      });
      this.sharedService.currentData.subscribe(data=>this.myFormData=data);
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
      this.myFormGroup.patchValue({
        ...this.myFormData
      });
    }
  }
  Back(){
    this.router.navigate(['m-layout/m-danh-muc/m-nha-cung-cap']);
    this.sharedService.changeStt(this.stt)
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
          
          this.message.create('success', `Thêm nhà cung cấp thành công`);
          this.Back();
          
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          
          
        }
      });
    }
    else {
      this.NhaCungCapService.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin nhà cung cấp thành công`);
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
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.NhaCungCapService.Delete(this.myFormData.nhaCungCapId).subscribe((rs: any) => {
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