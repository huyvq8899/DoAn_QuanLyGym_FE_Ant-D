import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CheckAlreadyExistsValidator } from 'src/app/customValidators/check-already-exists.validator';
import { DataService } from 'src/app/services/data.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import * as moment from 'moment';
import { KhachHangService } from 'src/app/services/khach-hang.service';

@Component({
  selector: 'app-tao-don-mua-hang-modal',
  templateUrl: './tao-don-mua-hang-modal.component.html',
  styleUrls: ['./tao-don-mua-hang-modal.component.scss']
})
export class TaoDonMuaHangModalComponent implements OnInit {
  @Input() isAddNew: boolean;
  @Input() isView: boolean;
  @Input() data: any;
  list: any[] = [];
  stt = 1;
  roleId: string;
  donMuaHangForm: FormGroup;
  khachHangs: any[];
  tinhTrangThanhToan = 1;
  sanPhams: any[] = [
    { sanPhamId: '1', tenSanPham: 'Xăng RON 95-IV', vung1: 16570, vung2: 16900 },
    { sanPhamId: '2', tenSanPham: 'Xăng RON 95-III', vung1: 16470, vung2: 16790 },
    { sanPhamId: '3', tenSanPham: 'E5 RON 92-II', vung1: 15510, vung2: 15820 },
    { sanPhamId: '4', tenSanPham: 'DO 0,001S-V', vung1: 12720, vung2: 12970 },
    { sanPhamId: '5', tenSanPham: 'DO 0,05S-II', vung1: 12370, vung2: 12610 },
    { sanPhamId: '6', tenSanPham: 'Dầu hỏa 2-K', vung1: 11180, vung2: 11400 },
  ];
  khoHangs: any[] = [
    { khoHangId: '1', tenKhoHang: 'Kho 1' },
    { khoHangId: '2', tenKhoHang: 'Kho 2' },
    { khoHangId: '3', tenKhoHang: 'Kho 3' },
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
  cuocVanChuyens: any[] = [];
  cuocVanChuyensTmp: any[] = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
    private dataService: DataService,
    private khachhang:KhachHangService,
  ) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    this.cuocVanChuyens = this.cuocVanChuyensAll.filter(x => x.cuocVanChuyenId != null);
    this.cuocVanChuyensTmp = this.cuocVanChuyensAll.filter(x => x.cuocVanChuyenId != null);
    this.khachhang.getAllKH().subscribe((rs: any) => {
      //console.log(rs);
      this.khachHangs = rs;
    });

    this.createForm();

    if (this.isView === true) {
      this.donMuaHangForm.disable();
    } else {
      if (this.roleId === 'DH') {
        this.donMuaHangForm.disable();
        if (!this.isAddNew) {
          if (this.data.trangThai === 1) {
            this.donMuaHangForm.get('soLuongGiaoDichThucTe').enable();
          }
        }
      } else if (this.roleId === 'KT') {
        this.donMuaHangForm.disable();
        if (this.data && this.data.trangThai === 6) {
          this.donMuaHangForm.get('tinhTrangThanhToan').enable();
        }
      }
    }

    if (localStorage.getItem('ListDonBanHang')) {
      this.list = JSON.parse(localStorage.getItem('ListDonBanHang'));
    }

    if (this.isAddNew) {
      this.tinhTrangThanhToan = 1;

      if (localStorage.getItem('SttDonBanHang')) {
        // tslint:disable-next-line: radix
        this.stt = parseInt(localStorage.getItem('SttDonBanHang')) + 1;
      } else {
        this.stt = 1;
      }
      this.donMuaHangForm.get('maDonMuaHang').setValue(`DMH0000${this.stt}`);
    } else {
      this.tinhTrangThanhToan = this.data.tinhTrangThanhToan;
      this.donMuaHangForm.patchValue({
        ...this.data
      });
    }
  }

  createForm() {
    this.donMuaHangForm = this.fb.group({
      donMuaHangId: [null],
      maDonMuaHang: [null, [Validators.required]],
      ngayDonMuaHang: [moment().format('YYYY-MM-DD'), [Validators.required]],
      maKhachHang: [null, [Validators.required]],
      tenKhachHang: [null],
      loaiKhachHang: [null],
      tenLoaiKhachHang: [{ value: null, disabled: true }],
      sanPhamId: [null, [Validators.required]],
      tenSanPham: [null],
      vung1: [{ value: null, disabled: true }],
      vung2: [{ value: null, disabled: true }],
      khoHangId: [null, [Validators.required]],
      tenKhoHang: [null],
      chietKhauCongTy: [0],
      chietKhauKhachHang: [0],
      cuocVanChuyenId: [null, [Validators.required]],
      soLuongGiaoDuKien: [0],
      soLuongGiaoDichThucTe: [{ value: 0, disabled: true }],
      tinhTrangXe: [null, [Validators.required]],
      cuocVanChuyen: [{ value: null, disabled: true }],
      ngayGiaoHang: [null, [Validators.required]],
      diaDiemGiaoHang: [null, [Validators.required]],
      lienHeNguoiNhanHang: [null],
      thanhToan1: [2],
      thanhToan2: [null, [Validators.required]],
      hinhThucThanhToan: [null, [Validators.required]],
      tinhTrangThanhToan: [{ value: 1, disabled: true }],
      trangThai: [0],
      createdBy: [null],
      createdDate: [null],
      status: [null]
    });
  }

  submitForm() {
    if (this.donMuaHangForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.donMuaHangForm.controls) {
        this.donMuaHangForm.controls[i].markAsDirty();
        this.donMuaHangForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const data = this.donMuaHangForm.getRawValue();
    if (this.isAddNew === true) {
      this.message.success('Tạo thành công.');
      this.list = [
        ...this.list,
        data
      ];

      localStorage.setItem('SttDonMuaHang', this.stt + '');
      localStorage.setItem('ListDonBanHang', JSON.stringify(this.list));
      this.dataService.sendLoadData(true);
      this.modal.destroy(data);
    } else {
      const index = this.list.findIndex(x => x.maDonMuaHang === data.maDonMuaHang);
      if (index !== -1) {
        this.list[index] = data;
      }
      localStorage.setItem('ListDonBanHang', JSON.stringify(this.list));
      this.message.success('Cập nhật thành công.');
      this.dataService.sendLoadData(true);
      this.modal.destroy(data);
    }
  }

  closeModal() {
    this.modal.destroy();
  }

  changeKhachHang(event: any) {
    const data = this.khachHangs.find(x => x.maKhachHang === event);
    this.donMuaHangForm.get('tenKhachHang').setValue(data.tenKhachHang);
    if (data.loaiKhachHang === 1) {
      this.donMuaHangForm.get('tenLoaiKhachHang').setValue('Công nghiệp');
    } else {
      this.donMuaHangForm.get('tenLoaiKhachHang').setValue('Thương mại');
    }
  }

  changeSanPham(event: any) {
    const data = this.sanPhams.find(x => x.sanPhamId === event);
    this.donMuaHangForm.get('tenSanPham').setValue(data.tenSanPham);
    this.donMuaHangForm.get('vung1').setValue(data.vung1);
    this.donMuaHangForm.get('vung2').setValue(data.vung2);
  }

  changeKhoHang(event: any) {
    const data = this.khoHangs.find(x => x.khoHangId === event);
    this.donMuaHangForm.get('tenKhoHang').setValue(data.tenKhoHang);
  }

  changeDiaChi(event: any) {
    const data = this.cuocVanChuyens.find(x => x.cuocVanChuyenId === event);
    this.donMuaHangForm.get('cuocVanChuyen').setValue(data.cuocVanChuyen);
  }

  searchDiaChi(event: any) {
    const arrCondition = ['maCuocVanChuyen', 'tenThanhPho', 'tenQuanHuyen', 'cuocVanChuyen'];
    this.cuocVanChuyens = SearchEngine(this.cuocVanChuyensTmp, arrCondition, event);
    this.cuocVanChuyens = [
      { cuocVanChuyenId: null, maCuocVanChuyen: 'Mã cước vận chuyển', tenThanhPho: 'Tên thành phố', tenQuanHuyen: 'Tên quận huyện', cuocVanChuyen: 'Cước vận chuyển' },
      ...this.cuocVanChuyens
    ];
  }

  blurTien() {
    if (!this.donMuaHangForm.get('chietKhauCongTy').value) {
      this.donMuaHangForm.get('chietKhauCongTy').setValue(0);
    }

    if (!this.donMuaHangForm.get('chietKhauKhachHang').value) {
      this.donMuaHangForm.get('chietKhauKhachHang').setValue(0);
    }

    if (!this.donMuaHangForm.get('soLuongGiaoDuKien').value) {
      this.donMuaHangForm.get('soLuongGiaoDuKien').setValue(0);
    }

    if (!this.donMuaHangForm.get('soLuongGiaoDichThucTe').value) {
      this.donMuaHangForm.get('soLuongGiaoDichThucTe').setValue(0);
    }
  }

  blurMaDonHang() {
    const maDonMuaHang = this.donMuaHangForm.get('maDonMuaHang').value;
    if (this.isAddNew || (!this.isAddNew && this.data.maDonMuaHang !== maDonMuaHang)) {
      const isExists = this.list.filter(x => x.maDonMuaHang === maDonMuaHang).length > 0;
      this.donMuaHangForm.get('maDonMuaHang').setValidators([CheckAlreadyExistsValidator(isExists)]);
      this.donMuaHangForm.get('maDonMuaHang').updateValueAndValidity();
    } else {
      this.donMuaHangForm.get('maDonMuaHang').setValidators([CheckAlreadyExistsValidator(false)]);
      this.donMuaHangForm.get('maDonMuaHang').updateValueAndValidity();
    }
  }
}
