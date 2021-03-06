import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ValidatorsDupcateCardCode } from 'src/app/customValidators/validatorsDupcateName';
import { PagingParams } from 'src/app/models/PagingParams';
import { CardTypeService } from 'src/app/services/card-type.service';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { UserService } from 'src/app/services/user.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditCardTypeComponent } from 'src/app/views/danh-muc/card-type/add-edit-card-type/add-edit-card-type/add-edit-card-type.component';
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
  price: number
  listFacility:any[]=[];
  listFacilityTmp:any[]=[];
  listCustomer:any[]=[];
  listCustomerTmp:any[]=[];
  listCardType:any[]=[];
  listCardTypeTmp:any[]=[];
  listDichVu:any[]=[];
  listDichVuTmp:any[]=[];
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
      loai:'C??'
    },
    {
      ma:2,
      loai:'Kh??ng'
    }
  ]
  cacLoaiTrangThai=[
    {
      ma:1,
      loai:'???? b??n'
    },
    {
      ma:2,
      loai:'Ch??a b??n'
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
    private modalz :NzModalService,
    private FacilityService:FacilityService,
    private userService:UserService,
    private cardsv: CardService,
    private dichvuService: DichVuService,
  ) { }
    cacLoaiKhachHang=[
      {
        ma:1,
        loai:'Th????ng m???i'
      },
      {
        ma:2,
        loai:'C??ng nghi???p'
      }
    ]

    //link lo???i th???
    onCardTypeChange(event){
      const cardType = this.listCardType.find(x => x.id === event);
  //console.log(khachHang);
    if (this.myFormGroup.dirty) {
      this.myFormGroup.patchValue({
        nameType:cardType.nameType
      });
      this.tinhTien();
    }
  }
    onFacilityChange(event){
  const facility = this.listFacility.find(x => x.id === event);
  // console.log(facility);
  // console.log(this.listFacility);
    if (this.myFormGroup.dirty) {
     
      if (facility) {
  
        this.myFormGroup.patchValue({
          facilityName:facility.facilityName,
          address:facility.address
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
              customerName:customer.customerName,
              customerCode:customer.customerCode,
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
              serviceName:service.serviceName,
              money:service.money
            });
            console.log(service.id)
            this.onchangePrice(service.money);
         //   this.tinhNgayHetHan();
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
        ...this.khachHangData
      });
      console.log(this.khachHangData);
      console.log(this.myFormGroup);
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
  }
  addFacility() {
    const modal = this.modalz.create({
      nzTitle: 'Th??m m???i',
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
      nzTitle: 'Th??m m???i',
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
        //this.ngOnInit();
       
      }
    });
  }
  addNewCustomer() {
    const modal = this.modalz.create({
      nzTitle: 'Th??m',
      nzContent: AddEditKhachHangModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '70%',
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
      nzTitle: 'Th??m',
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
  saveChanges() {
    if(this.myFormGroup.invalid) {      
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
     
    }
    console.log(this.myFormGroup);
    // console.log('submitted');
    if (this.isAddNew === true) {
      console.log('api insert');
      
      this.cardsv.Insert(1,this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modal.destroy(rs);
          this.message.create('success', `Th??m th??? t???p th??nh c??ng`);
          
          // console.log(rs);
        } else {
          this.message.create('error', `Th??m th??? t???p th???t b???i`);
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
            this.message.create('success', `C???p nh???t th??ng tin th??nh c??ng`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `S???a th??ng tin kh??ng th??nh c??ng`);
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
      cardCode: [
        "MTT00",[Validators.required],[ValidatorsDupcateCardCode(this.cardsv,""),],
      ],
      customerId: [
        null,[Validators.required],
      ],
      price:0,
      cardTypeId: [null, [Validators.required]],
      facilityId:[null],
      serviceId:[null],
      note: ["none"],
      // toDate:[null],
      fromDate:"08/08/2021",
      createdBy:localStorage.getItem('userId'),
      money:0,
      address:[null],
      customerCode:[null],
      nameType:[null],
    });
  }else{
    this.myFormGroup = this.fb.group({
      id: [0],
      createdDate:[null],
      cardCode: [
        null,[Validators.required],  [
          ValidatorsDupcateCardCode(
            this.cardsv,
            this.khachHangData.cardCode
          ),
        ],,
      ],
      customerId: [
        null,[Validators.required],
      ],
      price:0,
      cardTypeId: [null, [Validators.required]],
      facilityId:[null],
      serviceId:[null],
      note: [null],
      // toDate:[null],
      fromDate:[null],
      ModifiedBy:localStorage.getItem('userId'),
      money:0,
      address:[null],
      customerCode:[null],
      nameType:[null],
    });
  }
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
  blurTien() {
    
    var a=this.myFormGroup.get('money').value;
      this.myFormGroup.get('price').setValue(a);
  }
  onchangePrice(event){
    const data = this.myFormGroup.getRawValue();
    const money = data.money;
    const nameType = data.nameType;
    // const price = data.chietKhauKhachHang;
    // const cuocVanChuyenThucTe = data.cuocVanChuyenThucTe;
    // const cuocVanChuyenDuKien = data.cuocVanChuyenDuKien;
    // const chiPhiKhac = data.chiPhiKhac;
    // const soLuongThucTe = data.soLuongThucTe;
    // const retailPrice = data.retailPrice;
    if(nameType=="VIP"){
      this.myFormGroup.get('price').setValue(parseFloat(event)*0.9);
    }
    if(nameType=="Th?????ng"){
      this.myFormGroup.get('price').setValue(money);
  }
}
  tinhTien() {
    const data = this.myFormGroup.getRawValue();
    const money = data.money;
    const nameType = data.nameType;
    // const price = data.chietKhauKhachHang;
    // const cuocVanChuyenThucTe = data.cuocVanChuyenThucTe;
    // const cuocVanChuyenDuKien = data.cuocVanChuyenDuKien;
    // const chiPhiKhac = data.chiPhiKhac;
    // const soLuongThucTe = data.soLuongThucTe;
    // const retailPrice = data.retailPrice;
    if(nameType=="VIP"){
      this.myFormGroup.get('price').setValue(money*0.9);
    }
    if(nameType=="Th?????ng"){
      this.myFormGroup.get('price').setValue(money);
    }
    else{
      this.myFormGroup.get('price').setValue(money);
    }
  }
  
  
  // tinhNgayHetHan() {
  //   var now = new Date();
  //   const data = this.myFormGroup.getRawValue();
  //   var toDate = new Date();
  //   toDate = data.toDate;
  //   console.log(toDate);
  //   var fromDate = new Date();
  //   fromDate = data.fromDate;
  //   const serviceId = data.serviceId;

  //   // const price = data.chietKhauKhachHang;
  //   // const cuocVanChuyenThucTe = data.cuocVanChuyenThucTe;
  //   // const cuocVanChuyenDuKien = data.cuocVanChuyenDuKien;
  //   // const chiPhiKhac = data.chiPhiKhac;
  //   // const soLuongThucTe = data.soLuongThucTe;
  //   // const retailPrice = data.retailPrice;
  //   if(serviceId=="afd87f47-30c8-4133-85d9-7020876bcd95"){
  //     this.myFormGroup.get('toDate').setValue(fromDate.setMonth(fromDate.getMonth()+2));
  //   }
  //   if(serviceId=="2fed1699-a05f-46e4-b7bd-ad7eda85e30e"){
  //     this.myFormGroup.get('toDate').setValue(fromDate.setMonth(fromDate.getMonth()+3));
  //   }
  //   if(serviceId=="f09c5275-67f6-4035-89d1-dae665ceeafc"){
  //     this.myFormGroup.get('toDate').setValue(fromDate.setMonth(fromDate.getMonth()+4));
  //   }
 // }
  // ontimmeChange(event){
  //   var now = new Date();
  //   const data = this.myFormGroup.getRawValue();
  //   toDate = data.toDate;
  //   console.log(toDate);
  //   var fromDate = new Date(event)
  //   fromDate = data.fromDate;
  //   const serviceId = data.serviceId;
  //   var toDate = new Date("dd//MM/yyyy");;
  //   if(serviceId=="afd87f47-30c8-4133-85d9-7020876bcd95"){
  //     this.myFormGroup.get('toDate').setValue(fromDate.setFullYear(fromDate.getFullYear())&&fromDate.setMonth(fromDate.getMonth()+2)&&
  //     fromDate.setDate(fromDate.getDate()));
  //     console.log( this.myFormGroup.get('toDate'))
  //   }
  //   if(serviceId=="2fed1699-a05f-46e4-b7bd-ad7eda85e30e"){
  //     this.myFormGroup.get('toDate').setValue(fromDate.setMonth(fromDate.getMonth()+3));
  //   }
  //   if(serviceId=="f09c5275-67f6-4035-89d1-dae665ceeafc"){
  //     this.myFormGroup.get('toDate').setValue(fromDate.setMonth(fromDate.getMonth()+4));
  //   }
  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
 }
}
