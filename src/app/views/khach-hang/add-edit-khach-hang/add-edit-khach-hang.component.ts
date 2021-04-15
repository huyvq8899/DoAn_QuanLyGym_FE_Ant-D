import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { Router } from '@angular/router';
import { VungService } from 'src/app/services/vung.service';
import { SearchEngine } from "src/app/shared/searchEngine";
import {NganhNgheService} from 'src/app/services/nganh-nghe.service'
import {PhuongAnNhapService} from 'src/app/services/phuong-an-nhap.service'
import { ValidatorsDupcateMaKhachHang } from "src/app/customValidators/validatorsDupcateName";
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddEditVungComponent } from 'src/app/views/danh-muc/vung/modal/add-edit-vung/add-edit-vung.component';
import { AddEditPhuongAnNhapComponent } from 'src/app/views/danh-muc/phuong-an-nhap/modal/add-edit-phuong-an-nhap/add-edit-phuong-an-nhap.component';
import { AddEditNganhNgheComponent } from 'src/app/views/danh-muc/nganh-nghe/modal/add-edit-nganh-nghe/add-edit-nganh-nghe.component'
import { PagingParams } from 'src/app/models/PagingParams';
import { UserService } from 'src/app/services/user.service';
import { JobService } from 'src/app/services/job.service';
import { AddEditJobComponent } from '../../danh-muc/job/add-edit-job/add-edit-job/add-edit-job.component';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
  
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];
@Component({
  selector: 'app-add-edit-khach-hang',
  templateUrl: './add-edit-khach-hang.component.html',
  styleUrls: ['./add-edit-khach-hang.component.scss']
})
export class AddEditKhachHangModalComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() khachHangData: any;
  stt:any;
  listJob:any[]=[];
  listJobTmp:any[]=[];
  listVung:any[]=[];
  listVungTmp:any[]=[];
  listNganh:any[]=[];
  listNganhTmp:any[]=[];
  myFormGroup: FormGroup;
  selectedloaiKhachHang:any;
  selectedId:any;
  loaiTinhTrang=[
    {
      ma:1,
      loai:'Sức khỏe tốt',
      children: [
        {
          loai: 'nanjing',
          label: 'Nanjing',
        }]
    },
    {
      ma:2,
      loai:'Sức khỏe bình thường'
    }
    ,
    {
      ma:3,
      loai:'Có các vấn đề về sức khỏe cầ lưu ý'
    }
  ]
  
  
  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 20,
    Keyword: '',
    SortKey: '',
    SortValue: '',
    fromDate: "",
    toDate: "",
    KeywordCol: "",
    ColName: "",
  };
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private khachhang: KhachHangService,
    private router: Router,
    private modal: NzModalRef,
    private modalz :NzModalService,
    private jobService:JobService,
    
  ) { }
  onJobChange(event){
    const job = this.listJob.find(x => x.id === event);
//console.log(khachHang);
  if (this.myFormGroup.dirty) {
    this.myFormGroup.patchValue({
      placeWork:job.placeWork
    });
  }
}
  ngOnInit() {
      this.selectedId=localStorage.getItem('userId');;
    this.createForm();
    this.jobService.getAllJob().subscribe((rs:any)=>{
      this.listJob=rs;
      this.listJobTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('cardTypeId').setValue(rs[0].cardTypeId);
      //   this.myFormGroup.get('maKhachHang').setValue(rs[0].macardType);
      // }
    })
    if(this.isAddNew) {
      this.myFormGroup.get(`id`).setValue(this.idNew);
    } else {
      this.myFormGroup.patchValue({
        tenNganhNghe:this.khachHangData.tenNganhNghe,
        tenVung:this.khachHangData.tenVung,
        ...this.khachHangData
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
      console.log('api insert');
      
      this.khachhang.Insert(1,this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modal.destroy(rs);
          this.message.create('success', `Thêm khách hàng thành công`);
          
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.khachhang.Update(1,this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin khách hàng thành công`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modal.destroy(result);
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }
  addJob() {
    const modal = this.modalz.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditJobComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '30%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listJob.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }
  searchJob(event){
    const arrCondition = ["placeWork"];
    this.listJob = SearchEngine(this.listJobTmp, arrCondition, event);
  }
  createForm() {
    if(this.isAddNew){
    this.myFormGroup = this.fb.group({
      id: [0],
      customerName: [null, [Validators.required]],
      customerCode: [
        "MKH00",[Validators.required],[ValidatorsDupcateMaKhachHang(this.khachhang,""),],
      ],
      address: [",Tứ Kỳ, Hải Dương", [Validators.required]],
      doB:["08/04/2000"],
      jobId:[null],
      numberPhone: [null],
      note:[null],
      height:[150],
      weight:[50],
      healthStatus: [0],
      email: ["@gmail.com"],
      createdBy:this.selectedId,
    });
  }else{
    this.myFormGroup = this.fb.group({
        id: [0],
        customerName: [null, [Validators.required]],
        customerCode: [
          null,[Validators.required],  [
            ValidatorsDupcateMaKhachHang(
              this.khachhang,
              this.khachHangData.customerCode
            ),
          ],,
        ],
        address: [null, [Validators.required]],
        doB:["08/08/1999"],
        jobId:[null],
        numberPhone: [null],
        note:[null],
        height:[null],
        weight:[null],
        healthStatus: [0],
        email: [null],
      ModifiedBy:this.selectedId
    });
  }
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
  nzOptions: NzCascaderOption[] = options;

  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];
  /* // or like this:
  values: any[] = [{
    value: 'zhejiang',
    label: 'Zhejiang'
  }, {
    value: 'hangzhou',
    label: 'Hangzhou'
  }, {
    value: 'xihu',
    label: 'West Lake'
  }]; */

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }
}
