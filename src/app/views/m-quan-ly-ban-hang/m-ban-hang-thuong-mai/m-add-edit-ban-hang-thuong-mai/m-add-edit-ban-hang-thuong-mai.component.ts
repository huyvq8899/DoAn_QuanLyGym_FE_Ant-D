
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { CheckAlreadyExistsValidator } from 'src/app/customValidators/check-already-exists.validator';
import { SearchEngine } from 'src/app/shared/searchEngine';
import * as moment from 'moment';
import { LyDoHuyDuyetModalComponent } from 'src/app/views/quan-ly-ban-hang/modals/ly-do-huy-duyet-modal/ly-do-huy-duyet-modal.component';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { DonHangService } from 'src/app/services/don-hang.service';
import { LaiXeService } from 'src/app/services/lai-xe.service ';
import { ProductService } from 'src/app/services/product.service';
import { LoiNhuanService } from 'src/app/services/loi-nhuan.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-add-edit-ban-hang-thuong-mai',
  templateUrl: './m-add-edit-ban-hang-thuong-mai.component.html',
  styleUrls: ['./m-add-edit-ban-hang-thuong-mai.component.scss']
})
export class MAddEditBanHangThuongMaiComponent implements OnInit {
   isChiTiet:boolean=false;
   isAddNew: boolean;
   data: any;
   list: any[] = [];
  stt = 1;
  chiTiet:any[];
  roleId: string;
  donBanHangForm: FormGroup;
  khachHangs: any[];
  tinhTrangThanhToan = 1;
  loinhuans: any[];
  selectStyles = {
    width: '500px'
  };
  sanPhams: any[] = [
  ];
  khoHangs: any[] = [
    { khoHangId: '1', maKho: 'K00001', tenKhoHang: 'Kho 1' },
    { khoHangId: '2', maKho: 'K00002', tenKhoHang: 'Kho 2' },
    { khoHangId: '3', maKho: 'K00003', tenKhoHang: 'Kho 3' },
  ];
  cuocVanChuyensAll: any[] = [
    { cuocVanChuyenId: null, maCuocVanChuyen: 'Mã cước vận chuyển', tenThanhPho: 'Tên thành phố', tenQuanHuyen: 'Tên quận huyện', cuocVanChuyen: 'Cước vận chuyển' },
    { cuocVanChuyenId: '1', maCuocVanChuyen: 'CVC00001', tenThanhPho: 'Hà Nội', tenQuanHuyen: 'Ba Đình', cuocVanChuyen: 120 },
    { cuocVanChuyenId: '2', maCuocVanChuyen: 'CVC00002', tenThanhPho: 'Hà Nội', tenQuanHuyen: 'Cầu Giấy', cuocVanChuyen: 130 },
    { cuocVanChuyenId: '3', maCuocVanChuyen: 'CVC00003', tenThanhPho: 'Hải Phòng', tenQuanHuyen: 'Lê Chân', cuocVanChuyen: 120 },
    { cuocVanChuyenId: '4', maCuocVanChuyen: 'CVC00004', tenThanhPho: 'Hải Phòng', tenQuanHuyen: 'Kiến An', cuocVanChuyen: 150 },
    { cuocVanChuyenId: '5', maCuocVanChuyen: 'CVC00005', tenThanhPho: 'Đà Nẵng', tenQuanHuyen: 'Cẩm Lệ', cuocVanChuyen: 250 },
    { cuocVanChuyenId: '6', maCuocVanChuyen: 'CVC00006', tenThanhPho: 'Đà Nẵng', tenQuanHuyen: 'Hải Châu', cuocVanChuyen: 230 },
  ];
  laiXes: any[] = [];
  cuocVanChuyens: any[] = [];
  cuocVanChuyensTmp: any[] = [];
  hinhThucThanhToans=[
    {
      ma:1,
      hinhThuc:'Tiền mặt'
    },
    {
      ma:2,
      hinhThuc:'Chuyển khoản'
    }
  ];
  thanhToans=[
    {
      ma:'1',
      kieu:'Trước giao hàng'
    },
    {
      ma:'2',
      kieu:'Sau giao hàng'
    }
  ];
  trangThais=[
    { 
      ma:'1',
      loai:'Chưa duyệt'
    },
    {
      ma:'2',
      loai:'Đã duyệt'
    }
  ]
  cacTinhTrangTT=[
    { 
      ma:'0',
      loai:'Chưa thanh toán'
    
    },
    { 
      ma:'1',
      loai:'Đã thanh toán'
    
    },
  ]
  
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private khachhang:KhachHangService,
    private DonHangService:DonHangService,
    private laixe: LaiXeService,
    private ProductService:ProductService,
    private loinhuansv:LoiNhuanService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedService.currentAddNew.subscribe(isAddNew=>this.isAddNew=isAddNew)
    this.loinhuansv.getByMaLN('BHTM').subscribe((rs: any) => {

      this.loinhuans = rs;
    });
    this.laixe.getAll().subscribe((rs: any)=>{
      console.log(rs);
      this.laiXes=rs;
    })
      console.log(this.data);
    this.ProductService.getAllProduct().subscribe((rs: any)=>{
      this.sanPhams=rs;
    })
    this.roleId = localStorage.getItem('roleId');

    // if ( this.roleId === 'DX') {
    //   for (const i in this.donBanHangForm.controls) {
    //     this.donBanHangForm.controls[i].disable();
    //     this.donBanHangForm.get('xeLayHang').enable();
    //     this.donBanHangForm.get('bienSoXe').enable();
    //     this.donBanHangForm.get('laiXe').enable();
    //   }
    // }
    this.cuocVanChuyens = this.cuocVanChuyensAll.filter(x => x.cuocVanChuyenId != null);
    this.cuocVanChuyensTmp = this.cuocVanChuyensAll.filter(x => x.cuocVanChuyenId != null);
    this.khachhang.getAllKH().subscribe((rs: any) => {
      console.log(rs);
      this.khachHangs = rs;
    });
    
    if (localStorage.getItem('ListDonBanHang')) {
      this.list = JSON.parse(localStorage.getItem('ListDonBanHang'));
    }
  
    if (this.isAddNew) {
      this.sharedService.emitChange({
        title: 'Thêm đơn hàng thương mại'
      });
      this.createForm();
      
      // if (localStorage.getItem('SttDonBanHang')) {
      //   this.stt = parseInt(localStorage.getItem('SttDonBanHang')) + 1;
      // } else {
      //   this.stt = 1;
      // }
      // this.donBanHangForm.get('donHangId').setValue(this.stt);
      this.donBanHangForm.get('thanhToan').setValue('1')
      this.donBanHangForm.get('tinhTrangThanhToan').setValue('0')
      this.DonHangService.CreateMaDonHang().subscribe((rs: any) => {
        const tg = localStorage.getItem('roleId');
        this.donBanHangForm.get('maDonHang').setValue(tg+rs);
      });  

      if (this.roleId === 'NVKD') {
        this.donBanHangForm.get('xeLayHang').disable();
        this.donBanHangForm.get('laiXe').disable();
        this.donBanHangForm.get('bienSoXe').disable();       
      }
      if(this.roleId === 'DX'){
        for (const i in this.donBanHangForm.controls) {
          this.donBanHangForm.controls[i].disable();
        }
      }
    } else {
      this.sharedService.emitChange({
        title: 'Sửa đơn hàng thương mại'
      });
      this.sharedService.currentData.subscribe(data=>this.data=data);
      this.sharedService.currentChiTiet.subscribe(isChiTiet=>this.isChiTiet=isChiTiet)
      this.createForm();
      if(this.isChiTiet=true){
        this.donBanHangForm.disable();
      }
      if(this.roleId==='BLD' || this.roleId==='ADMIN'){
        for (const i in this.donBanHangForm.controls) {
          this.donBanHangForm.controls[i].disable();
        }
      }
      
      console.log(this.roleId);
      if (this.roleId === 'NVKD'
       && (this.data.trangThai === 0 || this.data.trangThai === 1 || this.data.trangThai === 3))
       {
        this.donBanHangForm.get('laiXe').disable();
        this.donBanHangForm.get('bienSoXe').disable();
        this.donBanHangForm.get('xeLayHang').disable();
        this.donBanHangForm.get('tinhTrangThanhToan').disable();
        this.donBanHangForm.get('ngayDaThanhToan').disable();
        if (this.data.thanhToan == '1') {
          console.log(this.data.thanhToan);
          // this.donBanHangForm.get('ngaySeThanhToan').setValue(null);
          this.donBanHangForm.get('ngaySeThanhToan').disable();

        } else {

          this.donBanHangForm.get('ngaySeThanhToan').enable();
          this.donBanHangForm.get('ngaySeThanhToan').setValidators([Validators.required]);
          this.donBanHangForm.get('ngaySeThanhToan').updateValueAndValidity();
        }
      }
      else{
        if(this.roleId === 'KT'){
          this.donBanHangForm.get('tinhTrangThanhToan').enable();
          if (this.data.tinhTrangThanhToan === '0') {
            this.donBanHangForm.get('ngayDaThanhToan').disable();
          } else {
            this.donBanHangForm.get('ngayDaThanhToan').enable();
            this.donBanHangForm.get('ngayDaThanhToan').setValidators([Validators.required]);
            this.donBanHangForm.get('ngayDaThanhToan').updateValueAndValidity();
          }
        }
        if ( this.roleId === 'DX') {
          for (const i in this.donBanHangForm.controls) {
            this.donBanHangForm.controls[i].disable();
          }
          this.donBanHangForm.get('xeLayHang').enable();
          // this.donBanHangForm.get('xeLayHang').setValidators([Validators.required]);
          this.donBanHangForm.get('xeLayHang').updateValueAndValidity();
          this.donBanHangForm.get('laiXe').enable();
          // this.donBanHangForm.get('laiXe').setValidators([Validators.required]);
          this.donBanHangForm.get('laiXe').updateValueAndValidity();
          this.donBanHangForm.get('bienSoXe').enable();
          // this.donBanHangForm.get('bienSoXe').setValidators([Validators.required]);
          this.donBanHangForm.get('bienSoXe').updateValueAndValidity();
          this.donBanHangForm.get('tongLuongGiao').enable();
          this.donBanHangForm.get('tongLuongGiao').updateValueAndValidity();
        }
      }
   
      this.donBanHangForm.patchValue({
        ...this.data,
        layHangChiTiets: []
      });
      this.tinhLoiNhuan();
      console.log(this.donBanHangForm.get(`chiTietGiaoHang`).value)
      this.chiTiet = JSON.parse(this.donBanHangForm.get(`chiTietGiaoHang`).value);
      
      const layHangChiTiets = this.donBanHangForm.get(`layHangChiTiets`) as FormArray;
      layHangChiTiets.clear();
      this.chiTiet.forEach(element => {
        const formGorup = this.createLayHangChiTietForm();
        formGorup.patchValue({
          ...element
        });
        layHangChiTiets.push(formGorup);
      });

      if (this.roleId === 'NVKD') {
        if ((this.data.trangThai === 0 || this.data.trangThai === 1 || this.data.trangThai === 3) === false) {
          for (const i in this.donBanHangForm.controls) {
            this.donBanHangForm.controls[i].disable();
          }
        } else {
          for (const i in this.donBanHangForm.get('layHangChiTiets').value) {
            this.donBanHangForm.get(`layHangChiTiets.${i}`).disable();
          }
        }
      } else {     
        // for (const i in this.donBanHangForm.controls) {
        //   this.donBanHangForm.controls[i].disable();
        // }
        if (((this.data.thanhToan == '1' && (this.data.trangThai === 16 || this.data.trangThai === 5 || this.data.trangThai === 6 || this.data.trangThai === 9)) || (this.data.thanhToan === 2 && ((this.data.trangThai === 0 || this.data.trangThai === 1 || this.data.trangThai === 5 || this.data.trangThai === 6 || this.data.trangThai === 9)))) && this.roleId === 'DX') {
          for (const i in this.donBanHangForm.controls) {
            this.donBanHangForm.controls[i].disable();
          }
          this.donBanHangForm.get('xeLayHang').enable();
          // this.donBanHangForm.get('xeLayHang').setValidators([Validators.required]);
          this.donBanHangForm.get('xeLayHang').updateValueAndValidity();

          this.donBanHangForm.get('laiXe').enable();
          // this.donBanHangForm.get('laiXe').setValidators([Validators.required]);
          this.donBanHangForm.get('laiXe').updateValueAndValidity();

          this.donBanHangForm.get('bienSoXe').enable();
          // this.donBanHangForm.get('bienSoXe').setValidators([Validators.required]);
          this.donBanHangForm.get('bienSoXe').updateValueAndValidity();

          this.donBanHangForm.get('tongLuongGiao').enable();
          this.donBanHangForm.get('tongLuongGiao').updateValueAndValidity();
        }
        if (((this.data.thanhToan == '1' && (this.data.trangThai === 0 || this.data.trangThai === 1 || this.data.trangThai === 17)) || (this.data.thanhToan === '2' && this.data.trangThai === 14)) && this.roleId === 'KT') {
          this.donBanHangForm.get('tinhTrangThanhToan').enable();
          if (this.data.tinhTrangThanhToan === '0') {
            this.donBanHangForm.get('ngayDaThanhToan').disable();
          } else {
            this.donBanHangForm.get('ngayDaThanhToan').enable();
            this.donBanHangForm.get('ngayDaThanhToan').setValidators([Validators.required]);
            this.donBanHangForm.get('ngayDaThanhToan').updateValueAndValidity();
          }
        }
        
        if (this.roleId === 'KT' || this.roleId === 'DX') {
          for (const i in this.donBanHangForm.get('layHangChiTiets').value) {
            this.donBanHangForm.get(`layHangChiTiets.${i}`).enable();
          }
        }
      }
      
    }
  }
  Back(){
    this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-thuong-mai']);
  }

  createForm() {
    this.donBanHangForm = this.fb.group({
      donHangId: [null],
      maDonHang: [{ value: null, disabled: true }, [Validators.required]],
      maKhachHang: [null, [Validators.required]],
      tenKhachHang: [null, [Validators.required]],
      maSoThue: [null],
      diaChi: [null],
      email: [null],
      soDienThoaiNguoiLienHe: [null],
      giamDoc: [null],
      sanPham: [null, [Validators.required]],
      tenSanPham: [null],
      giaSanPham: [0],
      // khoHangId: [null],
      // tenKhoHang: [null],
      kho:[null],
      chietKhauCongTy: [0],
      chietKhauKhachHang: [0],
      thanhToan: [null],
      ngaySeThanhToan: [{ value: null, disabled: true }],
      hinhThucThanhToan: [null, [Validators.required]],
      loiNhuan: [0],
      ghiChu: [null],
      ngayGiaoHang: [null],
      xeLayHang: [null],
      tongLuongGiao: [0],
      luongConLai: [{ value: 0, disabled: true }],
      trangThai: [null],
      loai: [2],
      tinhTrangThanhToan: [{ value: 0, disabled: true }],
      ngayDaThanhToan: [{ value: null, disabled: true }],
      isDuyet: [null],
      lyDoHuyDuyet: [null],
      layHangChiTiets: this.fb.array([]),
      status: [null],
      vanPhongGiaoDich: [null],
      soDienThoaiKeToan: [null],
      soDienThoaiNguoiDaiDien: [null],
      bienSoXe: [null],
      laiXe: [null],
      tinhTrangTT:[null],
      chiTietGiaoHang:[null],
      createdDate: [null],
      createdBy:[null],


    });
  }

  createLayHangChiTietForm() {
    return this.fb.group({
      bienSoXe:[null],
      laiXe:[null],
      khoLayHang:[null],
      ngayLay: [moment().format('YYYY-MM-DD'), [Validators.required]],
      soLuongLay: [0, [Validators.required]]
    });
  }

  addItemLayHangChiTiets() {
    const layHangChiTiets = this.donBanHangForm.get(`layHangChiTiets`) as FormArray;
    layHangChiTiets.push(this.createLayHangChiTietForm());
  }

  removeItemLayHangChiTiets(index) {
    const layHangChiTiets = this.donBanHangForm.get(`layHangChiTiets`) as FormArray;
    layHangChiTiets.removeAt(index);
  }

  blurTongLuongMua() {
    const layHangChiTiets = this.donBanHangForm.getRawValue().layHangChiTiets;
    let tongLuongXuat = layHangChiTiets.reduce((a, b) => a + b.soLuongLay, 0);
    let luongConLai = this.donBanHangForm.getRawValue().tongLuongGiao - tongLuongXuat;
    this.donBanHangForm.patchValue({
      luongConLai: luongConLai
    });
  }

  blurSoLuongLay() {
    const layHangChiTiets = this.donBanHangForm.getRawValue().layHangChiTiets;
    let tongLuongXuat = layHangChiTiets.reduce((a, b) => a + b.soLuongLay, 0);
    let luongConLai = this.donBanHangForm.getRawValue().tongLuongGiao - tongLuongXuat;
    this.donBanHangForm.patchValue({
      luongConLai: luongConLai
    });
  }

  submitForm() {
    if(this.donBanHangForm.get('luongConLai').value<0){

      this.message.error('Số lượng lấy vượt quá tổng lượng');
      return;
    }
    if (this.donBanHangForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.donBanHangForm.controls) {
        this.donBanHangForm.controls[i].markAsDirty();
        this.donBanHangForm.controls[i].updateValueAndValidity();
      }

      return;
    }
    var ct = '['
    var tg=1;
    for (const i in this.donBanHangForm.get('layHangChiTiets').value) {
      ct +='{"id":'+tg+',"ngayLay":'+'"'+ this.donBanHangForm.get(`layHangChiTiets.${i}.ngayLay`).value+'"'+
      ',"soLuongLay":'+this.donBanHangForm.get(`layHangChiTiets.${i}.soLuongLay`).value+
      ',"bienSoXe":'+this.donBanHangForm.get(`layHangChiTiets.${i}.bienSoXe`).value+
       ',"laiXe":'+this.donBanHangForm.get(`layHangChiTiets.${i}.laiXe`).value+
       ',"khoLayHang":'+this.donBanHangForm.get(`layHangChiTiets.${i}.khoLayHang`).value+' }'+",";
      tg+=1
    }
    ct=ct.substring(0, ct.length - 1);
    ct+="]";
    this.donBanHangForm.get(`chiTietGiaoHang`).setValue(ct);



    const data = this.donBanHangForm.getRawValue();
    console.log(data);
    if (this.isAddNew === true) {
      this.donBanHangForm.get('trangThai').setValue(0);
      // this.donBanHangForm.get('luongConLai').setValue(this.donBanHangForm.get('tongLuongGiao').value);
      // this.message.success('Tạo thành công.');
      // this.list = [
      //   ...this.list,
      //   data
      // ];
      this.DonHangService.Insert(this.donBanHangForm.getRawValue()).subscribe((rs:any)=>{
        if(rs===1){                   
          this.message.success('Thêm thành công đơn hàng ');
          this.Back();
        }
        else{
          
          this.message.error('Thêm đơn hàng thất bại . Có lỗi xảy ra ');
        }
      })

      // localStorage.setItem('SttDonBanHang', this.stt + '');
      // localStorage.setItem('ListDonBanHang', JSON.stringify(this.list));
      
    } else {
      if (data.trangThai === 3 && this.roleId === 'NVKD') {
        data.trangThai = 1;
      }
     this.DonHangService.Update(this.donBanHangForm.getRawValue()).subscribe((rs:any)=>{
      if(rs===1){        
        this.message.success('Sửa đơn hàng thành công  ');
        this.Back();
      }
      else{
        
        this.message.error('Sửa đơn hàng thất bại . Có lỗi xảy ra ');
      }
     })
    }
   
  }



  changeKhachHang(event: any) {
    const data = this.khachHangs.find(x => x.maKhachHang === event);
    console.log(data);
    this.donBanHangForm.get('tenKhachHang').setValue(data.tenKhachHang);
    this.donBanHangForm.get('maSoThue').setValue(data.maSoThue);
    this.donBanHangForm.get('vanPhongGiaoDich').setValue(data.vanPhongGiaoDich);
    this.donBanHangForm.get('diaChi').setValue(data.diaChi);
    this.donBanHangForm.get('email').setValue(data.email);
    this.donBanHangForm.get('soDienThoaiNguoiLienHe').setValue(data.sdt);
    this.donBanHangForm.get('giamDoc').setValue(data.giamDoc);
    this.donBanHangForm.get('soDienThoaiKeToan').setValue(data.soDienThoaiKeToan);
    this.donBanHangForm.get('soDienThoaiNguoiDaiDien').setValue(data.soDienThoaiNguoiDaiDien);
  }

  changeSanPham(event: any) {
    console.log(event);
    const data = this.sanPhams.find(x => x.productCode === event);
    this.donBanHangForm.get('tenSanPham').setValue(data.productName);
    this.donBanHangForm.get('giaSanPham').setValue(data.retailPrice);
  }

  // changeKhoHang(event: any) {
  //   const data = this.khoHangs.find(x => x.khoHangId === event);
  //   this.donBanHangForm.get('kho').setValue(this.khoHangs);
  // }

  changeDiaChi(event: any) {
    const data = this.cuocVanChuyens.find(x => x.cuocVanChuyenId === event);
    this.donBanHangForm.get('cuocVanChuyenDuKien').setValue(data.cuocVanChuyen);
  }

  searchDiaChi(event: any) {
    const arrCondition = ['tenThanhPho', 'tenQuanHuyen', 'cuocVanChuyen'];
    this.cuocVanChuyens = SearchEngine(this.cuocVanChuyensTmp, arrCondition, event);
    this.cuocVanChuyens = [
      { cuocVanChuyenId: null, tenThanhPho: 'Tên thành phố', tenQuanHuyen: 'Tên quận huyện', cuocVanChuyen: 'Cước vận chuyển' },
      ...this.cuocVanChuyens
    ];
  }

  changeBienSoXe(event: any) {
    const data = this.laiXes.find(x => x.laiXeId === event);
    this.donBanHangForm.get('laiXe').setValue(data.tenLaiXe);
  }

  blurTien() {
    if (this.donBanHangForm.get('tongLuongGiao').value) {
      this.donBanHangForm.get('luongConLai').setValue(this.donBanHangForm.get('tongLuongGiao').value);
    }
    if (!this.donBanHangForm.get('tongLuongGiao').value) {
      this.donBanHangForm.get('tongLuongGiao').setValue(0);
    }
    if (!this.donBanHangForm.get('giaSanPham').value) {
      this.donBanHangForm.get('giaSanPham').setValue(0);
    }

    if (!this.donBanHangForm.get('chietKhauCongTy').value) {
      this.donBanHangForm.get('chietKhauCongTy').setValue(0);
    }

    if (!this.donBanHangForm.get('chietKhauKhachHang').value) {
      this.donBanHangForm.get('chietKhauKhachHang').setValue(0);
    }



    this.blurTongLuongMua();
    this.tinhLoiNhuan();
  }

  blurMaDonHang() {
    const maDonHang = this.donBanHangForm.get('maDonHang').value;
    if (this.isAddNew || (!this.isAddNew && this.data.maDonHang !== maDonHang)) {
      const isExists = this.list.filter(x => x.maDonHang === maDonHang).length > 0;
      this.donBanHangForm.get('maDonHang').setValidators([CheckAlreadyExistsValidator(isExists)]);
      this.donBanHangForm.get('maDonHang').updateValueAndValidity();
    } else {
      this.donBanHangForm.get('maDonHang').setValidators([CheckAlreadyExistsValidator(false)]);
      this.donBanHangForm.get('maDonHang').updateValueAndValidity();
    }
  }

  huyDuyet() {
    const modal = this.modalService.create({
      nzTitle: 'Xác nhận hủy',
      nzContent: LyDoHuyDuyetModalComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '400px',
      nzStyle: { top: '20px' },
      nzBodyStyle: { padding: '5px' },
      nzComponentParams: {
        ///////////////
      },
      nzFooter: null
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        let status = 0;
        if (this.data.trangThai === 0 || this.data.trangThai === 1 || this.data.trangThai === 7 ) {
          status = 3;
        } else if (this.data.trangThai === 2 || (this.data.trangThai === 9))  {
          status = 7;
        } else if (this.data.trangThai === 4) {
          // status = 7;
        } else if (this.data.trangThai === 6 || this.data.trangThai === 11) {
          status = 9;
        } else if (this.data.trangThai === 8 || this.data.trangThai === 13) {
          status = 11;
        } else if (this.data.trangThai === 10) {
          status = 13;
        } else if (this.data.trangThai === 12 || this.data.trangThai === 15  ) {
          status = 13;
        } else if (this.data.trangThai === 12) {
          status = 15;
        } else if (this.data.trangThai === 14) {
          status = 17;
        } else if (this.data.trangThai === 16 || this.data.trangThai === 3  ) {
          status = 17;
        }else if (this.data.trangThai === 17) {
          status = 0;
        }

        this.donBanHangForm.get('trangThai').setValue(status);
        this.donBanHangForm.get('isDuyet').setValue(false);
        this.donBanHangForm.get('lyDoHuyDuyet').setValue(rs);
        this.submitForm();
      }
    });
  }

  duyet() {
    let content = '';
    let status = 0;
    if (this.donBanHangForm.get('loiNhuan').value >= this.loinhuans[0].mucLoiNhuan) {
    if (this.data.thanhToan === '1') {
      if (this.data.trangThai === 0 || this.data.trangThai === 1 || this.data.trangThai === 17) {
        content = 'Bạn có chắc chắn muốn duyệt xác nhận đã thanh toán đơn hàng này không?';
        status = 16;
      }
      if (this.data.trangThai === 16 || this.data.trangThai === 3 || (this.data.trangThai === 7 && this.roleId === 'DX')) {
        content = 'Bạn có chắc chắn muốn duyệt xác nhận cước thực tế đơn hàng này không?';
        status = 2;
      }
    } else {
      if (this.data.trangThai === 0 || this.data.trangThai === 1 || this.data.trangThai === 3 || (this.data.trangThai === 7 && this.roleId === 'DX')) {
        content = 'Bạn có chắc chắn muốn duyệt xác nhận cước thực tế đơn hàng này không?';
        status = 2;
      }
    }
    if (this.data.trangThai === 2 || (this.data.trangThai === 7 && this.roleId === 'BLD')) {
      content = 'Bạn có chắc chắn muốn BLĐ duyệt đơn hàng này không?';
      status = 6;
    }
    if (this.data.trangThai === 6 || (this.data.trangThai === 9 && this.roleId === 'DX')) {
      content = 'Bạn có chắc chắn muốn duyệt chốt xe đơn hàng này không?';
      status = 8;
    }
    if (this.data.trangThai === 8 || this.data.trangThai === 11) {
      content = 'Bạn có chắc chắn muốn duyệt lấy hàng của đơn hàng này không?';
      status = 10;
    }
    if (this.data.trangThai === 10 || this.data.trangThai === 13) {
      content = 'Bạn có chắc chắn muốn duyệt đang giao hàng của đơn hàng này không?';
      status = 12;
    }
    if (this.data.trangThai === 12 || this.data.trangThai === 15) {
      content = 'Bạn có chắc chắn muốn duyệt đã giao hàng của đơn hàng này không?';
      status = 14;
    }

    this.modalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: content,
      nzOkText: 'Có',
      nzOnOk: () => {
        this.donBanHangForm.get('trangThai').setValue(status);
        this.donBanHangForm.get('isDuyet').setValue(true);
        this.donBanHangForm.get('lyDoHuyDuyet').setValue(null);
        this.submitForm();
      },
      nzCancelText: 'Không',
    });
  }
  else {
    this.modalService.error({
      nzTitle: 'Thông báo',
      nzContent: 'Lợi nhuận phải lớn hơn hoặc bằng ' + this.loinhuans[0].mucLoiNhuan,
    });
  }
  }

  permission(isDuyet: boolean) {
    if (this.isAddNew === false) {
      if (this.data.thanhToan === '1') {
        if ((this.data.trangThai === 0 || this.data.trangThai === 1) && this.roleId === 'KT') {
          return true;
        } else if (this.data.trangThai === 16 && this.roleId === 'DX') {
          return true;
        } else if (this.data.trangThai === 17 && this.roleId === 'KT') {
          return  true;
          
        }
        else if (this.data.trangThai === 3 && this.roleId === 'KT') {
          return  true;
        } else if (this.data.trangThai === 2 && this.roleId === 'BLD') {
          return true;
        } else if (this.data.trangThai === 3 && this.roleId === 'DX') {
          return isDuyet === true;
        } else if (this.data.trangThai === 4 && this.roleId === 'BLD') {
          // return true;
        } else if (this.data.trangThai === 5 && (this.roleId === 'PPKD' || this.roleId === 'DX')) {
          // if (this.roleId === 'PPKD') {
          //   return isDuyet === true;
          // } else {
          //   return true;
          // }
        } else if (this.data.trangThai === 6 && this.roleId === 'DX') {
          return true;
        } else if (this.data.trangThai === 7 && (this.roleId === 'BLD' || this.roleId === 'DX')) {
          if (this.roleId === 'BLD') {
            return isDuyet === true;
          } else {
            return true;
          }
        } else if (this.data.trangThai === 8 && this.roleId === 'GNLX' && this.data.thanhToan =='2') {
          return true;

        } 
        else if (this.data.trangThai === 8 && this.roleId === 'KT' && this.data.thanhToan =='1') {
          return true;
          
        }
        else if (this.data.trangThai === 9 && (this.roleId === 'DX' || this.roleId === 'BLD')) {
          if (this.roleId === 'DX') {
            return isDuyet === true;
          } else {
            return true;
          }
        } else if (this.data.trangThai === 10 && this.roleId === 'GNLX') {
          return true;
        } else if (this.data.trangThai === 11 && this.roleId === 'GNLX') {
          return isDuyet === true;
        } else if (this.data.trangThai === 12 && this.roleId === 'GNLX') {
          return true;
        } else if (this.data.trangThai === 13 && this.roleId === 'GNLX') {
          return isDuyet === true;
        } else if (this.data.trangThai === 15 && this.roleId === 'GNLX') {
          return isDuyet === true;
        }
      } else {
        if ((this.data.trangThai === 0 || this.data.trangThai === 1) && this.roleId === 'DX') {
          return true;
        } else if (this.data.trangThai === 2 && this.roleId === 'BLD') {
          return true;
        } else if (this.data.trangThai === 3 && this.roleId === 'DX') {
          return isDuyet === true;
        } else if (this.data.trangThai === 4 && this.roleId === 'BLD') {
          /// return true;
        } else if (this.data.trangThai === 5 && (this.roleId === 'PPKD' || this.roleId === 'DX')) {
          // if (this.roleId === 'PPKD') {
          //   return isDuyet === true;
          // } else {
          //   return true;
          // }
        } else if (this.data.trangThai === 6 && this.roleId === 'DX') {
          return true;
        } else if (this.data.trangThai === 7 && (this.roleId === 'BLD' || this.roleId === 'DX')) {
          if (this.roleId === 'BLD') {
            return isDuyet === true;
          } else {
            return true;
          }
        } else if (this.data.trangThai === 8 && this.roleId === 'GNLX') {
          return true;
        } else if (this.data.trangThai === 9 && (this.roleId === 'DX' || this.roleId === 'BLD')) {
          if (this.roleId === 'DX') {
            return isDuyet === true;
          } else {
            return true;
          }
        } else if (this.data.trangThai === 10 && this.roleId === 'GNLX') {
          return true;
        } else if (this.data.trangThai === 11 && this.roleId === 'GNLX') {
          return isDuyet === true;
        } else if (this.data.trangThai === 12 && this.roleId === 'GNLX') {
          return true;
        } else if (this.data.trangThai === 13 && this.roleId === 'GNLX') {
          return isDuyet === true;
        } else if (this.data.trangThai === 15 && this.roleId === 'GNLX') {
          return isDuyet === true;
        }
      }
    }

    return false;
  }

  changeThanhToan(event: any) {
    console.log(event);
    if (event == '1') {
      this.donBanHangForm.get('ngaySeThanhToan').setValue(null);
      this.donBanHangForm.get('ngaySeThanhToan').disable();
      this.donBanHangForm.get('ngaySeThanhToan').clearValidators();
      this.donBanHangForm.get('ngaySeThanhToan').updateValueAndValidity();
    } else {
      this.donBanHangForm.get('ngaySeThanhToan').enable();
      this.donBanHangForm.get('ngaySeThanhToan').setValidators([Validators.required]);
      this.donBanHangForm.get('ngaySeThanhToan').updateValueAndValidity();
    }
  }

  changeTinhTrangThanhToan(event: any) {
    if (event === '0') {
      this.donBanHangForm.get('ngayDaThanhToan').setValue(null);
      this.donBanHangForm.get('ngayDaThanhToan').disable();
      this.donBanHangForm.get('ngayDaThanhToan').clearValidators();
      this.donBanHangForm.get('ngayDaThanhToan').updateValueAndValidity();
    } else {
      this.donBanHangForm.get('ngayDaThanhToan').enable();
      this.donBanHangForm.get('ngayDaThanhToan').setValidators([Validators.required]);
      this.donBanHangForm.get('ngayDaThanhToan').updateValueAndValidity();
    }
  } 
  changeLaiXe(event){
    const data=this.laiXes.find(x=>x.tenLaiXe==event);
    console.log(data)
    this.donBanHangForm.get('bienSoXe').setValue(data.bienKiemSoat);
    this.donBanHangForm.get('xeLayHang').setValue(data.tenGoi);
  }

  tinhLoiNhuan() {
    const data = this.donBanHangForm.getRawValue();
    console.log(data);
    const chietKhauCongTy = data.chietKhauCongTy;
    const chietKhauKhachHang = data.chietKhauKhachHang;
    const cuocVanChuyenThucTe = data.cuocVanChuyenThucTe;
    const chiPhiKhac = data.chiPhiKhac;
    this.donBanHangForm.get('loiNhuan').setValue(chietKhauCongTy - chietKhauKhachHang);
  }

  changeThoiDiemXuatHoaDon(event: any) {
    if (event === 1) {
      this.donBanHangForm.get('thoiDiemXuatHoaDon').setValue(null);
      this.donBanHangForm.get('thoiDiemXuatHoaDon').disable();
      this.donBanHangForm.get('thoiDiemXuatHoaDon').clearValidators();
      this.donBanHangForm.get('thoiDiemXuatHoaDon').updateValueAndValidity();
    } else {
      this.donBanHangForm.get('thoiDiemXuatHoaDon').enable();
      this.donBanHangForm.get('thoiDiemXuatHoaDon').setValidators([Validators.required]);
      this.donBanHangForm.get('thoiDiemXuatHoaDon').updateValueAndValidity();
    }
  }
}
