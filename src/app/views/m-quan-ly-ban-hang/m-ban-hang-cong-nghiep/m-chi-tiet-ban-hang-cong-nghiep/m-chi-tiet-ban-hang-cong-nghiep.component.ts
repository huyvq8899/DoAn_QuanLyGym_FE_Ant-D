import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CheckAlreadyExistsValidator } from 'src/app/customValidators/check-already-exists.validator';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { ChietKhauService } from 'src/app/services/chiet-khau.service';
import { Script } from 'vm';
import { LaiXeService } from 'src/app/services/lai-xe.service ';
import { ProductService } from 'src/app/services/product.service';
import { KhoHangService } from 'src/app/services/kho-hang.service';
import { CuocVanChuyenService } from 'src/app/services/cuoc-van-chuyen.service';
import { PhuongAnNhapService } from 'src/app/services/phuong-an-nhap.service';
import { DonBanHangTTService } from 'src/app/services/don-ban-hang-tt.service';
import { HttpClient } from '@angular/common/http';
import { ChenhLechService } from 'src/app/services/chenh-lech.service';
import { LoiNhuanService } from 'src/app/services/loi-nhuan.service';
import { LyDoHuyDuyetModalComponent } from 'src/app/views/quan-ly-ban-hang/modals/ly-do-huy-duyet-modal/ly-do-huy-duyet-modal.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { NullLogger } from '@aspnet/signalr';

@Component({
  selector: 'app-m-chi-tiet-ban-hang-cong-nghiep',
  templateUrl: './m-chi-tiet-ban-hang-cong-nghiep.component.html',
  styleUrls: ['./m-chi-tiet-ban-hang-cong-nghiep.component.scss']

})
export class MChiTietBanHangCongNghiepComponent implements OnInit {
  isAddNew: boolean;
  tmpp= false;
  data: any;
  checkbb = false;
  checkpx = false;
  checkfdk = true;
  list: any[] = [];
  fNameDK: any[] = [];
  fNamePhieu: any[] = [];
  fNameHoaDon: any[] = [];
  filesDK: any[] = [];
  filesPhieu: any[] = [];
  filesHoaDon: any[] = [];
  fileData: any[] = [];
  images: any[] = [];
  imageURL: string;
  phieus: any[] = [];
  phieuURL: string;
  hoadons: any[] = [];
  hoadonURL: string;
  rsfile: any[] = [];
  rsphieu: any[] = [];
  rshd: any[] = [];
  isFixAble2: boolean = true;
  roleId: string;
  donBanHangForm: FormGroup;
  khachHangs: any[];
  chietkhaus: any[];
  tongdungtich = 0;
  dungtichconlai = 0;
  tinhTrangThanhToan = 1;
  chietkhauct = 0;
  mucchenhlech = 0;
  loinhuans: any[];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  _validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.pdf'];
  laiXes: any[] = [{ xeId: null, bienKiemSoat: 'Biển kiểm soát', tongDungTich: 'Tổng dung tích', tenLaiXe: null }];
  cuocVanChuyendata: any[] = [{ cuocVanChuyenId: null, maVanChuyen: null, tinhThanhPho: 'Tỉnh/Thành Phố', quanHuyen: 'Quận huyện', giaCuoc: 'Giá cước' }];
  cuocVanChuyensTmp: any[] = [];
  cuocVanChuyens: any[] = [];
  products: any[] = [];
  khohangs: any[] = [];
  chenhlechs: any[] = [];
  loaidonhangs: any[] = [
    { ma: '0', loai: 'Thông thường' },
    { ma: '1', loai: 'Hỗ trợ' },
  ];
  hinhthucthanhtoans: any[] = [
    { ma: '0', loai: 'Chuyển khoản' },
    { ma: '1', loai: 'Tiền mặt' },
  ];
  loaitinhtrangxes: any[] = [
    { ma: '0', loai: 'Đầy xe' },
    { ma: '1', loai: 'Ghép xe' },
  ];
  chuyendons: any[] = [
    { ma: 0, loai: 'Nhân viên điều xe' },
    { ma: 1, loai: 'Ban lãnh đạo' },
  ];
  selectedChuyen: 0;
  phuongannhaphangs: any[] = [];
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private khachhang: KhachHangService,
    private chietkhau: ChietKhauService,
    private laixe: LaiXeService,
    private product: ProductService,
    private khohang: KhoHangService,
    private cuocvanchuyen: CuocVanChuyenService,
    private phuongannhaphang: PhuongAnNhapService,
    private donbanhangsv: DonBanHangTTService,
    private http: HttpClient,
    private chenhlechsv: ChenhLechService,
    private loinhuansv: LoiNhuanService,
    private modalService: NzModalService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');

    this.khachhang.GetKHByUser(localStorage.getItem('userId')).subscribe((rs: any) => {

      this.khachHangs = rs;
    });
    this.loinhuansv.getByMaLN('BHCN').subscribe((rs: any) => {

      this.loinhuans = rs;
    });
    this.chenhlechsv.getAll().subscribe((rs: any) => {

      this.chenhlechs = rs;
    });
    this.laixe.getAll().subscribe((rs: any) => {
      //console.log(rs);
      rs.forEach(element => this.laiXes.push(element));
      const data = this.laiXes.find(x => x.xeId === this.donBanHangForm.get('xeId').value);
      this.tongdungtich = data.tongDungTich;

    });
    this.cuocvanchuyen.getAll().subscribe((rs: any) => {
      rs.forEach(element => this.cuocVanChuyens.push(element));
      rs.forEach(element => this.cuocVanChuyensTmp.push(element));
      rs.forEach(element => this.cuocVanChuyendata.push(element));
      
    })
    this.khohang.getAll().subscribe((rs: any) => {
      this.khohangs = rs;
      
    })
    this.phuongannhaphang.getAll().subscribe((rs: any) => {
      this.phuongannhaphangs = rs;
      
    })
    this.product.getAllProduct().subscribe((rs: any) => {
      this.products = rs;
    })

    this.createForm();
    this.chietkhau.getAll().subscribe((rs: any) => {
      //console.log(rs);
      this.chietkhaus = rs;
    });
    this.sharedService.currentData.subscribe(data => this.data = data);
      this.loadFileDinhKem();
      this.loadPhieuXuat();
      this.loadBienBan();
      this.donBanHangForm.enable();
      this.donBanHangForm.patchValue({
        ...this.data
      });
      this.tinhLoiNhuan();
      this.sharedService.emitChange({
        title: 'Chi tiết đơn hàng '+ this.data.maDonHang
      });
    this.donBanHangForm.disable();
  }

  createForm() {
    this.donBanHangForm = this.fb.group({
      donBanHangTTId: [null],
      maDonHang: [{ value: null, disabled: true }],
      loaiDonHang: [null],

      doiTuongID: [null],
      tenKhachHang: [null],//
      maSoThue: [null],//
      soDienThoaiNguoiDaiDien: [null],//
      diaChiKhachHang: [null],//
      email: [null],//
      soDienThoaiKeToan: [null],//
      vanPhongGiaoDich: [null],//

      productId: [NullLogger],
      retailPrice: [0],//
      khoHangId: [null],
      vungChietKhau: [null],
      chietKhauCongTy: [0],
      chenhLechGiaName: [null],
      chenhLechGia: [0],
      chietKhauKhachHang: [0],
      soLuongDuKien: [0],
      soLuongThucTe: [0],
      chiPhiKhac: [0],

      cuocVanChuyenId: [null],
      cuocVanChuyenDuKien: [0],
      cuocVanChuyenThucTe: [0],
      diaDiemGiaoHang: [null],
      lienHeNguoiNhanHang: [null],
      ngayGiaoHangDuKien: [null],
      ngayGiaoHangThucTe: [null],
      phuongAnNhapId: [null],
      ghiChu: [null],

      xeId: [null],
      tenLaiXe: [null],//
      tinhTrangXe: [null],
      ghiChuLaiXe: [null],
      fileBienBan: [null],

      hinhThucThanhToan: [null],
      tienThuDuKien: [null],
      tienThuThucTe: [0],
      thanhToan: [1],
      ngaySauThanhToan: [{ value: null, disabled: true }],
      tinhTrangThanhToan: [{ value: 0, disabled: true }],
      ngayThanhToan: [{ value: null, disabled: true }],
      soHoaDon: [null],
      thoiDiemXuatHoaDon: [{ value: null, disabled: true }],
      loaiThoiDiemXuatHoaDon: [{ value: 1, disabled: true }],
      loiNhuan: [0],
      fileDinhKem: [null],
      trangThai: [0],
      isDuyet: [null],
      lyDoHuyDuyet: [null],
      status: [null],
      fileDinhKemName: [null],
      phieuXuatKhoName: [null],
      fileBienBanName: [null],
      chuyenDon: [null],
      phieuXuatKho: [null],
    });
  }

  tinhLoiNhuan() {
    const data = this.donBanHangForm.getRawValue();
    const chietKhauCongTy = data.chietKhauCongTy;
    const chenhLechGia = data.chenhLechGia;
    const chietKhauKhachHang = data.chietKhauKhachHang;
    const cuocVanChuyenThucTe = data.cuocVanChuyenThucTe;
    const cuocVanChuyenDuKien = data.cuocVanChuyenDuKien;
    const chiPhiKhac = data.chiPhiKhac;
    //if (cuocVanChuyenThucTe > 0)
    this.donBanHangForm.get('loiNhuan').setValue(chietKhauCongTy + chenhLechGia - chietKhauKhachHang - cuocVanChuyenThucTe - chiPhiKhac);
    // else
    //   this.donBanHangForm.get('loiNhuan').setValue(chietKhauCongTy + chenhLechGia - chietKhauKhachHang - cuocVanChuyenDuKien - chiPhiKhac);

  }
  checkdungtich() {
    if (this.donBanHangForm.get('soLuongThucTe').value > 0) {
      this.dungtichconlai = this.tongdungtich - this.donBanHangForm.get('soLuongThucTe').value;
      if (this.dungtichconlai >= 0)
      {
        return 1;
        this.tmpp=true;
      }
        
      else return 0;
    }
    else {
      this.dungtichconlai = this.tongdungtich - this.donBanHangForm.get('soLuongDuKien').value;
      if (this.dungtichconlai >= 0)
      {
        return 2;
        this.tmpp=true;
      }
      else return -1;
    }

  }

  loadFileDinhKem() {
    this.images = [];
    this.fNameDK = [];
    if (this.data.fileDinhKem != null) {
      this.imageURL = this.data.fileDinhKem;
      this.rsfile = this.imageURL.split(';')
      this.rsfile.forEach(element => {
        if (element != null && element != "")
          this.images.push(element);
      })
      this.filesDK = this.data.fileDinhKemName.split(';');
      this.filesDK.forEach(element => {
        if (element != null && element != "") {
          this.fNameDK.push(element);
        }
      })
    }
  }
  loadPhieuXuat() {
    this.phieus = [];
    this.fNamePhieu = [];
    if (this.data.phieuXuatKho != null) {
      this.phieuURL = this.data.phieuXuatKho;
      this.rsphieu = this.phieuURL.split(';')
      this.rsphieu.forEach(element => {
        if (element != null && element != "")
          this.phieus.push(element);
      })
      this.filesPhieu = this.data.phieuXuatKhoName.split(';');
      this.filesPhieu.forEach(element => {
        if (element != null && element != "") {
          this.fNamePhieu.push(element);
        }
      })
    }
  }
  loadBienBan() {
    this.hoadons = [];
    this.fNameHoaDon = [];
    if (this.data.fileBienBan != null) {
      this.hoadonURL = this.data.fileBienBan;
      this.rshd = this.hoadonURL.split(';')
      this.rshd.forEach(element => {
        if (element != null && element != "")
          this.hoadons.push(element);
      })
      this.filesHoaDon = this.data.fileBienBanName.split(';');
      this.filesHoaDon.forEach(element => {
        if (element != null && element != "") {
          this.fNameHoaDon.push(element);
        }
      })
    }
  }
  quyenchuyen() {
    if (this.isAddNew === false) {
      if (this.roleId === 'PPKD')
        return true;
      else return false;
    }

  }
  checkBienBanNhan() {
    if (this.isAddNew === false) {
      if (this.data.trangThai === 10 || this.data.trangThai === 11 || this.data.trangThai === 12 || this.data.trangThai === 13 || this.data.trangThai === 14)
        return true;
      else return false;
    }

  }
  checkBienBanGiao() {
    if (this.isAddNew === false) {
      if (this.data.trangThai === 11 || this.data.trangThai === 12 || this.data.trangThai === 13 || this.data.trangThai === 14)
        return true;
      else return false;
    }

  }
  checkDayDon() {
    if ((this.roleId === 'NVKD' || this.roleId === 'BLD') && this.isAddNew)
      return true;
    else if (this.roleId === 'NVKD' && (this.data.trangThai == 0 || this.data.trangThai == 1 || this.data.trangThai == 6 || this.data.trangThai == 8))
      return true;
    else if (this.roleId === 'BLD' && (this.data.trangThai == 15))
      return true;
    else
      return false;
  }
  checkTienthu() {
    if (this.isAddNew)
      return false;
    else if (this.data.tienThuThucTe != 0 && this.data.tienThuThucTe != null)
      return true;
  }
  checkremovefile() {
    if (this.isAddNew)
      return true;
    else if (this.data.trangThai === 14)
      return false;
    else
      return true;
  }
  BackPage() {
    this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-cong-nghiep']);
  }
  openImage(image: string) {
    window.open(image);
  }


}