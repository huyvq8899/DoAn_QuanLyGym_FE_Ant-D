import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {LaiXeService} from 'src/app/services/lai-xe.service ';
import { SharedService } from 'src/app/shared/shared.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import {UserService } from 'src/app/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-m-add-edit-lai-xe',
  templateUrl: './m-add-edit-lai-xe.component.html',
  styleUrls: ['./m-add-edit-lai-xe.component.scss']
})
export class MAddEditLaiXeComponent implements OnInit {
  stt: number;
  @Input() idNew: any;
  isAddNew: boolean;
  myFormData: any;
  myFormGroup: FormGroup;
  listOfData: any[] = [];
  listUser:any[]=[];
  searchCustomerOverlayStyle = {
    width: "420px",
  };
  khoangHam: any [];
  checked: false;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private LaiXeService : LaiXeService,
    private router: Router,
    private sharedService: SharedService,
    private userService:UserService,
    private modal:NzModalService
  ) { }

  ngOnInit() {
    this.sharedService.currentAddNew.subscribe(isAddNew => this.isAddNew = isAddNew);
    if (this.isAddNew)
      this.sharedService.emitChange({
        title: 'Thêm mới lái xe'
      });
    else
      this.sharedService.emitChange({
        title: 'Cập nhật lái xe'
      });
    this.createForm();
    this.userService.getAllLaiXe().subscribe((rs: any)=>{
      this.listUser=rs;
    })
    if (this.isAddNew) {
      this.myFormGroup.get(`xeId`).setValue(this.idNew);
    } else {
      this.sharedService.currentData.subscribe(data => this.myFormData = data)
      this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
      this.myFormGroup.patchValue({
        ...this.myFormData,
        chiTietKhoangHam: []
      });
      this.checked=this.myFormGroup.get(`laiXeNgoai`).value
      this.khoangHam = JSON.parse(this.myFormGroup.get(`dt`).value) ;
      // console.log(this.khoangHam);
      const chiTietKhoangHam = this.myFormGroup.get(`chiTietKhoangHam`) as FormArray;
      chiTietKhoangHam.clear();
      this.khoangHam.forEach(element => {
        const formGourp = this.createFormChiTietKhoangHam();
        formGourp.patchValue({
          ...element
        });
        chiTietKhoangHam.push(formGourp);
      });
    }
  }
  duplicateValidator = (control: FormControl): { [s: string]: boolean } => {
    const checkDuplicate = this.listOfData.find(x => x.bienKiemSoat == control.value);
    if (!control.value) {
      return { error: true, required: true };
    } else if (checkDuplicate && this.isAddNew) {
      return { duplicate: true, error: true };
    }
    return {};
  };

  saveChanges() {
    const myFormData = this.myFormGroup.getRawValue();
    if (this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }

      for (const i in this.myFormGroup.get('chiTietKhoangHam').value) {
        this.myFormGroup.get(`chiTietKhoangHam.${i}.dungTich`).markAsDirty();
        this.myFormGroup.get(`chiTietKhoangHam.${i}.dungTich`).updateValueAndValidity();
      }
      return;
    }
    var dungTich = "[" ;
    var tg=1;
    for (const i in this.myFormGroup.get('chiTietKhoangHam').value) {
      //dungTich += this.myFormGroup.get(`chiTietKhoangHam.${i}.dungTich`).value + ";"
      dungTich +='{"id":'+tg+',"dungTich":'+ this.myFormGroup.get(`chiTietKhoangHam.${i}.dungTich`).value+'}'+",";
      tg=tg+1;
    }
    dungTich=dungTich.substring(0, dungTich.length - 1);
    dungTich+="]";
    this.myFormGroup.get(`dt`).setValue(dungTich);
    if(this.isAddNew){
      this.LaiXeService.Insert(this.myFormGroup.value).subscribe((rs:any)=>{
        if (rs === 1) {
          this.message.create('success', `Thêm lái xe thành công`);
          this.router.navigate(['m-layout/m-danh-muc/m-lai-xe']);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
        }
      })
    }
    else{
      this.LaiXeService.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            this.message.create('success', `Cập nhật thông tin thành công`);
            this.router.navigate(['m-layout/m-danh-muc/m-lai-xe']);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
          }
        }
      );
    }

   
  }
  createForm() {
    this.myFormGroup = this.fb.group({
      xeId: [0],
      tenGoi: [null, [Validators.required]],
      bienKiemSoat: [null, [this.duplicateValidator]],
      cmt: [null, [Validators.required]],
      soDienThoai: [null, [Validators.required]],
      tongDungTich: [0, [Validators.required]],
      dt:[null],
      userId:[null, [Validators.required]],
      laiXeNgoai:[null, [Validators.required]],
      tenLaiXe:[null],
      chiTietKhoangHam: this.fb.array([this.createFormChiTietKhoangHam()])
    });
  }
  addItemChiTietKhoangHams() {
    const chiTietKhoangHam = this.myFormGroup.get(`chiTietKhoangHam`) as FormArray;
    chiTietKhoangHam.push(this.createFormChiTietKhoangHam());
  }

  removeItemChiTietKhoangHams(index) {
    const chiTietKhoangHam = this.myFormGroup.get(`chiTietKhoangHam`) as FormArray;
    chiTietKhoangHam.removeAt(index);
  }

  createFormChiTietKhoangHam() {
    return this.fb.group({
      dungTich: [null, [Validators.required]],
    });
  }

  inputDungTich() {
    const data = this.myFormGroup.getRawValue();
    let sumDungTich = data.chiTietKhoangHam.reduce((a, b) => a + b.dungTich, 0);
    this.myFormGroup.patchValue({
      tongDungTich: sumDungTich
    });
  }
  searchUser(event){
    const arrCondition = ["userName", "fullName", "title"];
    this.listUser = SearchEngine(this.listUser, arrCondition, event);
  }
  changeuser(event){
    const data = this.listUser.find(x => x.userId === event);
    this.myFormGroup.get('tenLaiXe').setValue(data.fullName);
  }

  BackPages() {
    this.router.navigate(['m-layout/m-danh-muc/m-lai-xe']);
    this.sharedService.changeStt(this.stt)
  }
  removeItem() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.LaiXeService.Delete(this.myFormData.xeId).subscribe((rs: any) => {
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