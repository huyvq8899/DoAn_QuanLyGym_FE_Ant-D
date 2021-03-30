import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CheckAlreadyExistsValidator } from 'src/app/customValidators/check-already-exists.validator';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { LyDoHuyDuyetModalComponent } from '../ly-do-huy-duyet-modal/ly-do-huy-duyet-modal.component';
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
import { ThanhToanModalComponent } from '../thanh-toan-modal/thanh-toan-modal.component';

@Component({
  selector: 'app-add-edit-don-ban-hang-modal',
  templateUrl: './add-edit-don-ban-hang-modal.component.html',
  styleUrls: ['./add-edit-don-ban-hang-modal.component.scss']

})
export class AddEditDonBanHangModalComponent implements OnInit {
  @Input() isAddNew: boolean;
  @Input() data: any;
  ckcKhanCap = false;
  ckckc = false;
  checkthanhtoan = true;
  soTienData: any[];
  chiTiet = 0;
  gttt = 0;
  ngaytt: any;
  checked = false;
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
  diaChis: any[];
  lienHes: any[];
  diaChitmp: any[];
  lienHetmp: any[];
  chietkhaus: any[];
  tongdungtich = 0;
  dungtichconlai = 0;
  tinhTrangThanhToan = 1;
  chietkhauct = 0;
  mucchenhlech = 0;
  selectStyles = {
    width: '500px'
  };
  loinhuans: any[];
  searchCustomerOverlayStyle = {
    width: "115px",
  };
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
    private modal: NzModalRef,
    private modalService: NzModalService,
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
    private loinhuansv: LoiNhuanService
  ) { }

  ngOnInit() {


    this.roleId = localStorage.getItem('roleId');

    this.khachhang.GetKHByUser(localStorage.getItem('userId')).subscribe((rs: any) => {

      this.khachHangs = rs;
    });
    this.donbanhangsv.getAllDiaChi().subscribe((rs: any) => {
      this.diaChis = rs;
      this.diaChitmp = rs
      //console.log(this.diaChis);
    });
    this.donbanhangsv.getAllLienHe().subscribe((rs: any) => {

      this.lienHes = rs;
      this.lienHetmp = rs
      //console.log(this.lienHes);
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
      //console.log(this.cuocVanChuyendata)
      // if (this.isAddNew && rs.length > 1) {
      //   this.donBanHangForm.get('cuocVanChuyenId').setValue(rs[1].cuocVanChuyenId);
      // }
    })
    this.khohang.getAll().subscribe((rs: any) => {
      this.khohangs = rs;
      //console.log(this.khohangs)
      if (this.isAddNew && rs.length > 0) {
        this.donBanHangForm.get('khoHangId').setValue(rs[0].khoHangId);
      }
    })
    this.phuongannhaphang.getAll().subscribe((rs: any) => {
      this.phuongannhaphangs = rs;
      //(this.phuongannhaphangs)
      // if (this.isAddNew && rs.length > 0) {
      //   this.donBanHangForm.get('phuongAnNhapId').setValue(rs[0].phuongAnNhapId);
      // }
    })
    this.product.getAllProduct().subscribe((rs: any) => {
      this.products = rs;
      //console.log(this.products)
      //if(this.isAddNew && rs.length > 0) { 
      //this.donBanHangForm.get('productId').setValue(rs[0].productId);
      // }
    })

    this.createForm();

    this.chietkhau.getAll().subscribe((rs: any) => {
      //console.log(rs);
      this.chietkhaus = rs;
      if (this.isAddNew && rs.length > 0) {
        //this.donBanHangForm.get('vungChietKhau').setValue(rs[0].id);
      }
      else {
        this.changeVungChietKhau(this.donBanHangForm.get('vungChietKhau').value);
      }
    });

    if (this.isAddNew) {
      this.donBanHangForm.get('soTien').setValue("");
      this.donBanHangForm.get('isKhanCap').setValue(0);
      this.donbanhangsv.CreateMaDon(localStorage.getItem('userName').toUpperCase()).subscribe((rs: any) => {
        this.donBanHangForm.get('maDonHang').setValue(rs);
      });
      //this.data.trangThai=0;
      //this.donBanHangForm.get('chuyendon').setValue(this.chuyendons[0].ma);
      //this.donBanHangForm.get('loaiDonHang').setValue(this.loaidonhangs[0].loai);
      this.donBanHangForm.get('hinhThucThanhToan').setValue(this.hinhthucthanhtoans[0].loai);
      this.donBanHangForm.get('tienThuDuKien').disable();
      if ((this.roleId === 'NVKD' || this.roleId === 'BLD')) {
        this.donBanHangForm.get('soLuongThucTe').disable();
        this.donBanHangForm.get('tinhTrangXe').disable();
        this.donBanHangForm.get('xeId').disable();
        this.donBanHangForm.get('tenLaiXe').disable();
        this.donBanHangForm.get('ngayGiaoHangThucTe').disable();
        this.donBanHangForm.get('cuocVanChuyenThucTe').disable();
        this.donBanHangForm.get('loaiThoiDiemXuatHoaDon').disable();
        this.donBanHangForm.get('thoiDiemXuatHoaDon').disable();
        this.donBanHangForm.get('tinhTrangThanhToan').disable();
        this.donBanHangForm.get('ngayThanhToan').disable();
        this.donBanHangForm.get('soHoaDon').disable();
        this.donBanHangForm.get('fileDinhKem').disable();
      }
    } else {
      this.loadFileDinhKem();
      this.loadPhieuXuat();
      this.loadBienBan();
      this.donBanHangForm.enable();
      this.donBanHangForm.patchValue({
        ...this.data
      });
      if (this.donBanHangForm.get('tinhTrangThanhToan').value === 1) {
        this.gttt = 1;
        this.checked = true;
        this.donBanHangForm.get('ckc').setValue(true);
      }
      else {
        this.gttt = 0;
        this.checked = false;
        this.donBanHangForm.get('ckc').setValue(false);
      }
      this.ckcKhanCap = this.donBanHangForm.get('isKhanCap').value;
      // if (this.donBanHangForm.get('isKhanCap').value === 1) {
      //   this.ckcKhanCap=true;
      // }
      // else {
      //   this.ckcKhanCap=false;
      // }
      //console.log(this.donBanHangForm.get('ckc').value)
      this.tinhLoiNhuan();
      this.tinhThanhToan(this.donBanHangForm.get('soTien').value);
      this.selectedChuyen = this.donBanHangForm.get('chuyenDon').value;

      if (this.data.chenhLechGiaFullName != 'Khác')
        this.donBanHangForm.get('chenhLechGia').disable();
      if (this.roleId === 'NVKD' && (this.data.bld === 0) && (this.data.trangThai != 11 && this.data.trangThai != 12 && this.data.trangThai != 13 && this.data.trangThai != 14)) {
        this.donBanHangForm.get('soLuongThucTe').disable();
        this.donBanHangForm.get('tinhTrangXe').disable();
        this.donBanHangForm.get('xeId').disable();
        this.donBanHangForm.get('tenLaiXe').disable();
        this.donBanHangForm.get('ngayGiaoHangThucTe').disable();
        this.donBanHangForm.get('cuocVanChuyenThucTe').disable();
        this.donBanHangForm.get('loaiThoiDiemXuatHoaDon').disable();
        this.donBanHangForm.get('thoiDiemXuatHoaDon').disable();
        this.donBanHangForm.get('tinhTrangThanhToan').disable();
        this.donBanHangForm.get('ngayThanhToan').disable();
        this.donBanHangForm.get('soHoaDon').disable();
        this.donBanHangForm.get('fileDinhKem').disable();
        this.donBanHangForm.get('tienThuDuKien').disable();
        if (this.data.thanhToan == '1') {
          this.donBanHangForm.get('ngaySauThanhToan').disable();
        } else {
          this.donBanHangForm.get('ngaySauThanhToan').enable();
          this.donBanHangForm.get('ngaySauThanhToan').setValidators([Validators.required]);
          this.donBanHangForm.get('ngaySauThanhToan').updateValueAndValidity();
        }

      }
      else if (this.roleId === 'BLD' && (this.data.bld === 1) && (this.data.trangThai === 1 || this.data.trangThai === 14 || this.data.trangThai === 15 || this.data.trangThai === 8 || this.data.trangThai === 7)) {
        this.donBanHangForm.get('soLuongThucTe').disable();
        this.donBanHangForm.get('tinhTrangXe').disable();
        this.donBanHangForm.get('xeId').disable();
        this.donBanHangForm.get('tenLaiXe').disable();
        this.donBanHangForm.get('ngayGiaoHangThucTe').disable();
        this.donBanHangForm.get('cuocVanChuyenThucTe').disable();
        this.donBanHangForm.get('loaiThoiDiemXuatHoaDon').disable();
        this.donBanHangForm.get('thoiDiemXuatHoaDon').disable();
        this.donBanHangForm.get('tinhTrangThanhToan').disable();
        this.donBanHangForm.get('ngayThanhToan').disable();
        this.donBanHangForm.get('soHoaDon').disable();
        this.donBanHangForm.get('fileDinhKem').disable();
        this.donBanHangForm.get('tienThuDuKien').disable();
        if (this.data.thanhToan == '1') {
          this.donBanHangForm.get('ngaySauThanhToan').disable();
        } else {
          this.donBanHangForm.get('ngaySauThanhToan').enable();
          this.donBanHangForm.get('ngaySauThanhToan').setValidators([Validators.required]);
          this.donBanHangForm.get('ngaySauThanhToan').updateValueAndValidity();
        }

      }
      else {
        this.chietkhauct = this.data.chietKhauCongTy;
        this.mucchenhlech = this.data.chenhLechGia;
        this.donBanHangForm.disable();
        //this.donBanHangForm.get('hinhThucThanhToan').enable;
        this.donBanHangForm.get('ckc').disable();
        if (this.roleId === 'DX') {
          //console.log(this.data.hinhThucThanhToan)
          if (this.data.hinhThucThanhToan === 'Tiền mặt') {
            //console.log('OK')
            //this.donBanHangForm.get('hinhThucThanhToan').enable();
            this.donBanHangForm.get('tienThuDuKien').enable();
            this.donBanHangForm.get('tienThuDuKien').setValidators([Validators.required]);
            this.donBanHangForm.get('tienThuDuKien').updateValueAndValidity();
          }
          this.donBanHangForm.get('cuocVanChuyenId').enable();
          this.donBanHangForm.get('phuongAnNhapId').enable();
          this.donBanHangForm.get('ngayGiaoHangDuKien').enable();
          this.donBanHangForm.get('ngayGiaoHangDuKien').setValidators([Validators.required]);
          this.donBanHangForm.get('ngayGiaoHangDuKien').updateValueAndValidity();
          this.donBanHangForm.get('cuocVanChuyenDuKien').enable();
          this.donBanHangForm.get('cuocVanChuyenDuKien').setValidators([Validators.required]);
          this.donBanHangForm.get('cuocVanChuyenDuKien').updateValueAndValidity();
          this.donBanHangForm.get('diaDiemGiaoHang').enable();
          this.donBanHangForm.get('diaDiemGiaoHang').setValidators([Validators.required]);
          this.donBanHangForm.get('diaDiemGiaoHang').updateValueAndValidity();
          this.donBanHangForm.get('lienHeNguoiNhanHang').enable();
          this.donBanHangForm.get('lienHeNguoiNhanHang').setValidators([Validators.required]);
          this.donBanHangForm.get('lienHeNguoiNhanHang').updateValueAndValidity();
          this.donBanHangForm.get('ghiChu').enable();

          this.donBanHangForm.get('khoHangId').enable();
          this.donBanHangForm.get('ngayGiaoHangThucTe').enable();
          this.donBanHangForm.get('soLuongThucTe').enable();
          this.donBanHangForm.get('tinhTrangXe').enable();
          this.donBanHangForm.get('xeId').enable();
          this.donBanHangForm.get('tenLaiXe').enable();
          this.donBanHangForm.get('cuocVanChuyenThucTe').enable();
          this.donBanHangForm.get('ngayGiaoHangThucTe').setValidators([Validators.required]);
          this.donBanHangForm.get('ngayGiaoHangThucTe').updateValueAndValidity();
          this.donBanHangForm.get('tinhTrangXe').setValidators([Validators.required]);
          this.donBanHangForm.get('tinhTrangXe').updateValueAndValidity();
          this.donBanHangForm.get('xeId').setValidators([Validators.required]);
          this.donBanHangForm.get('xeId').updateValueAndValidity();
          this.donBanHangForm.get('tenLaiXe').setValidators([Validators.required]);
          this.donBanHangForm.get('tenLaiXe').updateValueAndValidity();
        }
        else if (this.data.trangThai === 9 && this.roleId === 'GNLX') {
          this.donBanHangForm.get('ngayGiaoHangThucTe').enable();
          this.donBanHangForm.get('ngayGiaoHangThucTe').setValidators([Validators.required]);
          this.donBanHangForm.get('ngayGiaoHangThucTe').updateValueAndValidity();
          this.donBanHangForm.get('soLuongThucTe').enable();
          this.donBanHangForm.get('soLuongThucTe').setValidators([Validators.required]);
          this.donBanHangForm.get('soLuongThucTe').updateValueAndValidity();
          this.donBanHangForm.get('ghiChuLaiXe').enable();
          //this.donBanHangForm.get('fileBienBan').disable();
          this.checkbb = false;
          this.checkpx = false;
        }
        else if (this.data.trangThai === 10 && this.roleId === 'GNLX') {
          this.donBanHangForm.get('ngayGiaoHangThucTe').enable();
          this.donBanHangForm.get('ngayGiaoHangThucTe').setValidators([Validators.required]);
          this.donBanHangForm.get('ngayGiaoHangThucTe').updateValueAndValidity();
          this.donBanHangForm.get('soLuongThucTe').enable();
          this.donBanHangForm.get('soLuongThucTe').setValidators([Validators.required]);
          this.donBanHangForm.get('soLuongThucTe').updateValueAndValidity();
          this.donBanHangForm.get('ghiChuLaiXe').enable();
          if (this.data.hinhThucThanhToan === 'Tiền mặt') {
            this.donBanHangForm.get('tienThuThucTe').enable();
            this.donBanHangForm.get('tienThuThucTe').setValidators([Validators.required]);
            this.donBanHangForm.get('tienThuThucTe').updateValueAndValidity();
          }
          this.checkbb = false;
          this.checkpx = false;
        }
        else if (this.data.trangThai === 14 && this.roleId === 'GNLX') {
          this.checkbb = true;
          this.checkpx = true;
        }
        // else if (this.data.trangThai === 14 && this.roleId === 'GNLX') {
        //   this.checkbb = true;
        //   this.checkpx = true;
        // }
        else if (this.roleId === 'KT')//enable form cho kế toán
        {
          this.donBanHangForm.enable();
          this.checkthanhtoan = false;
          this.donBanHangForm.get('ngayThanhToan').disable();
          this.donBanHangForm.get('tinhTrangThanhToan').disable();
          //this.changeTinhTrangThanhToan(this.donBanHangForm.get('tinhTrangThanhToan').value);
          if (this.data.trangThai === 11 || this.data.trangThai === 12 || this.data.trangThai === 13) {
            this.donBanHangForm.get('soHoaDon').enable();
            this.donBanHangForm.get('soHoaDon').setValidators([Validators.required]);
            this.donBanHangForm.get('soHoaDon').updateValueAndValidity();
            this.donBanHangForm.get('loaiThoiDiemXuatHoaDon').enable();
            if (this.data.loaiThoiDiemXuatHoaDon === 1) {
              this.donBanHangForm.get('thoiDiemXuatHoaDon').disable();
            } else {
              this.donBanHangForm.get('thoiDiemXuatHoaDon').enable();
              this.donBanHangForm.get('thoiDiemXuatHoaDon').setValidators([Validators.required]);
              this.donBanHangForm.get('thoiDiemXuatHoaDon').updateValueAndValidity();
            }
            this.donBanHangForm.get('tinhTrangThanhToan').enable();
            if (this.data.tinhTrangThanhToan === 0) {
              this.donBanHangForm.get('ngayThanhToan').disable();
            } else {
              this.donBanHangForm.get('ngayThanhToan').enable();
              this.donBanHangForm.get('ngayThanhToan').setValidators([Validators.required]);
              this.donBanHangForm.get('ngayThanhToan').updateValueAndValidity();
            }
          }
          if (this.data.thanhToan === 2 && (this.data.trangThai == 11 || this.data.trangThai == 12 || this.data.trangThai == 13))
            this.checkfdk = false;
          else if (this.data.thanhToan === 1 && this.data.trangThai != 14)
            this.checkfdk = false;
        }
      }

    }
    this.donBanHangForm.get('maDonHang').disable();
    this.donBanHangForm.get('soTienThanhToan').disable();
    this.donBanHangForm.get('isKhanCap').enable();
  }

  createForm() {
    this.donBanHangForm = this.fb.group({
      donBanHangTTId: [null],
      maDonHang: [{ value: null, disabled: true }, [Validators.required]],
      loaiDonHang: [null, [Validators.required]],

      doiTuongID: [null, [Validators.required]],
      tenKhachHang: [null, [Validators.required]],//
      maSoThue: [null],//
      soDienThoaiNguoiDaiDien: [null],//
      diaChiKhachHang: [null],//
      email: [null],//
      soDienThoaiKeToan: [null],//
      vanPhongGiaoDich: [null],//

      productId: [null, [Validators.required]],
      retailPrice: [0],//
      khoHangId: [null],
      vungChietKhau: [null, [Validators.required]],
      chietKhauCongTy: [0],
      chenhLechGiaName: [null, [Validators.required]],
      chenhLechGia: [0],
      chietKhauKhachHang: [0],
      soLuongDuKien: [0],
      soLuongThucTe: [0],
      chiPhiKhac: [0],

      cuocVanChuyenId: [null, [Validators.required]],
      cuocVanChuyenDuKien: [0],
      cuocVanChuyenThucTe: [0],
      diaDiemGiaoHang: [null, [Validators.required]],
      lienHeNguoiNhanHang: [null, [Validators.required]],
      ngayGiaoHangDuKien: [null],
      ngayGiaoHangThucTe: [null],
      phuongAnNhapId: [null, [Validators.required]],
      ghiChu: [null],

      xeId: [null],
      tenLaiXe: [null],//
      tinhTrangXe: [null],
      ghiChuLaiXe: [null],
      fileBienBan: [null],

      hinhThucThanhToan: [null, [Validators.required]],
      tienThuDuKien: [null],
      tienThuThucTe: [0],
      thanhToan: [1],
      ngaySauThanhToan: [{ value: null, disabled: true }],
      tinhTrangThanhToan: [{ value: 0, disabled: true }],
      ngayThanhToan: [{ value: null, disabled: true }],
      soHoaDon: [null],
      thoiDiemXuatHoaDon: [{ value: null, disabled: true }],
      loaiThoiDiemXuatHoaDon: [{ value: 1, disabled: true }],

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

      isKhanCap: [null],
      soTien: [null],
      loiNhuan: [0],
      thanhTien: [0],
      soTienThanhToan: [0],
      ckc: [null],
      bld: [null]
    });
  }

  closeModal() {
    this.modal.destroy();
  }
  changechuyendon(event: any) {
    if (this.data.trangThai == 3)
      this.donBanHangForm.get('chuyenDon').setValue(event);
  }
  changeVungChietKhau(event: any) {
    if (this.isAddNew) {
      const data = this.chietkhaus.find(x => x.id === event);
      if (data.vungChietKhau === "Khác") {
        if (this.chietkhauct > 0)
          this.donBanHangForm.get('chietKhauCongTy').setValue(this.data.chietKhauCongTy);
        this.donBanHangForm.get('chietKhauCongTy').enable();


      }
      else {
        this.donBanHangForm.get('chietKhauCongTy').disable();
        this.donBanHangForm.get('chietKhauCongTy').setValue(data.chietKhau);
      }
    }
    else if ((this.roleId === 'NVKD') && (this.data.trangThai != 11 || this.data.trangThai != 12 || this.data.trangThai != 13)) {
      const data = this.chietkhaus.find(x => x.id === event);
      if (data.vungChietKhau === "Khác") {
        if (this.chietkhauct > 0)
          this.donBanHangForm.get('chietKhauCongTy').setValue(this.data.chietKhauCongTy);
        this.donBanHangForm.get('chietKhauCongTy').enable();


      }
      else {
        this.donBanHangForm.get('chietKhauCongTy').disable();
        this.donBanHangForm.get('chietKhauCongTy').setValue(data.chietKhau);
      }

    }
    else if ((this.roleId === 'BLD') && (this.data.bld === 1) && (this.data.trangThai === 1 || this.data.trangThai === 14 || this.data.trangThai === 15 || this.data.trangThai === 8 || this.data.trangThai === 7)) {
      const data = this.chietkhaus.find(x => x.id === event);
      if (data.vungChietKhau === "Khác") {
        if (this.chietkhauct > 0)
          this.donBanHangForm.get('chietKhauCongTy').setValue(this.data.chietKhauCongTy);
        this.donBanHangForm.get('chietKhauCongTy').enable();


      }
      else {
        this.donBanHangForm.get('chietKhauCongTy').disable();
        this.donBanHangForm.get('chietKhauCongTy').setValue(data.chietKhau);
      }

    }
    else if (this.roleId === 'KT') {
      const data = this.chietkhaus.find(x => x.id === event);
      if (data.vungChietKhau === "Khác") {
        if (this.chietkhauct > 0)
          this.donBanHangForm.get('chietKhauCongTy').setValue(this.data.chietKhauCongTy);
        this.donBanHangForm.get('chietKhauCongTy').enable();


      }
      else {
        this.donBanHangForm.get('chietKhauCongTy').disable();
        this.donBanHangForm.get('chietKhauCongTy').setValue(data.chietKhau);
      }
    }
    else {
      this.donBanHangForm.get('chietKhauCongTy').disable();
    }
  }
  changeChenhLechGia(event: any) {
    if (this.isAddNew) {
      const data = this.chenhlechs.find(x => x.chenhLechId === event);
      if (data.tenChenhLech === "Khác") {
        if (this.mucchenhlech > 0)
          this.donBanHangForm.get('chenhLechGia').setValue(this.data.chenhLechGia);
        this.donBanHangForm.get('chenhLechGia').enable();
      }
      else {
        this.donBanHangForm.get('chenhLechGia').disable();
        this.donBanHangForm.get('chenhLechGia').setValue(data.soChenhLech);
      }
    }
    else if ((this.roleId === 'NVKD') && (this.data.trangThai != 11 || this.data.trangThai != 12 || this.data.trangThai != 13)) {
      const data = this.chenhlechs.find(x => x.chenhLechId === event);
      if (data.tenChenhLech === "Khác") {
        if (this.mucchenhlech > 0)
          this.donBanHangForm.get('chenhLechGia').setValue(this.data.chenhLechGia);
        this.donBanHangForm.get('chenhLechGia').enable();
      }
      else {
        this.donBanHangForm.get('chenhLechGia').disable();
        this.donBanHangForm.get('chenhLechGia').setValue(data.soChenhLech);
      }
    }
    else if ((this.roleId === 'BLD') && (this.data.bld === 1) && (this.data.trangThai === 1 || this.data.trangThai === 14 || this.data.trangThai === 15 || this.data.trangThai === 8 || this.data.trangThai === 7)) {
      const data = this.chenhlechs.find(x => x.chenhLechId === event);
      if (data.tenChenhLech === "Khác") {
        if (this.mucchenhlech > 0)
          this.donBanHangForm.get('chenhLechGia').setValue(this.data.chenhLechGia);
        this.donBanHangForm.get('chenhLechGia').enable();
      }
      else {
        this.donBanHangForm.get('chenhLechGia').disable();
        this.donBanHangForm.get('chenhLechGia').setValue(data.soChenhLech);
      }
    }
    else if (this.roleId === 'KT') {
      const data = this.chenhlechs.find(x => x.chenhLechId === event);
      if (data.tenChenhLech === "Khác") {
        if (this.mucchenhlech > 0)
          this.donBanHangForm.get('chenhLechGia').setValue(this.data.chenhLechGia);
        this.donBanHangForm.get('chenhLechGia').enable();
      }
      else {
        this.donBanHangForm.get('chenhLechGia').disable();
        this.donBanHangForm.get('chenhLechGia').setValue(data.soChenhLech);
      }
    }
    else {
      this.donBanHangForm.get('chenhLechGia').disable();
    }
  }

  changeKhachHang(event: any) {
    const data = this.khachHangs.find(x => x.id === event);
    this.donBanHangForm.get('tenKhachHang').setValue(data.tenKhachHang);
    this.donBanHangForm.get('maSoThue').setValue(data.maSoThue);
    this.donBanHangForm.get('soDienThoaiNguoiDaiDien').setValue(data.soDienThoaiNguoiDaiDien);
    this.donBanHangForm.get('soDienThoaiKeToan').setValue(data.soDienThoaiKeToan);
    this.donBanHangForm.get('diaChiKhachHang').setValue(data.diaChi);
    this.donBanHangForm.get('email').setValue(data.email);
    this.donBanHangForm.get('vanPhongGiaoDich').setValue(data.vanPhongGiaoDich);
    this.donBanHangForm.get('chietKhauKhachHang').setValue(data.giaTrietKhau);
    this.donBanHangForm.get('phuongAnNhapId').setValue(data.phuongAnNhapId);
  }

  changeSanPham(event: any) {
    const data = this.products.find(x => x.productId === event);
    this.donBanHangForm.get('retailPrice').setValue(data.retailPrice);
  }

  changeKhoHang(event: any) {
    const data = this.khohangs.find(x => x.khoHangId === event);
    this.donBanHangForm.get('tenKhoHang').setValue(data.tenKhoHang);
  }

  changeDiaChi(event: any) {
    const data = this.cuocVanChuyens.find(x => x.cuocVanChuyenId === event);
    this.donBanHangForm.get('cuocVanChuyenDuKien').setValue(data.giaCuoc);
  }

  searchDiaChi(event: any) {
    console.log(event);
    const arrCondition = ['tinhThanhPho', 'quanHuyen', 'giaCuoc'];
    this.cuocVanChuyens = SearchEngine(this.cuocVanChuyensTmp, arrCondition, event);
    this.cuocVanChuyens = [
      { cuocVanChuyenId: null, tinhThanhPho: 'Tên thành phố', quanHuyen: 'Tên quận huyện', giaCuoc: 'Cước vận chuyển' },
      ...this.cuocVanChuyens
    ];
  }

  changexeId(event: any) {
    const data = this.laiXes.find(x => x.xeId === event);
    this.tongdungtich = data.tongDungTich;
    this.donBanHangForm.get('tenLaiXe').setValue(data.tenLaiXe);
  }
  checkdungtich() {
    if (this.donBanHangForm.get('soLuongThucTe').value > 0) {
      this.dungtichconlai = this.tongdungtich - this.donBanHangForm.get('soLuongThucTe').value;
      if (this.dungtichconlai >= 0)
        return 1;
      else return 0;
    }
    else {
      this.dungtichconlai = this.tongdungtich - this.donBanHangForm.get('soLuongDuKien').value;
      if (this.dungtichconlai >= 0)
        return 2;
      else return -1;
    }

  }
  blurTien() {
    if (!this.donBanHangForm.get('retailPrice').value) {
      this.donBanHangForm.get('retailPrice').setValue(0);
    }

    if (!this.donBanHangForm.get('soLuongDuKien').value) {
      this.donBanHangForm.get('soLuongDuKien').setValue(0);
    }

    if (!this.donBanHangForm.get('soLuongThucTe').value) {
      this.donBanHangForm.get('soLuongThucTe').setValue(0);
    }

    if (!this.donBanHangForm.get('chietKhauCongTy').value) {
      this.donBanHangForm.get('chietKhauCongTy').setValue(0);
    }

    if (!this.donBanHangForm.get('chietKhauKhachHang').value) {
      this.donBanHangForm.get('chietKhauKhachHang').setValue(0);
    }

    if (!this.donBanHangForm.get('chiPhiKhac').value) {
      this.donBanHangForm.get('chiPhiKhac').setValue(0);
    }

    if (!this.donBanHangForm.get('cuocVanChuyenThucTe').value) {
      this.donBanHangForm.get('cuocVanChuyenThucTe').setValue(0);
    }
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
        if (this.data.bld === 0) {
          if (this.roleId === 'NVKD') {
            status = 2;
          }
          else if (this.data.trangThai === 3 && this.roleId === 'PPKD') {
            status = 5;
          }
          else if (this.data.trangThai === 4 && this.roleId === 'BLD') {
            status = 6;
          }
          else if ((this.data.trangThai === 7 || this.data.trangThai === 9 || this.data.trangThai === 10) && this.roleId === 'DX') {
            status = 8;
          }
        }
        if (this.data.bld === 1) {
          if ((this.data.trangThai === 14 || this.data.trangThai === 7 || this.data.trangThai === 8 || this.data.trangThai === 15 || this.data.trangThai === 1) && this.roleId === 'BLD') {
            status = 6;
          }
          else if ((this.data.trangThai === 7 || this.data.trangThai === 9 || this.data.trangThai === 10) && this.roleId === 'DX') {
            status = 8;
          }
        }

        this.donBanHangForm.get('trangThai').setValue(status);
        this.donBanHangForm.get('isDuyet').setValue(false);
        this.donBanHangForm.get('lyDoHuyDuyet').setValue(rs);
        this.submitForm();
      }
    });
  }

  duyet() {
    if (this.donBanHangForm.get('loiNhuan').value >= this.loinhuans[0].mucLoiNhuan) {
      let cd = this.donBanHangForm.get('chuyenDon').value;
      let content = '';
      let status = 0;
      if (this.donBanHangForm.get('soLuongThucTe').value === 0 && this.roleId === 'DX') {
        this.modalService.error({
          nzTitle: 'Thông báo',
          nzContent: 'Số lượng thực tế phải khác 0',
        });
      }
      else if (this.donBanHangForm.get('cuocVanChuyenThucTe').value === 0 && this.roleId === 'DX') {
        this.modalService.error({
          nzTitle: 'Thông báo',
          nzContent: 'Cước vận chuyển thực tế phải khác 0',
        });
      }
      else if (this.donBanHangForm.get('cuocVanChuyenDuKien').value === 0 && this.roleId === 'DX') {
        this.modalService.error({
          nzTitle: 'Thông báo',
          nzContent: 'Cước vận chuyển dự kiến phải khác 0',
        });
      }
      else {
        if (this.roleId === 'NVKD') {
          content = 'Bạn có chắc chắn muốn đẩy đơn hàng này đến phó phòng kinh doanh hay không?';
          status = 3;
        }
        else if (this.roleId === 'BLD') {
          content = 'Bạn có chắc chắn muốn đẩy đơn hàng này đến nhân viên điều xe hay không?';
          status = 7;
        }
        else if (this.data.trangThai === 3 && this.roleId === 'PPKD') {
          if (cd === 0) {
            content = 'Bạn có chắc chắn muốn duyệt đơn và chuyển đơn hàng đến nhân viên điều xe không?';
            status = 7;
          }
          if (cd === 1) {
            content = 'Bạn có chắc chắn muốn duyệt đơn và chuyển đơn hàng đến ban lãnh đạo không?';
            status = 4;
          }
        }
        else if (this.roleId === 'DX') {
          content = 'Bạn có chắc chắn muốn duyệt chốt xe đơn hàng này không?';
          status = 9;
        }
        else if (this.data.trangThai === 9 && this.roleId === 'GNLX') {
          content = 'Bạn có chắc chắn xác nhận đã lấy hàng cho đơn hàng này?';
          status = 10;
        }
        else if (this.data.trangThai === 10 && this.roleId === 'GNLX') {
          content = 'Bạn có chắc chắn xác nhận đã giao hàng cho đơn hàng này?';
          status = 11;
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
      if (isDuyet === true) {
        if (this.roleId === 'DX' && this.data.trangThai == 7)
          return true;
        else if (this.roleId === 'PPKD' && this.data.trangThai == 3)
          return true;
        else if (this.roleId === 'BLD' && this.data.trangThai == 4)
          return true;
        else if (this.roleId === 'GNLX' && (this.data.trangThai == 9 || this.data.trangThai == 10))
          return true;
      }
      else {
        if (this.roleId === 'PPKD' && this.data.trangThai == 3)
          return true;
        else if (this.roleId === 'BLD') {
          if (this.data.bld === 0 && this.data.trangThai == 4) {
            return true;
          }
          // else
          // {
          //   if(this.data.trangThai===14 || this.data.trangThai===15 || this.data.trangThai===7 || this.data.trangThai===8)
          //   return true;
          // }
        }
        else if (this.roleId === 'DX' && (this.data.trangThai == 7 || this.data.trangThai == 9 || this.data.trangThai == 10))
          return true;
      }

    }

    //return false;
  }
  checkDayDon(isDuyet: boolean) {
    if (isDuyet === true) {
      if (this.isAddNew === false) {
        if (this.roleId === 'NVKD' && (this.data.trangThai != 11 && this.data.trangThai != 12 && this.data.trangThai != 13))
          return true;
        else if (this.roleId === 'BLD' && (this.data.bld === 1) && (this.data.trangThai === 15 || this.data.trangThai === 8 || this.data.trangThai === 7 || this.data.trangThai === 14 || this.data.trangThai === 1))
          return true;
        else
          return false;
      }
      else {
        return true;
      }
    }
    else {
      if (this.isAddNew === false)
      {
        if ((this.roleId === 'NVKD')) {
          if ((this.data.trangThai === 11 || this.data.trangThai === 12 || this.data.trangThai === 13))
            return false;
          else
            return true;
        }
        else if (this.roleId === 'BLD' && (this.data.bld === 1) && (this.data.trangThai === 15 || this.data.trangThai === 8 || this.data.trangThai === 7 || this.data.trangThai === 14 || this.data.trangThai === 1))
          return true;
        else
          return false;
      }
      else
      return false;
      
    }


  }
  checkSave(isDuyet: boolean) {
    if (isDuyet) {
      if (this.isAddNew)
        return true;
      else if ((this.roleId === 'GNLX') && (this.data.trangThai == 9 || this.data.trangThai == 10))
        return true;
      else if ((this.roleId === 'KT' && (this.data.trangThai == 11 || this.data.trangThai == 12)))
        return true;
      else
        return false;
    }
    else {
      if (this.isAddNew)
        return false;
      else {
        if ((this.roleId === 'NVKD' || this.roleId === 'DX') && (this.data.trangThai != 11 && this.data.trangThai != 12 && this.data.trangThai != 13))
          return true;
        else if (this.roleId === 'BLD' && (this.data.bld === 1) && (this.data.trangThai === 15 || this.data.trangThai === 8 || this.data.trangThai === 7 || this.data.trangThai === 14 || this.data.trangThai === 1))
          return true;
        else
          return false;
      }
    }
  }

  changeThanhToan(event: any) {
    if (event === 1) {
      this.donBanHangForm.get('ngaySauThanhToan').setValue(null);
      this.donBanHangForm.get('ngaySauThanhToan').disable();
      this.donBanHangForm.get('ngaySauThanhToan').clearValidators();
      this.donBanHangForm.get('ngaySauThanhToan').updateValueAndValidity();
    } else {
      this.donBanHangForm.get('ngaySauThanhToan').enable();
      this.donBanHangForm.get('ngaySauThanhToan').setValidators([Validators.required]);
      this.donBanHangForm.get('ngaySauThanhToan').updateValueAndValidity();
    }
  }

  // changeTinhTrangThanhToan(event: any) {
  //   if (event === 0) {
  //     this.donBanHangForm.get('ngayThanhToan').setValue(null);
  //     this.donBanHangForm.get('ngayThanhToan').disable();
  //     this.donBanHangForm.get('ngayThanhToan').clearValidators();
  //     this.donBanHangForm.get('ngayThanhToan').updateValueAndValidity();
  //   } else {
  //     this.donBanHangForm.get('ngayThanhToan').enable();
  //     this.donBanHangForm.get('ngayThanhToan').setValidators([Validators.required]);
  //     this.donBanHangForm.get('ngayThanhToan').updateValueAndValidity();
  //   }
  // }

  tinhLoiNhuan() {
    const data = this.donBanHangForm.getRawValue();
    const chietKhauCongTy = data.chietKhauCongTy;
    const chenhLechGia = data.chenhLechGia;
    const chietKhauKhachHang = data.chietKhauKhachHang;
    const cuocVanChuyenThucTe = data.cuocVanChuyenThucTe;
    const cuocVanChuyenDuKien = data.cuocVanChuyenDuKien;
    const chiPhiKhac = data.chiPhiKhac;
    const soLuongThucTe = data.soLuongThucTe;
    const retailPrice = data.retailPrice;
    //if (cuocVanChuyenThucTe > 0)
    this.donBanHangForm.get('loiNhuan').setValue(chietKhauCongTy + chenhLechGia - chietKhauKhachHang - cuocVanChuyenThucTe - chiPhiKhac);
    // else
    //   this.donBanHangForm.get('loiNhuan').setValue(chietKhauCongTy + chenhLechGia - chietKhauKhachHang - cuocVanChuyenDuKien - chiPhiKhac);
    if (soLuongThucTe > 0)
      this.donBanHangForm.get('thanhTien').setValue(soLuongThucTe * (retailPrice - chietKhauKhachHang - chiPhiKhac));
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

  //Các hàm xử lý file
  submitForm() {

    if (this.donBanHangForm.invalid) {
      console.log(this.donBanHangForm.getRawValue())
      // tslint:disable-next-line:forin
      for (const i in this.donBanHangForm.controls) {
        this.donBanHangForm.controls[i].markAsDirty();
        this.donBanHangForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    const data = this.donBanHangForm.getRawValue();
    if (this.isAddNew === true) {
      if (this.donBanHangForm.get('soLuongDuKien').value === 0) {
        this.modalService.error({
          nzTitle: 'Thông báo',
          nzContent: 'Số lượng dự kiến phải khác 0',
        });
      } else {
        if (this.roleId === 'NVKD') {
          data.chuyenDon = 0;
          data.bld = 0;
          if (this.donBanHangForm.get('trangThai').value === 3)
            data.trangThai = 3;
          else
            data.trangThai = 0;
          this.donbanhangsv.Insert(data).subscribe((rs: any) => {
            if (rs === 1) {
              this.modal.destroy(rs);
              this.message.create('success', `Tạo đơn bán hàng thành công`);

            } else {
              this.message.create('error', `Tạo đơn bán hàng không thành công`);
              this.modal.destroy(rs);
            }
          });
        }
        else if (this.roleId === 'BLD') {
          data.bld = 1;
          data.chuyenDon = 0;
          if (this.donBanHangForm.get('trangThai').value === 7)
            data.trangThai = 7;
          else
            data.trangThai = 14;
          this.donbanhangsv.Insert(data).subscribe((rs: any) => {
            if (rs === 1) {
              this.modal.destroy(rs);
              this.message.create('success', `Tạo đơn bán hàng thành công`);

            } else {
              this.message.create('error', `Tạo đơn bán hàng không thành công`);
              this.modal.destroy(rs);
            }
          });
        }

      }

    } else {
      if (this.roleId === 'NVKD') {
        if (this.donBanHangForm.get('trangThai').value === 3)
          data.trangThai = 3;
        else if (this.data.trangThai === 0)
          data.trangThai = 0;
        else
          data.trangThai = 1;
      }
      else if (this.roleId === 'KT') {
        if (this.donBanHangForm.get('ckc').value)
          data.trangThai = 13;
        else
          data.trangThai = 12;
      }
      else if (this.roleId === 'BLD') {
        if (this.donBanHangForm.get('trangThai').value === 7)
          data.trangThai = 7;
        else if (this.donBanHangForm.get('trangThai').value === 6)
          data.trangThai = 6;
        else if (this.data.trangThai === 14)
          data.trangThai = 14;
        else
          data.trangThai = 1;
      }
      else if (this.roleId === 'DX') {
        if (this.donBanHangForm.get('trangThai').value == 15)
          data.trangThai = 15;
        else if (this.donBanHangForm.get('trangThai').value == 8)
          data.trangThai = 8;
        else if (this.donBanHangForm.get('trangThai').value == 9)
          data.trangThai = 9;
        else
          data.trangThai = 1;
      }


      if (this.roleId === 'GNLX') {
        if (this.data.trangThai === 9) {
          if (this.donBanHangForm.get('phieuXuatKhoName').value == null || this.donBanHangForm.get('phieuXuatKhoName').value == "") {
            this.modalService.error({
              nzTitle: 'Thông báo',
              nzContent: 'Chưa nhập phiếu xuất kho',
            });
          }
          else {
            this.donbanhangsv.Update(data).subscribe(
              (result: any) => {
                if (result === 1) {
                  this.message.create('success', `Cập nhật thông tin thành công`);
                  this.modal.destroy(result);

                } else {
                  this.message.create('error', `Sửa thông tin không thành công`);
                  this.modal.destroy(result);
                }
              }
            );
          }

        }
        else if (this.data.trangThai === 10) {
          if (this.donBanHangForm.get('fileBienBanName').value == null || this.donBanHangForm.get('fileBienBanName').value == "") {
            this.modalService.error({
              nzTitle: 'Thông báo',
              nzContent: 'Chưa nhập biên bản bàn giao',
            });
          }
          else {
            if (this.data.hinhThucThanhToan === 'Tiền mặt') {
              if (this.donBanHangForm.get('tienThuThucTe').value === 0) {
                this.modalService.error({
                  nzTitle: 'Thông báo',
                  nzContent: 'Tiền thu thực tế phải khác 0',
                });
              }
              else {
                this.donbanhangsv.Update(data).subscribe(
                  (result: any) => {
                    if (result === 1) {
                      this.message.create('success', `Cập nhật thông tin thành công`);
                      this.modal.destroy(result);

                    } else {
                      this.message.create('error', `Sửa thông tin không thành công`);
                      this.modal.destroy(result);
                    }
                  }
                );
              }
            }
            else {
              this.donbanhangsv.Update(data).subscribe(
                (result: any) => {
                  if (result === 1) {
                    this.message.create('success', `Cập nhật thông tin thành công`);
                    this.modal.destroy(result);

                  } else {
                    this.message.create('error', `Sửa thông tin không thành công`);
                    this.modal.destroy(result);
                  }
                }
              );
            }
          }
        }
      }
      else if (this.roleId === 'DX' && this.data.hinhThucThanhToan === 'Tiền mặt') {
        if (this.donBanHangForm.get('tienThuDuKien').value === 0) {
          this.modalService.error({
            nzTitle: 'Thông báo',
            nzContent: 'Tiền thu dự kiến phải khác 0',
          });
        } else {
          this.donbanhangsv.Update(data).subscribe(
            (result: any) => {
              if (result === 1) {
                this.message.create('success', `Cập nhật thông tin thành công`);
                this.modal.destroy(result);

              } else {
                this.message.create('error', `Sửa thông tin không thành công`);
                this.modal.destroy(result);
              }
            }
          );
        }

      }
      else {
        this.donbanhangsv.Update(data).subscribe(
          (result: any) => {
            if (result === 1) {
              this.message.create('success', `Cập nhật thông tin thành công`);
              this.modal.destroy(result);

            } else {
              this.message.create('error', `Sửa thông tin không thành công`);
              this.modal.destroy(result);
            }
          }
        );
      }
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
  importFile(event: any) {
    const files = event.target.files;
    if (files && files[0]) {
      if (!this.hasExtension(event.target.files[0].name, this._validFileExtensions)) {
        console.log('File không hợp lệ.');
        this.message.error('File không hợp lệ.');
        return;
      }
      if (!this.hasFileSize(event.target.files[0].size)) {
        console.log('Dung lượng file vượt quá 2MB.');
        this.message.error('Dung lượng file vượt quá 2MB.');
        return;
      }
      for (var i = 0; i < files.length; i++) {
        this.fileData.push(files[i]);
      }
      const data = this.donBanHangForm.getRawValue();
      const formData = new FormData();
      this.fileData.forEach(element => {
        formData.append('files', element);
      });
      if (this.data.fileDinhKem != null) {
        data.fileDinhKem = this.data.fileDinhKem;
        data.fileDinhKemName = this.data.fileDinhKemName;
      }
      this.donbanhangsv.UploadFile(formData, 'FileDinhKem').subscribe((rs: any) => {
        if (rs.result) {
          if (data.fileDinhKem != null) {
            data.fileDinhKem += rs.files;

            data.fileDinhKemName += rs.fileName;
          }
          else {
            data.fileDinhKem = rs.files;
            data.fileDinhKemName = rs.fileName;

          }

          this.donbanhangsv.InsertFile(data, 'FileDinhKem').subscribe(
            (result: any) => {
              if (result === 1) {
                this.donbanhangsv.GetFile(this.data.donBanHangTTId).subscribe((rs: any) => {
                  this.data.fileDinhKem = rs.fileDinhKem;
                  this.data.fileDinhKemName = rs.fileDinhKemName;
                  this.loadFileDinhKem();
                });


              } else {
                console.log('No');
              }
            }
          );
        }
      })

    }
  }
  importPhieu(event: any) {
    const files = event.target.files;
    if (files && files[0]) {
      if (!this.hasExtension(event.target.files[0].name, this._validFileExtensions)) {
        console.log('File không hợp lệ.');
        this.message.error('File không hợp lệ.');
        return;
      }
      if (!this.hasFileSize(event.target.files[0].size)) {
        console.log('Dung lượng file vượt quá 2MB.');
        this.message.error('Dung lượng file vượt quá 2MB.');
        return;
      }
      for (var i = 0; i < files.length; i++) {
        this.fileData.push(files[i]);
      }
      const data = this.donBanHangForm.getRawValue();
      const formData = new FormData();
      this.fileData.forEach(element => {
        formData.append('files', element);
      });
      if (this.data.phieuXuatKho != null) {
        data.phieuXuatKho = this.data.phieuXuatKho;
        data.phieuXuatKhoName = this.data.phieuXuatKhoName;
      }
      this.donbanhangsv.UploadFile(formData, 'PhieuXuatKho').subscribe((rs: any) => {
        if (rs.result) {
          if (data.phieuXuatKho != null) {
            data.phieuXuatKho += rs.files;
            data.phieuXuatKhoName += rs.fileName;
          }
          else {
            data.phieuXuatKho = rs.files;
            data.phieuXuatKhoName = rs.fileName;

          }
          this.donbanhangsv.InsertFile(data, 'PhieuXuatKho').subscribe(
            (result: any) => {
              if (result === 1) {
                this.donbanhangsv.GetFile(this.data.donBanHangTTId).subscribe((rs: any) => {
                  this.data.phieuXuatKho = rs.phieuXuatKho;
                  this.data.phieuXuatKhoName = rs.phieuXuatKhoName;
                  this.donBanHangForm.get('phieuXuatKhoName').setValue(this.data.phieuXuatKhoName);
                  this.loadPhieuXuat();
                });


              } else {
                console.log('No');
              }
            }
          );
        }
      })

    }
  }
  importBienBan(event: any) {
    const files = event.target.files;
    if (files && files[0]) {
      if (!this.hasExtension(event.target.files[0].name, this._validFileExtensions)) {
        console.log('File không hợp lệ.');
        this.message.error('File không hợp lệ.');
        return;
      }
      if (!this.hasFileSize(event.target.files[0].size)) {
        console.log('Dung lượng file vượt quá 2MB.');
        this.message.error('Dung lượng file vượt quá 2MB.');
        return;
      }
      for (var i = 0; i < files.length; i++) {
        this.fileData.push(files[i]);
      }
      const data = this.donBanHangForm.getRawValue();
      const formData = new FormData();
      this.fileData.forEach(element => {
        formData.append('files', element);
      });
      if (this.data.fileBienBan != null) {
        data.fileBienBan = this.data.fileBienBan;
        data.fileBienBanName = this.data.fileBienBanName;
      }
      this.donbanhangsv.UploadFile(formData, 'FileBienBan').subscribe((rs: any) => {
        if (rs.result) {
          //console.log(rs)
          if (data.fileBienBan != null) {
            data.fileBienBan += rs.files;
            data.fileBienBanName += rs.fileName;
          }
          else {
            data.fileBienBan = rs.files;
            data.fileBienBanName = rs.fileName;

          }

          this.donbanhangsv.InsertFile(data, 'FileBienBan').subscribe(
            (result: any) => {
              if (result === 1) {
                this.donbanhangsv.GetFile(this.data.donBanHangTTId).subscribe((rs: any) => {
                  this.data.fileBienBan = rs.fileBienBan;
                  this.data.fileBienBanName = rs.fileBienBanName;
                  this.donBanHangForm.get('fileBienBanName').setValue(this.data.fileBienBanName);
                  this.loadBienBan();
                });


              } else {
                console.log('No');
              }
            }
          );
        }
      })

    }
  }
  hasFileSize(fileSize) {
    if ((fileSize / 1024 / 1024) < 2048) { return true; }
    return false;
  }
  hasExtension(fileName, exts) {
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
  }
  openImage(image: string) {
    window.open(image);
  }
  removeFile(i: number) {
    var tmptg = this.images[i];
    this.images.splice(i, 1);


    this.filesDK.splice(i, 1);
    var sA = this.data.fileDinhKem.split(";");
    sA.splice(i, 1);
    this.data.fileDinhKem = "";
    for (var j = 0; j < sA.length; j++) {
      if (j != sA.length - 1) this.data.fileDinhKem += sA[j] + ";";
      else this.data.fileDinhKem += sA[j];
    }
    // thêm
    var tmp = this.data.fileDinhKemName.split(";");
    tmp.splice(i, 1);
    this.data.fileDinhKemName = "";
    for (var j = 0; j < tmp.length; j++) {
      if (j != tmp.length - 1) this.data.fileDinhKemName += tmp[j] + ";";
      else this.data.fileDinhKemName += tmp[j];
    }

    this.images = [];
    this.imageURL = this.data.fileDinhKem;
    this.rsfile = this.imageURL.split(';')
    this.rsfile.forEach(element => {
      if (element != null && element != "")
        this.images.push(element);
    })
    this.fNameDK = [];
    this.filesDK = this.data.fileDinhKemName.split(';');
    this.filesDK.forEach(element => {
      if (element != null && element != "") {
        this.fNameDK.push(element);
      }
    })
    const data = this.donBanHangForm.getRawValue();

    data.fileDinhKemName = this.data.fileDinhKemName;
    data.fileDinhKem = this.data.fileDinhKem;
    this.donbanhangsv.DeleteFile(tmptg, 'FileDinhKem').subscribe(
      (result: any) => {
        if (result === null) {
          this.donbanhangsv.UpdateFile(data, 'FileDinhKem').subscribe(
            (result: any) => {
              console.log('OK');

            });

        } else {
          console.log('No');
        }
      }
    );
    //return this.http.delete(this.images[i]);

  }
  removePhieu(i: number) {
    var tmptg = this.phieus[i];
    this.phieus.splice(i, 1);


    this.filesPhieu.splice(i, 1);
    var sA = this.data.phieuXuatKho.split(";");
    sA.splice(i, 1);

    this.data.phieuXuatKho = "";
    for (var j = 0; j < sA.length; j++) {
      if (j != sA.length - 1) this.data.phieuXuatKho += sA[j] + ";";
      else this.data.phieuXuatKho += sA[j];
    }
    // thêm 
    var tmp = this.data.phieuXuatKhoName.split(";");
    tmp.splice(i, 1);
    this.data.phieuXuatKhoName = "";
    for (var j = 0; j < tmp.length; j++) {
      if (j != tmp.length - 1) this.data.phieuXuatKhoName += tmp[j] + ";";
      else this.data.phieuXuatKhoName += tmp[j];
    }

    this.phieus = [];
    if (this.data.phieuXuatKho != null) {
      this.phieuURL = this.data.phieuXuatKho;
      this.rsphieu = this.phieuURL.split(';')
      this.rsphieu.forEach(element => {
        if (element != null && element != "")
          this.phieus.push(element);
      })
      this.fNamePhieu = [];
      this.filesPhieu = this.data.phieuXuatKhoName.split(';');
      this.filesPhieu.forEach(element => {
        if (element != null && element != "") {
          this.fNamePhieu.push(element);
        }
      })
    }
    const data = this.donBanHangForm.getRawValue();
    data.phieuXuatKhoName = this.data.phieuXuatKhoName;
    data.phieuXuatKho = this.data.phieuXuatKho;
    this.donbanhangsv.DeleteFile(tmptg, 'PhieuXuatKho').subscribe(
      (result: any) => {
        if (result === null) {
          this.donbanhangsv.UpdateFile(data, 'PhieuXuatKho').subscribe(
            (result: any) => {
              console.log('OK');
              this.donBanHangForm.get('phieuXuatKhoName').setValue(this.data.phieuXuatKhoName);

            });

        } else {
          console.log('No');
        }
      }
    );

  }
  removeHoaDon(i: number) {
    var tmptg = this.hoadons[i];
    this.hoadons.splice(i, 1);


    this.filesHoaDon.splice(i, 1);
    var sA = this.data.fileBienBan.split(";");
    sA.splice(i, 1);

    this.data.fileBienBan = "";
    for (var j = 0; j < sA.length; j++) {
      if (j != sA.length - 1) this.data.fileBienBan += sA[j] + ";";
      else this.data.fileBienBan += sA[j];
    }
    // thêm 
    var tmp = this.data.fileBienBanName.split(";");
    tmp.splice(i, 1);
    this.data.fileBienBanName = "";
    for (var j = 0; j < tmp.length; j++) {
      if (j != tmp.length - 1) this.data.fileBienBanName += tmp[j] + ";";
      else this.data.fileBienBanName += tmp[j];
    }

    this.hoadons = [];
    if (this.data.fileBienBan != null) {
      this.hoadonURL = this.data.fileBienBan;
      this.rshd = this.hoadonURL.split(';')
      this.rshd.forEach(element => {
        if (element != null && element != "")
          this.hoadons.push(element);
      })
      this.fNameHoaDon = [];
      this.filesHoaDon = this.data.fileBienBanName.split(';');
      this.filesHoaDon.forEach(element => {
        if (element != null && element != "") {
          this.fNameHoaDon.push(element);
        }
      })
    }
    const data = this.donBanHangForm.getRawValue();
    data.fileBienBanName = this.data.fileBienBanName;
    data.fileBienBan = this.data.fileBienBan;
    this.donbanhangsv.DeleteFile(tmptg, 'FileBienBan').subscribe(
      (result: any) => {
        if (result === null) {
          this.donbanhangsv.UpdateFile(data, 'FileBienBan').subscribe(
            (result: any) => {
              console.log('OK');
              this.donBanHangForm.get('fileBienBanName').setValue(this.data.fileBienBanName);

            });

        } else {
          console.log('No');
        }
      }
    );
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
  tinhThanhToan(str: string) {
    this.chiTiet = 0;
    this.soTienData = JSON.parse(str)
    this.soTienData.forEach(element => {
      this.chiTiet += element.soTienThanhToan;
      this.ngaytt = element.ngayThanhToan;
    });
    this.donBanHangForm.get('soTienThanhToan').setValue(this.chiTiet);
  }
  themTT() {
    const modal = this.modalService.create({
      nzTitle: 'Chi tiết thanh toán',
      nzContent: ThanhToanModalComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '40%',
      nzStyle: { top: '20px' },
      nzBodyStyle: { padding: '5px' },
      nzComponentParams: {
        data: this.donBanHangForm.get('soTien').value
      },
      nzFooter: null
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.tinhThanhToan(rs);
        this.donBanHangForm.get('soTien').setValue(rs);
      }
    });
  }
  ckcThanhToan() {
    //console.log(this.donBanHangForm.get('ckc').value);
    if (this.donBanHangForm.get('ckc').value) {
      this.gttt = 1;
      this.donBanHangForm.get('tinhTrangThanhToan').setValue(1);
      this.donBanHangForm.get('ngayThanhToan').setValue(this.ngaytt);
      //console.log('true')
    }

    else {
      this.gttt = 0;
      this.donBanHangForm.get('tinhTrangThanhToan').setValue(0);
      this.donBanHangForm.get('ngayThanhToan').setValue('');
      //console.log('false')
    }

  }
  onChangeDiaChi(value: string) {
    this.diaChis = this.diaChitmp.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  onChangeLienHes(value: string) {
    this.lienHes = this.lienHetmp.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  ckcSetKhanCap() {
    // if (!this.isAddNew) {
    //   this.donbanhangsv
    //     .SetKhanCap(this.donBanHangForm.get('donBanHangTTId').value, this.donBanHangForm.get('isKhanCap').value)
    //     .subscribe((rs: any) => {
    //       // không thể set trạng thai offline
    //     });
    // }
  }
}