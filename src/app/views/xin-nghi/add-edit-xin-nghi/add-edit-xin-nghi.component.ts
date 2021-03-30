import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {XinNghiService} from 'src/app/services/xin-nghi.service'
@Component({
  selector: 'app-add-edit-xin-nghi',
  templateUrl: './add-edit-xin-nghi.component.html',
  styleUrls: ['./add-edit-xin-nghi.component.scss']
})
export class AddEditXinNghiComponent implements OnInit {
  @Input() isAddNew: boolean;
  @Input() data: any;
  roleId:any;
  myFormGroup: FormGroup;
  deXuats=[
    {
      ma:'1',
      loai:'Đi muộn'
    },
    {
      ma:'2',
      loai:'Nghỉ phép'
    }
  ];
  Duyets=[
    {
      ma:'1',
      loai:'Duyệt'
    },
    {
      ma:'2',
      loai:'Không duyệt'
    }
  ]
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private XinNghiService: XinNghiService,

  ) { }
    
  ngOnInit() {
    this.createForm();
    this.myFormGroup.get('tenNguoiNghi').disable();
    this.myFormGroup.get('thoiGianDiMuon').disable();
    this.myFormGroup.get('ngayDiMuon').disable();
    this.myFormGroup.get('ngayNghi').disable();
    this.myFormGroup.get('ngayDiLam').disable();
    this.myFormGroup.get('soNgayNghiPhep').disable();
    this.myFormGroup.get('isDuyet').disable();
    this.myFormGroup.get('lyDoTuChoi').disable();
    this.roleId=localStorage.getItem('roleId');

    if(this.isAddNew) {
    
    } else {
      this.myFormGroup.patchValue({
        ...this.data
      });
      this.myFormGroup.get('deXuat').disable();
      this.myFormGroup.get('lyDo').disable();
      if(this.roleId=="BLD"){
        this.myFormGroup.get('isDuyet').enable();
        this.myFormGroup.get('lyDoTuChoi').disable();
        if(this.data.isDuyet=='1'){
          this.myFormGroup.get('lyDoTuChoi').disable();
        }
        if(this.data.isDuyet=='2'){
          this.myFormGroup.get('lyDoTuChoi').enable();
        }
      }
    }

  }
  changeDeXuat(event){
    if(event=='1'){
      this.myFormGroup.get('thoiGianDiMuon').enable();
      this.myFormGroup.get('ngayDiMuon').enable();
      this.myFormGroup.get('ngayNghi').disable();
      this.myFormGroup.get('ngayDiLam').disable();
      this.myFormGroup.get('soNgayNghiPhep').disable();
    }
    else{
      this.myFormGroup.get('thoiGianDiMuon').disable();
      this.myFormGroup.get('ngayDiMuon').disable();
      this.myFormGroup.get('ngayNghi').enable();
      this.myFormGroup.get('ngayDiLam').enable();
      this.myFormGroup.get('soNgayNghiPhep').enable();
    }
    
  }
  changeDuyet(event){
    if(event=='1'){
      this.myFormGroup.get('lyDoTuChoi').disable();
    }
    else{
      this.myFormGroup.get('lyDoTuChoi').enable();
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
      
      this.XinNghiService.Insert(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modelRef.destroy(rs);
          this.message.create('success', `thêm đơn xin nghỉ thành công`);
          
          // console.log(rs);
        } else {
          this.message.create('error', ` không thành công`);
          this.modelRef.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.XinNghiService.Update(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thành công`);
            this.modelRef.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modelRef.destroy(result);
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }

  createForm() {
    if(this.isAddNew){
    this.myFormGroup = this.fb.group({
      xinNghiId: [null],
      createdBy: [null],
      createdDate:[moment().format('YYYY-MM-DD')],
      tenNguoiNghi:[JSON.parse(localStorage.getItem('currentUser')).fullName],
      deXuat: [null, [Validators.required]],
      thoiGianDiMuon:  [null, [Validators.required]],
      lyDo: [null, [Validators.required]],
      lyDoTuChoi: [null],
      ngayDiLam:  [null, [Validators.required]],
      ngayNghi:  [null, [Validators.required]],
      soNgayNghiPhep:  [null, [Validators.required]],
      ngayDiMuon:  [null, [Validators.required]],
      isDuyet:[null],
    });
  }else{
    this.myFormGroup = this.fb.group({
      xinNghiId: [null],
      createdBy: [null],
      createdDate:[null],
      tenNguoiNghi:[null],
      deXuat: [null, [Validators.required]],
      thoiGianDiMuon: [null],
      lyDo: [null, [Validators.required]],
      lyDoTuChoi: [null],
      ngayDiLam: [null],
      ngayNghi: [null],
      soNgayNghiPhep: [null],
      ngayDiMuon: [null],   
      isDuyet:[null],
    });
  }
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
