import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CheckAlreadyExistsValidator } from 'src/app/customValidators/check-already-exists.validator';
import { DonMuaHangService } from 'src/app/services/don-mua-hang.service';
import { FileDinhKemService } from 'src/app/services/file-dinh-kem.service';
import { KhoHangService } from 'src/app/services/kho-hang.service';
import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-m-add-edit-mua-hang-cn',
  templateUrl: './m-add-edit-mua-hang-cn.component.html',
  styleUrls: ['./m-add-edit-mua-hang-cn.component.scss']
})
export class MAddEditMuaHangCnComponent implements OnInit {

  @Input() idNew: any;
  checkpx = false;
  roleId: string;
  fdkId: any;
  FileURLs: any[] = [];
  FileName: any[] = [];
  dataFileURL: string;
  dataFileName: string;
  arrayDataFileURL:any[]=[];
  arrayDataFileName: any[] = [];
  _validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.pdf'];
  list: any[] = [];
  fName: any[] = [];
  fileData: any[] = [];
  isView = false;
  isAddNew: boolean;
  data: any;
  myFormGroup: FormGroup;
  currentUser: any;
  laiXes: any[] = [];
  nhaCungCaps: any[] = [];
  sanPhams: any[] = [];
  khoHangs: any[] = [];
  listLayHang:any[];

  loaiDonHang = 1
  thue: number;
  tinhTrangThanhToan = 1;
  isShowSaveChangeBtn: boolean;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private donMuaHangsv: DonMuaHangService,
    private khoHangsv: KhoHangService,
    private nhaCungCapsv: NhaCungCapService,
    private productsv: ProductService,
    private router: Router,
    private sharedService:SharedService,
    private modal:NzModalService,
    private fileDinhKemService : FileDinhKemService,
  ) { }

  ngOnInit(): void {
    this.sharedService.currentAddNew.subscribe(isAddNew => this.isAddNew = isAddNew);
    if (this.isAddNew)
      this.sharedService.emitChange({
        title: 'Thêm đơn mua hàng công nghiệp'
      });
    else
      this.sharedService.emitChange({
        title: 'Cập nhật đơn mua hàng công nghiệp'
      });
      this.sharedService.currentView.subscribe(isView => this.isView = isView);
    if(this.isView){
      this.sharedService.emitChange({
        title: 'Chi tiết đơn mua công nghiệp'
      });
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.khoHangsv.getAll().subscribe((rs: any) => {
      this.khoHangs = rs;
    });
    this.nhaCungCapsv.getAll().subscribe((rs: any) => {
      this.nhaCungCaps = rs;
    });
    this.productsv.getAllProduct().subscribe((rs: any) => {
      this.sanPhams = rs;
    });
    this.createForm();
    if (this.isAddNew) {
      var uuid = require("uuid");
      this.fdkId = uuid.v4();
      
      this.fileDinhKemService.Insert(this.fdkId).subscribe((rs: any) => {})
      
      this.myFormGroup.get('fileDinhKemId').setValue(this.fdkId)
     

      this.donMuaHangsv.CreateMaDonMuaTM(this.loaiDonHang).subscribe((rs: any) => {
          this.myFormGroup.get('maDonMua').setValue(`DMHCN${rs}`);
          console.log(rs)
      });
      this.tinhTrangThanhToan = 1;
    } else {
      
      this.sharedService.currentData.subscribe(data => this.data = data)
      this.loadFileDinhKem();
      this.myFormGroup.patchValue({
        ...this.data
      });
      this.myFormGroup.get(`ngayMua`).setValue(moment(this.data.ngayMua).format('YYYY-MM-DD'));
      this.myFormGroup.get(`ngayThanhToan`).setValue(moment(this.data.ngayThanhToan).format('YYYY-MM-DD'));
      console.log(this.myFormGroup)
    }

    if (this.currentUser.roleId !== 'KT' && this.currentUser.roleId !== 'ADMIN') {
      this.isView = true;
      this.myFormGroup.disable();
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].disable();
      }
    }
    if(this.isView){
      this.myFormGroup.disable();
    }
  

  }
  createForm() {
    this.myFormGroup = this.fb.group({
      donMuaHangId: [null],
      maDonMua: [{ value: null, disabled: true }, [Validators.required]],
      ngayMua: [moment().format('YYYY-MM-DD'), [Validators.required]],
      ngayThanhToan: [moment().format('YYYY-MM-DD')],
      nhaCungCapId: [null],
      maNhaCungCap:[null],
      tenNhaCungCap: [null],
      maSoThueNhaCungCap: [null],
      diaChiPhongGiaoDich: [null],
      diaChiDKKD: [null],
      emailNhaCungCap: [null],
      soDienThoaiNGuoiDaiDienPhapLuat:[null],
      soDienThoaiKeToan: [null],
      productId: [null, [Validators.required]],
      // productCode:[null,[Validators.required]],
      productCode:[null],
      productName: [null],
      retailPrice: [0],
      khoHangId: [null, [Validators.required]],
      maKho:[null],
      tenKho:[null],
      tongLuongMua: [0],
      giaBanLe: [0],
      chietKhauMua: [0],
      ghiChu: [null],
      thanhToan: [0],
      loaiNoiNhan:[null],
      noiNhanChiTiet:[],
      hinhThucThanhToan:[null],
      hoaDon:[null],
      donGiaTruocThue: [0],
      thueXuat: [],
      createdBy: [null],
      modifiedBy:[null],
      createdDate: [null],
      modifiedDate:[null],
      fileDinhKemName: [null],
      fileDinhKemId: [null],
      fileURL: [null],
      fileName: [null],
    });
  }
  submitForm() {
    if (this.myFormGroup.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
    }
    
    const data = this.myFormGroup.getRawValue();
    data.loaiDonHang = this.loaiDonHang
    const formData = new FormData();
    // this.fileData.forEach(element => {
    //   formData.append('files', element);
    // });
    if (this.isAddNew === true) {
      this.donMuaHangsv.Insert(data).subscribe((result: any) => {
        if (result === 1) {
          this.message.create('success', `Thêm ngành nghề thành công`);
          this.router.navigate(['/m-layout/m-quan-ly-mua-hang/m-mua-hang-cong-nghiep']);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
        }
      });
    } else {
      // this.loadFileDinhKem();
        this.donMuaHangsv.Update(data).subscribe((result: any) => {
        if (result === 1) {
          this.message.create('success', `Cập nhật thông tin ngành nghề thành công`);
          this.router.navigate(['/m-layout/m-quan-ly-mua-hang/m-mua-hang-cong-nghiep']);
        } else {
          this.message.create('error', `Sửa thông tin không thành công`);
        }
      });
    }
  }

  changeKhoHang(event: any) {
    if (this.myFormGroup.get(`khoHangId`).dirty) {
      const data = this.khoHangs.find(x => x.maKhoHang === event);
    }
  }

  changeSanPham(event: any) {
    if (this.myFormGroup.get(`productId`).dirty) {
      const data = this.sanPhams.find(x => x.productId === event);
      this.myFormGroup.get('productName').setValue(data.productName);
      this.myFormGroup.get('retailPrice').setValue(data.retailPrice);
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
 
  blurNgayMua() {
    const data = this.myFormGroup.getRawValue();
    if(data.hinhThucThanhToan == 0) {
      this.myFormGroup.patchValue({
        ngayThanhToan: data.ngayMua
      });
    }
  }

  blurSoLuongMua() {
    this.calulatorThanhToan();
  }

  blurGiaBanLe() {
    this.calulatorThanhToan();
  }

  blurChietKhauMua() {
    this.calulatorThanhToan();
  }
  blurThueXuat() {
    this.calulatorThanhToan();
  }

  blurDonGiaTruocThue () {
    this.calulatorThanhToan();
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

  blurMaDonHang() {
    const maDonMua = this.myFormGroup.get('maDonMua').value;
    if (this.isAddNew || (!this.isAddNew && this. data.maDonMua !== maDonMua)) {
      const isExists = this.list.filter(x => x.maDonMua === maDonMua).length > 0;
      this.myFormGroup.get('maDonMua').setValidators([CheckAlreadyExistsValidator(isExists)]);
      this.myFormGroup.get('maDonMua').updateValueAndValidity();
    } else {
      this.myFormGroup.get('maDonMua').setValidators([CheckAlreadyExistsValidator(false)]);
      this.myFormGroup.get('maDonMua').updateValueAndValidity();
    }
  }


  LoaithueXuat(){

  }

  calulatorThanhToan() {
    
    const myFormData = this.myFormGroup.getRawValue();
    const donGia = myFormData.tongLuongMua * myFormData.retailPrice;
    const chietKhau = myFormData.chietKhauMua;
    const thue= myFormData.thueXuat;
    const donGiaTruocThue = (donGia - chietKhau)/(1+this.thue);
    const thanhToan = donGia - chietKhau;
    this.myFormGroup.patchValue({
      thanhToan: thanhToan,
      donGiaTruocThue:donGiaTruocThue,
      thue:thue,
    });
  }
  changeThue(event: any){
    if(event == 0 ||event == 1){
      this.thue = 0
    }
  
    if(event == 2 ){
      this.thue = 0.05
    }
    if(event == 3){
      this.thue = 0.1
    }
    this.calulatorThanhToan()
  }
  openImage(image: string) {
    window.open(image);
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
  hasFileSize(fileSize) {
    if ((fileSize / 1024 / 1024) < 2048) { return true; }
    return false;
  }
  hasExtension(fileName, exts) {
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
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
    console.log(this.data)
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
  BackPage(){
    window.history.back();
  }

}
