import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ValidatorsDupcateCardCode, ValidatorsDupcateMaKhachHang } from 'src/app/customValidators/validatorsDupcateName';
import { CardTypeService } from 'src/app/services/card-type.service';
import { CardService } from 'src/app/services/card.service';
import { DichVuService } from 'src/app/services/dich-vu.service';
import { FacilityService } from 'src/app/services/facility.service';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { UserService } from 'src/app/services/user.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { SharedService } from 'src/app/shared/shared.service';
import { AddEditCardTypeComponent } from 'src/app/views/danh-muc/card-type/add-edit-card-type/add-edit-card-type/add-edit-card-type.component';
import { AddEditDichVuComponent } from 'src/app/views/danh-muc/dich-vu/add-edit-dich-vu/add-edit-dich-vu/add-edit-dich-vu.component';
import { AddEditFacilityComponent } from 'src/app/views/danh-muc/facility/add-edit-facility/add-edit-facility/add-edit-facility.component';
import { AddEditKhachHangModalComponent } from 'src/app/views/khach-hang/add-edit-khach-hang/add-edit-khach-hang.component';

@Component({
  selector: 'app-m-add-edit-card',
  templateUrl: './m-add-edit-card.component.html',
  styleUrls: ['./m-add-edit-card.component.scss']
})
export class MAddEditCardComponent implements OnInit {
  @Input() idNew: any;
  isAddNew: boolean;
  khachHangData: any;
  stt: any;
  listPhuongAnNhap: any[] = [];
  listPhuongAnNhapTmp: any[] = [];
  listVung: any[] = [];
  listVungTmp: any[] = [];
  listNganh: any[] = [];
  listNganhTmp: any[] = [];
  myFormGroup: FormGroup;
  selectedloaiKhachHang: any;
  selectedId: any;
  BaoLanhs = [
    {
      ma: 1,
      loai: 'Có'
    },
    {
      ma: 2,
      loai: 'Không'
    }
  ]
  cacLoaiTrangThai = [
    {
      ma: 1,
      loai: 'Đã bán'
    },
    {
      ma: 2,
      loai: 'Chưa bán'
    }
  ]
  listFacility: any;
  listFacilityTmp: any;
  listDichVu: any;
  listDichVuTmp: any;
  listCardType: any;
  listCardTypeTmp: any;
  khachhang: any;
  listCustomer: any;
  listCustomerTmp: any;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private cardsv: CardService,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private cardTypeService : CardTypeService,
    private modalz :NzModalService,
    private facilityService:FacilityService,
    private dichvuService: DichVuService,
  ) { }
  cacLoaiKhachHang = [
    {
      ma: 1,
      loai: 'Thương mại'
    },
    {
      ma: 2,
      loai: 'Công nghiệp'
    }
  ]
  onVungChange(event) {

    const vung = this.listVung.find(x => x.vungId === event);
    //console.log(khachHang);
    if (this.myFormGroup.dirty) {

      if (vung) {

        this.myFormGroup.patchValue({
          maKhachHang: vung.maVung,
          tenVung: vung.tenVung

        });

      }

    }
  }
  onNganhChange(event) {

    const nganh = this.listNganh.find(x => x.nganhNgheId === event);
    console.log(nganh);
    if (this.myFormGroup.dirty) {
      if (nganh) {
        this.myFormGroup.patchValue({
          tenNganhNghe: nganh.tenNganhNghe,
          maNganhNghe: nganh.maNganhNghe
        });

      }
    }
  }
  ngOnInit() {
    this.sharedService.currentAddNew.subscribe(isAddNew => this.isAddNew = isAddNew);
    if (this.isAddNew)
      this.sharedService.emitChange({
        title: 'Thêm mới khách hàng'
      });
    else
      this.sharedService.emitChange({
        title: 'Cập nhật khách hàng'
      });
    this.selectedId = localStorage.getItem('userId');
    this.sharedService.currentData.subscribe(data => this.khachHangData = data);
    this.createForm();
    if (this.isAddNew) {
      this.myFormGroup.get(`id`).setValue(this.idNew);
    } else {
      this.sharedService.currentData.subscribe(data => this.khachHangData = data);
      console.log(this.khachHangData);
      this.myFormGroup.patchValue({
        ...this.khachHangData
      });
    }
    this.facilityService.getAllFacility().subscribe((rs:any)=>{
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
            //this.ngOnInit();
           
          }
        });
      }
      addNewCustomer() {
        const modal = this.modalz.create({
          nzTitle: 'Thêm',
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
        if(nameType=="Thường"){
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
        if(nameType=="Thường"){
          this.myFormGroup.get('price').setValue(money);
        }
        else{
          this.myFormGroup.get('price').setValue(money);
        }
      }
  addPhuongAnNhap() {
  }
  addVung() {
  }


  addNganh() {
    // const modal = this.modalz.create({
    //   nzTitle: 'Thêm mới',
    //   nzContent: AddEditNganhNgheComponent,
    //   nzClosable: false,
    //   nzFooter: 'null',
    //   nzWidth: '30%',
    //   nzStyle: {
    //     top: '10px'
    //   },
    //   nzComponentParams: {
    //     idNew: this.listNganh.length + 1,
    //     isAddNew: true
    //   },
    // });
    // modal.afterClose.subscribe((rs: any) => {
    //   if (rs) {
    //     this.ngOnInit();
    //   }
    // });
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
      console.log('api insert');

      this.cardsv.Insert(1, this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.message.create('success', `Thêm khách hàng thành công`);
          this.BackPages();
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
        }
      });
    }
    else {
      this.cardsv.Update(1, this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin khách hàng thành công`);
            this.BackPages();

          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }
  searchVung(event) {
    const arrCondition = ["tenVung"];
    this.listVung = SearchEngine(this.listVungTmp, arrCondition, event);
  }
  searchNganh(event) {
    const arrCondition = ["tenNganhNghe"];
    this.listNganh = SearchEngine(this.listNganhTmp, arrCondition, event);
  }

  createForm() {
    if (this.isAddNew) {
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
    } else {
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
  BackPages() {
    this.router.navigate(['m-layout/m-card']);
  }
}
