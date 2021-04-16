import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { Router } from '@angular/router';
import { VungService } from 'src/app/services/vung.service';
import { SearchEngine } from "src/app/shared/searchEngine";
import { NganhNgheService } from 'src/app/services/nganh-nghe.service'
import { PhuongAnNhapService } from 'src/app/services/phuong-an-nhap.service'
import { ValidatorsDupcateMaKhachHang } from "src/app/customValidators/validatorsDupcateName";
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-m-add-khach-hang',
  templateUrl: './m-add-khach-hang.component.html',
  styleUrls: ['./m-add-khach-hang.component.scss']
})
export class MAddKhachHangComponent implements OnInit {

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
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private khachhang: KhachHangService,
    private router: Router,
    private VungService: VungService,
    private NganhNgheService: NganhNgheService,
    private PhuongAnNhapService: PhuongAnNhapService,
    private userService: UserService,
    private sharedService: SharedService,
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

      this.khachhang.Insert(1, this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.message.create('success', `Thêm khách hàng thành công`);
          this.BackPages();
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
        }
      });
    }
    else {
      this.khachhang.Update(1, this.myFormGroup.getRawValue()).subscribe(
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
        createdDate: [null],
        customerName: [null, [Validators.required]],
        customerCode: [
          null, [Validators.required], [ValidatorsDupcateMaKhachHang(this.khachhang, ""),],
        ],
        address: [null, [Validators.required]],
        doB: [null],
        placeWork: [null],
        numberPhone: [null],
        note: [null],
        height: [null],
        weight: [null],
        healthStatus: [0],
        email: [null]
      });
    } else {
      this.myFormGroup = this.fb.group({
        id: [0],
        customerName: [null, [Validators.required]],
        customerCode: [
          null,
          [Validators.required],
          [
            ValidatorsDupcateMaKhachHang(
              this.khachhang,
              this.khachHangData.customerCode
            ),
          ],
        ],
        address: [null, [Validators.required]],
        doB: [null],
        placeWork: [null],
        numberPhone: [null],
        note: [null],
        height: [null],
        weight: [null],
        healthStatus: [0],
        email: [null]
      });
    }
  }
  BackPages() {
    this.router.navigate(['m-layout/m-khach-hang']);
  }
}
