import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CuocVanChuyenService } from 'src/app/services/cuoc-van-chuyen.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Thickness } from '@syncfusion/ej2-charts';

@Component({
  selector: 'app-m-add-edit-cuoc-van-chuyen',
  templateUrl: './m-add-edit-cuoc-van-chuyen.component.html',
  styleUrls: ['./m-add-edit-cuoc-van-chuyen.component.scss']
})
export class MAddEditCuocVanChuyenComponent implements OnInit {

   isAddNew: boolean;
   stt: number
   myFormData: any;
   listOfData: any[] = [];
  myFormGroup: FormGroup;
  nzErrorTipMaVanChuyen = 'Phải nhập!';
  constructor(

    private fb: FormBuilder,
    private message: NzMessageService,
    private cuocvanchuyen: CuocVanChuyenService,
    private router: Router,
    private modal: NzModalService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.currentAddNew.subscribe(isAddNew=>this.isAddNew=isAddNew)
    this.createForm();
    this.cuocvanchuyen.getAll().subscribe((rs: any)=>{
      this.listOfData=rs;
    })
    if(this.isAddNew) {
      this.sharedService.emitChange({
        title: 'Thêm cước vận chuyển'
      });
    } else {
      this.sharedService.emitChange({
        title: 'Sửa nhà cung cấp'
      });
      this.sharedService.currentData.subscribe(data=>this.myFormData=data);
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
      //this.myFormGroup.get(`maVanChuyen`).disable();
      this.myFormGroup.patchValue({
        ...this.myFormData
      });
    }
  }
  Back(){
    this.router.navigate(['m-layout/m-danh-muc/m-cuoc-van-chuyen']);
    this.sharedService.sendData(this.stt)
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
          
          this.message.create('success', `Thêm cước thành công`);
          this.Back();
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
         
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
      cuocVanChuyenId: [0],
      maVanChuyen: [null, [this.duplicateValidator]],
      tinhThanhPho: [null, [Validators.required]],
      quanHuyen: [null, [Validators.required]],
      giaCuoc: [null, [Validators.required]]
    });
  }
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.cuocvanchuyen.Delete(this.myFormData.cuocVanChuyenId).subscribe((rs: any) => {
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
