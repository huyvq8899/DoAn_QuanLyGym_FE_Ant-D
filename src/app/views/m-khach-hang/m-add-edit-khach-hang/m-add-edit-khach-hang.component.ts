import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VungService } from 'src/app/services/vung.service';
import {NganhNgheService} from 'src/app/services/nganh-nghe.service'
import {PhuongAnNhapService} from 'src/app/services/phuong-an-nhap.service'
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-add-edit-khach-hang',
  templateUrl: './m-add-edit-khach-hang.component.html',
  styleUrls: ['./m-add-edit-khach-hang.component.scss']
})
export class MAddEditKhachHangComponent implements OnInit {

  @Input() idNew: any;
  @Input() khachHangData: any;
  stt:any;
  listPhuongAnNhap:any[]=[];
  listPhuongAnNhapTmp:any[]=[];
  listVung:any[]=[];
  listVungTmp:any[]=[];
  listNganh:any[]=[];
  listNganhTmp:any[]=[];
  myFormGroup: any;
  selectedloaiKhachHang:any;
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
    private fb: FormBuilder,
    private router: Router,
    private VungService : VungService,
    private NganhNgheService:NganhNgheService,
    private PhuongAnNhapService:PhuongAnNhapService,
    private sharedService: SharedService,
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
  ngOnInit() {
    this.sharedService.currentData.subscribe(data => this.khachHangData = data);
    console.log(this.khachHangData);
    this.createForm();{
      this.myFormGroup.patchValue({
        tenNganhNghe:this.khachHangData.tenNganhNghe,
        tenVung:this.khachHangData.tenVung,
        ...this.khachHangData
      });
    }
    this.myFormGroup.disable();
    this.PhuongAnNhapService.getAll().subscribe((rs:any)=>{
      this.listPhuongAnNhap=rs;
      this.listPhuongAnNhapTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('vungId').setValue(rs[0].vungId);
      //   this.myFormGroup.get('maKhachHang').setValue(rs[0].maVung);
      // }
    })
    this.VungService.getAll().subscribe((rs:any)=>{
      this.listVung=rs;
      this.listVungTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('vungId').setValue(rs[0].vungId);
      //   this.myFormGroup.get('maKhachHang').setValue(rs[0].maVung);
      // }
    })
    this.myFormGroup.get('loaiKhachHang').setValue(this.cacLoaiKhachHang[0].loai);
    this.myFormGroup.get('trangThaiKhachHang').setValue(this.cacLoaiTrangThai[0].loai);
    this.NganhNgheService.getAll().subscribe((rs:any)=>{
      this.listNganh=rs;
      this.listNganhTmp=rs;
      // if(this.isAddNew && rs.length > 0) { 
      //   this.myFormGroup.get('nganhNgheId').setValue(rs[0].nganhNgheId);
      // }
    })
  }
  createForm() {
    this.myFormGroup = this.fb.group({
      id: [0],
      createdDate:[null],
      tenKhachHang: [null],
      maKhachHang: [null,],
      diaChi: [null],
      vanPhongGiaoDich:[null],
      diaChiGiaoHang:[null],
      email: [null],
      hanMuc:[null],
      thoiHanNo:[null],
      deXuatNhanVien:[null],
      sanLuongHangThang: [0],
      phuongAnNhapHang: [null],
      nhaCungCapHienTai: [null],
      giaTrietKhau: [null],
      mongMuonKhachHang: [null],
      cacVanDeCuaNhaCCCu: [null],
      nguoiLienHe: [null],
      chucVu: [null],
      soDienThoai: [null],
      luuY: [null],
      danhGiaChung: [null],
      loaiKhachHang: [null],
      trangThaiKhachHang: [null],   
      vungId:[null],
      nganhNgheId:[null],
      tenVung:[null],
      tenNganhNghe:[null],
      maSoThue:[null],
      nguoiDaiDienPhapLuat: [null],
      congNo:[null],
      checkCIC:[null],
      baoLanhThanhToan: [null],
      soDienThoaiNguoiDaiDien:[null],
      keToan:[null],
      soDienThoaiKeToan:[null],
      giamDoc:[null],

    });
  
  }

  BackPages() {
    this.router.navigate(['m-layout/m-khach-hang']);
  }

}
