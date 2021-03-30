import { FileDinhKemService } from './../../../../../services/file-dinh-kem.service';
import { HttpClient } from '@angular/common/http';
import { LaiXeService } from 'src/app/services/lai-xe.service ';
import { DonMuaHangService } from './../../../../../services/don-mua-hang.service';
import { ProductService } from './../../../../../services/product.service';
import { NhaCungCapService } from './../../../../../services/nha-cung-cap.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CheckAlreadyExistsValidator } from 'src/app/customValidators/check-already-exists.validator';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { KhoHangService } from 'src/app/services/kho-hang.service';

@Component({
  selector: 'app-mua-hang-gui-kho-modal',
  templateUrl: './mua-hang-gui-kho-modal.component.html',
  styleUrls: ['./mua-hang-gui-kho-modal.component.scss']
})
export class MuaHangGuiKhoModalComponent implements OnInit {
  @Input() isAddNew: boolean;
  @Input() data: any;
  @Input() isView: boolean;
  fdkId: any;
  FileURLs: any[] = [];
  FileName: any[] = [];
  dataFileURL: string;
  dataFileName: string;
  arrayDataFileURL:any[]=[];
  arrayDataFileName: any[] = [];
  fileData: any[] = [];
  isFixAble2: boolean = true;
  isDuyetDonMuaHang: boolean;
  list: any[] = [];
  myFormGroup: FormGroup;
  khachHangs: any[];
  currentUser: any;
  sanPhams: any[] = [];
  khoHangs: any[] = [];
  cuocVanChuyensAll: any[] = [];
  nhaCungCaps: any[] = []
  listLayHang:any[];
  laiXes: any[] = []
  loaiDonHang = 2
  _validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.pdf'];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
    private dataService: DataService,
    private khoHangService:KhoHangService,
    private nhaCungCapService: NhaCungCapService,
    private productService: ProductService,
    private laiXeService: LaiXeService,
    private fileDinhKemService : FileDinhKemService,
    private donMuaHangService: DonMuaHangService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.khoHangService.getAll().subscribe((rs: any) => {
      this.khoHangs = rs;
    });
    this.nhaCungCapService.getAll().subscribe((rs: any) => {
      this.nhaCungCaps = rs;
    });
    this.productService.getAllProduct().subscribe((rs: any) => {
      this.sanPhams = rs;
    });
    this.laiXeService.getAll().subscribe((rs: any) => {
      this.laiXes = rs;
    });

    this.createForm();

    if (this.isAddNew) {
      var uuid = require("uuid");
      this.fdkId = uuid.v4();
      
      this.fileDinhKemService.Insert(this.fdkId).subscribe((rs: any) => {})
      
      this.myFormGroup.get('fileDinhKemId').setValue(this.fdkId)

      this.donMuaHangService.CreateMaDonMuaTM(this.loaiDonHang).subscribe((rs: any) => {
        this.myFormGroup.get('maDonMua').setValue(`DMHTM${rs}`);
      });
    } else {
      this.loadFileDinhKem();
      this.myFormGroup.patchValue({
        ...this.data
      });
      this.myFormGroup.get(`ngayMua`).setValue(moment(this.data.ngayMua).format('YYYY-MM-DD'));
      this.myFormGroup.get(`ngayThanhToan`).setValue(moment(this.data.ngayThanhToan).format('YYYY-MM-DD'));
      this.listLayHang = JSON.parse(this.myFormGroup.get(`layHangChiTiet`).value) ;
      const listLayHangChiTiet = this.myFormGroup.get(`listLayHangChiTiet`) as FormArray;
      listLayHangChiTiet.clear();
      this.listLayHang.forEach(element => {
        const formGorup = this.createLayHangChiTietForm();
        formGorup.patchValue({
          ...element
        });
        listLayHangChiTiet.push(formGorup);
      });
      this.blurSoLuongLay();
    }

    if (this.isView) {
      this.myFormGroup.disable();
      const formArry = this.myFormGroup.get(`listLayHangChiTiet`) as FormArray;
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].disable();
      }
    }
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      donMuaHangId: [null],
      maDonMua: [{ value: null, disabled: true }, [Validators.required]],
      nhaCungCapId: [null, [Validators.required]],
      tenNhaCungCap: [null],
      maSoThueNhaCungCap: [null],
      diaChiDKKD: [null],
      diaChiPhongGiaoDich: [null],
      emailNhaCungCap: [null],
      soDienThoaiNGuoiDaiDienPhapLuat: [null],
      soDienThoaiKeToan: [null],
      productId: [null, [Validators.required]],
      productName: [null],
      retailPrice: [0],
      khoHangId: [null],
      chietKhauMua: [0],
      tongLuongMua: [0],
      fileDinhKemId: [null],
      fileURL: [null],
      fileName: [null],
      thanhToan: [0],
      ngayMua: [moment().format('YYYY-MM-DD'), [Validators.required]],
      ngayThanhToan: [moment().format('YYYY-MM-DD'), [Validators.required]],
      layHangChiTiet: [null],
      listLayHangChiTiet: this.fb.array([this.createLayHangChiTietForm()]),
      trangThai: [0],
      createdBy: [null],
      createdDate: [null]
    });
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
        // this.fName.push(files[i].name);
        this.fileData.push(files[i]);
      }
      const data = this.myFormGroup.getRawValue();
      const formData = new FormData();
      this.fileData.forEach(element => {
        formData.append('files', element);
      });
      this.fileDinhKemService.GetFileById(data.fileDinhKemId).subscribe((rs: any) => {
        data.fileName = rs.fileName;
        data.fileURL = rs.fileURL;
      })
      this.fileDinhKemService.UploadFile(formData).subscribe((rs: any) => {
        if (rs.result) {
          if (data.fileURL != null) {
            data.fileURL += rs.files;
            data.fileName += rs.fileName;
          }
          else {
            data.fileURL = rs.files;
            data.fileName = rs.fileName;
          }
          this.fileDinhKemService.Update(data).subscribe((rs: any) =>{
            if (rs === 1) {
              this.fileDinhKemService.GetFileById(data.fileDinhKemId).subscribe((rs: any) => {
                console.log(rs)
                if(this.isAddNew){
                  this.dataFileURL = rs.fileURL;
                  this.dataFileName = rs.fileName;
                  this.myFormGroup.get('fileName').setValue(this.dataFileName);
                } else {
                  this.data.fileURL = rs.fileURL;
                  this.data.fileName = rs.fileName;
                  this.myFormGroup.get('fileName').setValue(this.data.fileName);
                }
                this.loadFileDinhKem();
              });
            } else {
              console.log('No');
            }
          })
        }
      });
    }
  }

  openImage(image: string) {
    window.open(image);
  }

  removeFile(i: number) {
    var tmptg = this.FileURLs[i];
    this.FileURLs.splice(i, 1);
    this.FileName.splice(i, 1);
    var sA = this.data.fileURL.split(";");
    sA.splice(i, 1);

    this.data.fileURL = "";
    for (var j = 0; j < sA.length; j++) {
      if (j != sA.length - 1) this.data.fileURL += sA[j] + ";";
      else this.data.fileURL += sA[j];
    }
    
    var tmp = this.data.fileName.split(";");
    tmp.splice(i, 1);
    this.data.fileName = "";
    for (var j = 0; j < tmp.length; j++) {
      if (j != tmp.length - 1) this.data.fileName += tmp[j] + ";";
      else this.data.fileName += tmp[j];
    }

    this.FileURLs = [];
    this.FileName = [];
    if (this.data.fileURL != null || this.dataFileURL != null) {
      if(this.isAddNew){
        this.arrayDataFileURL = this.dataFileURL.split(';')
        this.arrayDataFileName = this.dataFileName.split(';');
      } else {
        this.arrayDataFileURL = this.data.fileURL.split(';')
        this.arrayDataFileName = this.data.fileName.split(';');
      }
      this.arrayDataFileURL.forEach(element => {
        if (element != null && element != "")
          this.FileURLs.push(element);
      })
      this.arrayDataFileName.forEach(element => {
        if (element != null && element != "") {
          this.FileName.push(element);
        }
      })
    }
    const data = this.myFormGroup.getRawValue();
    if(this.isAddNew){
      data.fileName = this.dataFileName;
      data.fileURL = this.dataFileURL;
    } else{
      data.fileName = this.data.fileName;
      data.fileURL = this.data.fileURL;
    }
    this.fileDinhKemService.Delete(tmptg).subscribe(
      (result: any) => {
        if (result === null) {
          this.fileDinhKemService.Update(data).subscribe(
            (result: any) => {
              console.log('OK');
              this.myFormGroup.get('fileName').setValue(this.data.fileName);
            });
        } else {
          console.log('No');
        }
      }
    );
  }

  loadFileDinhKem() {
    this.FileURLs = [];
    this.FileName = [];
    if (this.dataFileURL != null || this.data.fileURL != null) {
      if(this.isAddNew){
        this.arrayDataFileURL = this.dataFileURL.split(';');
        this.arrayDataFileName = this.dataFileName.split(';');
      } else{
        this.arrayDataFileURL = this.data.fileURL.split(';');
        this.arrayDataFileName = this.data.fileName.split(';');
      }
      console.log(this.dataFileName)
      console.log(this.arrayDataFileName)
      this.arrayDataFileURL.forEach(element => {
        if (element != null && element != "")
          this.FileURLs.push(element);
      })
      this.arrayDataFileName.forEach(element => {
        if (element != null && element != "") {
          this.FileName.push(element);
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

  createLayHangChiTietForm() {
    return this.fb.group({
      ngayLay: [moment().format('YYYY-MM-DD'), [Validators.required]],
      dienGiai: [""],
      soLuongLay: [null],
      bienKiemSoat: [null],
      tenLaiXe: [null],
      tenKho: [null]
    });
  }

  addItemLayHangChiTiets() {
    const listLayHangChiTiet = this.myFormGroup.get(`listLayHangChiTiet`) as FormArray;
    listLayHangChiTiet.push(this.createLayHangChiTietForm());
  }

  removeItemLayHangChiTiets(index) {
    const listLayHangChiTiet = this.myFormGroup.get(`listLayHangChiTiet`) as FormArray;
    listLayHangChiTiet.removeAt(index);
  }

  blurTongLuongMua() {
    const listLayHangChiTiet = this.myFormGroup.getRawValue().listLayHangChiTiet;
    let tongLuongXuat = listLayHangChiTiet.reduce((a, b) => a + b.soLuongLay, 0);
    let soLuongConLai = this.myFormGroup.getRawValue().tongLuongMua - tongLuongXuat;
    this.myFormGroup.patchValue({
      soLuongConLai: soLuongConLai
    });
  }

  blurSoLuongLay() {
    const listLayHangChiTiet = this.myFormGroup.getRawValue().listLayHangChiTiet;
    let tongLuongXuat = listLayHangChiTiet.reduce((a, b) => a + b.soLuongLay, 0);
    let soLuongConLai = this.myFormGroup.getRawValue().tongLuongMua - tongLuongXuat;
    this.myFormGroup.patchValue({
      soLuongConLai: soLuongConLai
    });
  }

  submitForm() {
    if (this.myFormGroup.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }

      for (const i in this.myFormGroup.get(`listLayHangChiTiet`).value) {
        this.myFormGroup.get(`listLayHangChiTiet.${i}.soLuongLay`).markAsDirty();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.ngayLay`).markAsDirty();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.dienGiai`).markAsDirty();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.bienKiemSoat`).markAsDirty();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.tenLaiXe`).markAsDirty();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.khoHangId`).markAsDirty();

        this.myFormGroup.get(`listLayHangChiTiet.${i}.soLuongLay`).updateValueAndValidity();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.ngayLay`).updateValueAndValidity();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.dienGiai`).updateValueAndValidity();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.bienKiemSoat`).updateValueAndValidity();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.tenLaiXe`).updateValueAndValidity();
        this.myFormGroup.get(`listLayHangChiTiet.${i}.khoHangId`).updateValueAndValidity();
      }
      return;
    }
    var layHang = "[" ;
    // var tg=1;
    for (const i in this.myFormGroup.get('listLayHangChiTiet').value) {
      layHang +='{"ngayLay":"'+this.myFormGroup.get(`listLayHangChiTiet.${i}.ngayLay`).value+
      '","dienGiai":"'+this.myFormGroup.get(`listLayHangChiTiet.${i}.dienGiai`).value+
      '","soLuongLay":'+ this.myFormGroup.get(`listLayHangChiTiet.${i}.soLuongLay`).value+
      ',"bienKiemSoat":"'+ this.myFormGroup.get(`listLayHangChiTiet.${i}.bienKiemSoat`).value+
      '","tenLaiXe":"'+ this.myFormGroup.get(`listLayHangChiTiet.${i}.tenLaiXe`).value+
      '","tenKho":"'+ this.myFormGroup.get(`listLayHangChiTiet.${i}.tenKho`).value+'"}'+",";
    }
    layHang=layHang.substring(0, layHang.length - 1);
    layHang+="]";
    this.myFormGroup.get(`layHangChiTiet`).setValue(layHang);
    const data = this.myFormGroup.getRawValue();
    data.loaiDonHang = this.loaiDonHang
    const formData = new FormData();
    this.fileData.forEach(element => {
      formData.append('files', element);
    });
    if (this.isAddNew === true) {
      this.donMuaHangService.Insert(data).subscribe(
      (result: any) => {
        if (result === 1) {
          this.modal.destroy(result);
        } else {
          this.message.create('error', `Sửa thông tin không thành công`);
          this.modal.destroy(result);
        }
      });
      // this.dataService.sendLoadData(true);
      // this.modal.destroy(data);
    } else {
      this.loadFileDinhKem();
      this.donMuaHangService.Update(data).subscribe((result: any) => {
      if (result === 1) {
        this.modal.destroy(result);
      } 
      else {
        this.message.create('error', `Sửa thông tin không thành công`);
        this.modal.destroy(result);
      }
    });
  }
    // this.dataService.sendLoadData(true);
    // this.modal.destroy(data);
  }
  closeModal() {
    this.modal.destroy();
  }

  changeSanPham(event: any) {
    if (this.myFormGroup.get(`productId`).dirty) {
      const data = this.sanPhams.find(x => x.productId === event);
      this.myFormGroup.get('productName').setValue(data.productName);
      this.myFormGroup.get('retailPrice').setValue(data.retailPrice);
    }
  }

  changeKhoHang(event: any) {
    if (this.myFormGroup.get(`khoHangId`).dirty) {
      const data = this.khoHangs.find(x => x.maKhoHang === event);
    }
  }

  changeNhaCungCap(event: any) {
    if (this.myFormGroup.get(`nhaCungCapId`).dirty) {
      const data = this.nhaCungCaps.find(x => x.nhaCungCapId === event);
      this.myFormGroup.get('tenNhaCungCap').setValue(data.tenNhaCungCap);
      this.myFormGroup.get('maSoThueNhaCungCap').setValue(data.maSoThueNhaCungCap);
      this.myFormGroup.get('diaChiDKKD').setValue(data.diaChiDKKD);
      this.myFormGroup.get('diaChiPhongGiaoDich').setValue(data.diaChiPhongGiaoDich);
      this.myFormGroup.get('emailNhaCungCap').setValue(data.emailNhaCungCap);
      this.myFormGroup.get('soDienThoaiNGuoiDaiDienPhapLuat').setValue(data.soDienThoaiNGuoiDaiDienPhapLuat);
      this.myFormGroup.get('soDienThoaiKeToan').setValue(data.soDienThoaiKeToan);
    }
  }

  changexeId(event: any, i:any) {
    const data = this.laiXes.find(x => x.xeId === event);
    this.myFormGroup.get(`listLayHangChiTiet.${i}.tenLaiXe`).setValue(data.tenLaiXe)
  }

  blurTien() {
    if (!this.myFormGroup.get('chietKhauCongTy').value) {
      this.myFormGroup.get('chietKhauCongTy').setValue(0);
    }

    if (!this.myFormGroup.get('chietKhauKhachHang').value) {
      this.myFormGroup.get('chietKhauKhachHang').setValue(0);
    }

    if (!this.myFormGroup.get('soLuongGiaoDuKien').value) {
      this.myFormGroup.get('soLuongGiaoDuKien').setValue(0);
    }

    if (!this.myFormGroup.get('soLuongGiaoDichThucTe').value) {
      this.myFormGroup.get('soLuongGiaoDichThucTe').setValue(0);
    }
  }

  blurMaDonMua() {
    const maDonMua = this.myFormGroup.get('maDonMua').value;
    if (this.isAddNew || (!this.isAddNew && this.data.maDonMua !== maDonMua)) {
      const isExists = this.list.filter(x => x.maDonMua === maDonMua).length > 0;
      this.myFormGroup.get('maDonMua').setValidators([CheckAlreadyExistsValidator(isExists)]);
      this.myFormGroup.get('maDonMua').updateValueAndValidity();
    } else {
      this.myFormGroup.get('maDonMua').setValidators([CheckAlreadyExistsValidator(false)]);
      this.myFormGroup.get('maDonMua').updateValueAndValidity();
    }
  }

  // calulatorThanhToan() {
  //   const myFormData = this.myFormGroup.getRawValue();
  //   const thanhTien = myFormData.soLuongMua * myFormData.giaBanLe;
  //   const chietKhau = myFormData.chietKhauMua;
  //   const thanhToan = thanhTien - chietKhau;
  //   this.myFormGroup.patchValue({
  //     thanhToan: thanhToan
  //   });
  // }

}
