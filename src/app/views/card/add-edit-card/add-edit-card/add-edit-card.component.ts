import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ValidatorsDupcateMaKhachHang } from 'src/app/customValidators/validatorsDupcateName';
import { PagingParams } from 'src/app/models/PagingParams';
import { CardTypeService } from 'src/app/services/card-type.service';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { UserService } from 'src/app/services/user.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditCardTypeComponent } from 'src/app/views/danh-muc/card-type/add-edit-card-type/add-edit-card-type/add-edit-card-type.component';
import { AddEditNganhNgheComponent } from 'src/app/views/danh-muc/nganh-nghe/modal/add-edit-nganh-nghe/add-edit-nganh-nghe.component';
import { NganhNgheService } from 'src/app/services/nganh-nghe.service';
import { FacilityService } from 'src/app/services/facility.service';
import { AddEditFacilityComponent } from 'src/app/views/danh-muc/facility/add-edit-facility/add-edit-facility/add-edit-facility.component';
import { CardService } from 'src/app/services/card.service';
import { DichVuService } from 'src/app/services/dich-vu.service';
import { AddEditDichVuComponent } from 'src/app/views/danh-muc/dich-vu/add-edit-dich-vu/add-edit-dich-vu/add-edit-dich-vu.component';
import { AddEditKhachHangModalComponent } from 'src/app/views/khach-hang/add-edit-khach-hang/add-edit-khach-hang.component';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.scss']
})
export class AddEditCardComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() khachHangData: any;
  stt:any;
  listFacility:any[]=[];
  listFacilityTmp:any[]=[];
  listCustomer:any[]=[];
  listCustomerTmp:any[]=[];
  listCardType:any[]=[];
  listCardTypeTmp:any[]=[];
  listDichVu:any[]=[];
  listDichVuTmp:any[]=[];
  listNganh:any[]=[];
  listNganhTmp:any[]=[];
  myFormGroup: FormGroup;
  selectedloaiKhachHang:any;
  selectedId:any;
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
  BaoLanhs=[
    {
      ma:1,
      loai:'Có'
    },
    {
      ma:2,
      loai:'Không'
    }
  ]
  cacLoaiTrangThai=[
    {
      ma:1,
      loai:'Đã bán'
    },
    {
      ma:2,
      loai:'Chưa bán'
    }
  ]
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private khachhang: KhachHangService,
    private router: Router,
    private modal: NzModalRef,
    private cardTypeService : CardTypeService,
    private NganhNgheService:NganhNgheService,
    private modalz :NzModalService,
    private FacilityService:FacilityService,
    private userService:UserService,
    private cardsv: CardService,
    private dichvuService: DichVuService,
  ) { }
    cacLoaiKhachHang=[
      {
        ma:1,
        loai:'Thương mại'
      },
      {
        ma:2,
        loai:'Công nghiệp'
      }
    ]
    //link loại thẻ
    onCardTypeChange(event){
      const cardType = this.listCardType.find(x => x.id === event);
  //console.log(khachHang);
    if (this.myFormGroup.dirty) {
     
      if (cardType) {
  
        this.myFormGroup.patchValue({
          cardTypeId:cardType.id,
        });
      }
    }
    }
    onFacilityChange(event){
  const facility = this.listFacility.find(x => x.id === event);
  // console.log(facility);
  // console.log(this.listFacility);
    if (this.myFormGroup.dirty) {
     
      if (facility) {
  
        this.myFormGroup.patchValue({
          facilityId:facility.id
        });
        console.log(facility.id)
      }
    }
    }
    onCustomerChange(event){
      const customer = this.listCustomer.find(x => x.id === event);
        if (this.myFormGroup.dirty) {
         
          if (customer) {
      
            this.myFormGroup.patchValue({
              customerId:customer.id
            });
            console.log(customer.id)
          }
        }
        }
    onServiceChange(event){
      const service = this.listDichVu.find(x => x.id === event);
      // console.log(facility);
      // console.log(this.listDichVu);
        if (this.myFormGroup.dirty) {
         
          if (service) {
      
            this.myFormGroup.patchValue({
              serviceId:service.id
            });
            console.log(service.id)
          }
        }
        }
    onNganhChange(event){
      const nganh = this.listNganh.find(x => x.nganhNgheId === event);
  console.log(nganh);
    if (this.myFormGroup.dirty) {
      if (nganh) {
        this.myFormGroup.patchValue({
          tenNganhNghe:nganh.tenNganhNghe,
          maNganhNghe:nganh.maNganhNghe
        });
 
      }
    }
    }
  ngOnInit() {
    this.selectedId=localStorage.getItem('userId');;
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`id`).setValue(this.idNew);
    } else {
      this.myFormGroup.patchValue({
        tenNganhNghe:this.khachHangData.tenNganhNghe,
        tencardType:this.khachHangData.tencardType,
        ...this.khachHangData
      });
    }
    this.FacilityService.getAllFacility().subscribe((rs:any)=>{
      this.listFacility=rs;
      this.listFacilityTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('cardTypeId').setValue(rs[0].cardTypeId);
      //   this.myFormGroup.get('maKhachHang').setValue(rs[0].macardType);
      // }
    })
    this.dichvuService.getAllService().subscribe((rs:any)=>{
      this.listDichVu=rs;
      this.listDichVuTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('cardTypeId').setValue(rs[0].cardTypeId);
      //   this.myFormGroup.get('maKhachHang').setValue(rs[0].macardType);
      // }
    })
    this.cardTypeService.getAllCardType().subscribe((rs:any)=>{
      this.listCardType=rs;
      this.listCardTypeTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('cardTypeId').setValue(rs[0].cardTypeId);
      //   this.myFormGroup.get('maKhachHang').setValue(rs[0].macardType);
      // }
    })
    this.khachhang.getAllKH().subscribe((rs:any)=>{
      this.listCustomer=rs;
      this.listCustomerTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('cardTypeId').setValue(rs[0].cardTypeId);
      //   this.myFormGroup.get('maKhachHang').setValue(rs[0].macardType);
      // }
    })
    this.NganhNgheService.getAll().subscribe((rs:any)=>{
      this.listNganh=rs;
      this.listNganhTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('nganhNgheId').setValue(rs[0].nganhNgheId);
      // }
    })
  }
  addFacility() {
    const modal = this.modalz.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditFacilityComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '30%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listFacility.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }
  addDichVu() {
    const modal = this.modalz.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditDichVuComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '30%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listDichVu.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }
  addCustomer() {
    const modal = this.modalz.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditKhachHangModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '50%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listCustomer.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }
  addCardtype() {
    const modal = this.modalz.create({
      nzTitle: 'Thêm',
      nzContent: AddEditCardTypeComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '30%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listCardType.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }

  addNganh() {
    const modal = this.modalz.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditNganhNgheComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '30%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listNganh.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
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
      
      this.cardsv.Insert(1,this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modal.destroy(rs);
          this.message.create('success', `Thêm thẻ tập thành công`);
          
          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thẻ tập thất bại`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.cardsv.Update(1,this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin thành công`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modal.destroy(result);
          }
        }
      );
    }
  }
  searchCardType(event){
    const arrCondition = ["nameType"];
    this.listCardType = SearchEngine(this.listCardTypeTmp, arrCondition, event);
  }
  searchNganh(event){
    const arrCondition = ["tenNganhNghe"];
    this.listNganh = SearchEngine(this.listNganhTmp, arrCondition, event);
  }
  searchFacility(event){
    const arrCondition = ["facilityName"];
    this.listFacility = SearchEngine(this.listFacilityTmp, arrCondition, event);
  }
  searchService(event){
    const arrCondition = ["serviceName"];
    this.listDichVu = SearchEngine(this.listDichVuTmp, arrCondition, event);
  }
  searchCustomer(event){
    const arrCondition = ["customerName"];
    this.listCustomer = SearchEngine(this.listCustomerTmp, arrCondition, event);
  }
  createForm() {
    if(this.isAddNew){
    this.myFormGroup = this.fb.group({
      id: [0],
      createdDate:[null],
      cardCode: [null, [Validators.required]],
      customerId: [
        null,[Validators.required],
      ],
      cardTypeId: [null, [Validators.required]],
      facilityId:[null],
      serviceId:[null],
      note: [null],
      toDate:["5/4/2020"],
      fromDate:["5/4/2020"],
      createdBy:localStorage.getItem('userId'),
    });
  }else{
    this.myFormGroup = this.fb.group({
      id: [0],
      createdDate:[null],
      cardCode: [null, [Validators.required]],
      customerId: [
        null,[Validators.required],
      ],
      cardTypeId: [null, [Validators.required]],
      facilityId:[null],
      serviceId:[null],
      note: [null],
      toDate:["5/4/2020"],
      fromDate:["5/4/2020"],
      ModifiedBy:localStorage.getItem('userId'),
    });
  }
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
