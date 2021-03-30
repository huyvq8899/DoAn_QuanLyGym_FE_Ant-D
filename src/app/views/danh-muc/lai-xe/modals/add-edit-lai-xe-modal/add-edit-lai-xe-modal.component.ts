import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {LaiXeService} from 'src/app/services/lai-xe.service ';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchEngine } from 'src/app/shared/searchEngine';
import {UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-edit-lai-xe-modal',
  templateUrl: './add-edit-lai-xe-modal.component.html',
  styleUrls: ['./add-edit-lai-xe-modal.component.scss']
})
export class AddEditLaiXeModalComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() myFormData: any;
  @Input() listOfData: any[] = [];
  listUser:any[]=[];
  searchCustomerOverlayStyle = {
    width: "420px",
  };
  myFormGroup: FormGroup;
  khoangHam: any [];
  checked: false;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private LaiXeService : LaiXeService,
    private message : NzMessageService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userService.getAllLaiXe().subscribe((rs: any)=>{
      this.listUser=rs;
    })
    if (this.isAddNew) {
      this.myFormGroup.get(`xeId`).setValue(this.idNew);
    } else {
      console.log(this.myFormData);
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
          this.modelRef.destroy(rs);
          this.message.create('success', `Thêm lái xe thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modelRef.destroy(rs);
          // console.log(rs);
        }
      })
    }
    else{
      this.LaiXeService.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin thành công`);
            this.modelRef.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modelRef.destroy(result);
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

  closeModal() {
    this.modelRef.destroy(null);
  }
  searchUser(event){
    const arrCondition = ["userName", "fullName", "title"];
    this.listUser = SearchEngine(this.listUser, arrCondition, event);
  }
  changeuser(event){
    const data = this.listUser.find(x => x.userId === event);
    this.myFormGroup.get('tenLaiXe').setValue(data.fullName);
  }
}
