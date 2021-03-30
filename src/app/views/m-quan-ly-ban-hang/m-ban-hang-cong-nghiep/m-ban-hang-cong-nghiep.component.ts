import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { CloneData } from 'src/app/shared/CloneData';
import { SearchEngine } from 'src/app/shared/searchEngine';
import {UserService } from 'src/app/services/user.service';
import { ConvertDateTime } from "src/app/shared/get-selected-array";
import * as moment from "moment";
import { DonBanHangTTService } from 'src/app/services/don-ban-hang-tt.service';
import { ActionSheetService } from 'ng-zorro-antd-mobile';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-ban-hang-cong-nghiep',
  templateUrl: './m-ban-hang-cong-nghiep.component.html',
  styleUrls: ['./m-ban-hang-cong-nghiep.component.scss']
})
export class MBanHangCongNghiepComponent implements OnInit {
  @Input() trangThai: any;
  isAddNew: boolean;
  loadingExportExcel:boolean;
  check: any;
  listOfData: any[] = [];
  listOfDataAll: any[] = [];
  roleId: string;
  getDateTime: any;
  loading: any;
  spinning: any;
  valueModel = '';
  searchValue = "";
  displayData: PagingParams = {
    fromDate: "",
    toDate: "",
  };
  total = 0;

  pageLimit = 30;
  public directionCount = 0;
  page = 0;
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false
    },
    direction: 'down',
    endReachedRefresh: true,
    height: 750,
    data: [],
    directionName: 'down'
  };
  dtPullToRefreshStyle = { height: this.state.height + 'px' };


  name = '选择';
  now = new Date();
  valueBegin = new Date(this.now.getFullYear(), this.now.getMonth(), 1);
  //valueEnd = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0);
  valueEnd = this.now;

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onOkBegin(result: any) {
    this.name = this.currentDateFormat(result, 'yyyy-mm-dd');
    this.valueBegin = result;

    this.displayData.fromDate = ConvertDateTime(result);
    console.log(ConvertDateTime(result));
  }
  onOkEnd(result: any) {
    this.name = this.currentDateFormat(result, 'yyyy-mm-dd');
    this.displayData.toDate = ConvertDateTime(result);
    this.valueEnd = result;
  }

  formatIt(date: Date, form: string) {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (form === 'YYYY-MM-DD') {
      return dateStr;
    }
    if (form === 'HH:mm') {
      return timeStr;
    }
    return `${dateStr} ${timeStr}`;
  }

  constructor(
    private router: Router,
    private modalService: NzModalService,
    private modal: NzModalService,
    private donbanhangsv:DonBanHangTTService,
    private message: NzMessageService,
    private userService:UserService,
    private _actionSheet: ActionSheetService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Đơn hàng công nghiệp'
    });
    this.valueBegin = new Date(moment().startOf("month").format("YYYY-MM-DD"));
    this.valueEnd = new Date(moment().format("YYYY-MM-DD"));
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
    this.onOkBegin(this.valueBegin);
    this.onOkEnd(this.valueEnd);
    this.roleId = localStorage.getItem('roleId');
    this.userService.checkQuyen(localStorage.getItem('userId') as any).subscribe((rs: any) => {
      this.check = rs;
    });
    this.LoadData();
    this.addItems(this.listOfData[0]);
    
  }
  pullToRefresh(event) {
    this.pageLimit += 30;
  }
  addItems(startIndex) {
    for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
      this.listOfData.push(this.listOfData[i]);
    }
  }
  filterTable() {
    this.LoadData();
  }
  themMoi() {
    this.isAddNew = true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-cong-nghiep/m-add-edit-ban-hang-cong-nghiep']);

  }

  editItem(data: any) {
    this.isAddNew = false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.sendData(data);
    this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-cong-nghiep/m-add-edit-ban-hang-cong-nghiep']);
  }
  chiTietDH(data: any) {
    this.sharedService.sendData(data);
    this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-cong-nghiep/m-chi-tiet-ban-hang-cong-nghiep']);
  }
  LoadData() {
    this.loading = true;
    this.displayData.userId = localStorage.getItem('userId');
    this.donbanhangsv.GetAllMobile(this.displayData,localStorage.getItem('userId')).subscribe((data: any) => {
      this.listOfData = data;
      console.log(this.listOfData);
      this.listOfDataAll = data;
      this.total = data.totalCount;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }

  changeSearch(event: any) {
    
    const arrCondition = [
      'maDonHang', 'loaiDonHang', 'createDateName', 'nguoiThem','tenKhachHang',
      'maSoThue','soDienThoaiNguoiDaiDien','diaChiKhachHang','email','soDienThoaiKeToan',
      'vanPhongGiaoDich','productName','retailPrice','tenKhoHang','tenVungCK',
      'chietKhauCongTy','chietKhauKhachHang','soLuongDuKien','soLuongThucTe','chiPhiKhac',
      'khuVucGiaoHang','cuocVanChuyenDuKien','cuocVanChuyenThucTe','diaDiemGiaoHang','lienHeNguoiNhanHang',
      'ngayGiaoHangDuKienName','ngayGiaoHangThucTeName','tenPhuongAnNhap','ghiChu','thongTinXe',
      'tinhTrangXeName','hinhThucThanhToan','ngaySauThanhToanName','ngayThanhToanName','soHoaDon',
      'thoiDiemXuatHoaDonName','thanhToanName','loaiThoiDiemXuatHoaDonName','lyDoHuyDuyet','createdDate',
      'ngayGiaoHangDuKien','ngayGiaoHangThucTe','ngaySauThanhToan','ngayThanhToan','thoiDiemXuatHoaDon'
    ];
    //console.log(arrCondition);
    this.displayData.Keyword = event;
    //console.log(this.displayData.Keyword);
    this.listOfData = SearchEngine(this.listOfDataAll, arrCondition, event);
  }
  checkCreate(tmp,cd)
  {
    if (this.roleId==='DX' || this.roleId==='PPKD' || this.roleId==='KT' || this.roleId==='GNLX')
    return 1;
    else if (this.roleId==='BLD' && cd===1)
    return 1;
    else if(localStorage.getItem('userId')===tmp)
    return 1;
    else return 0;
  }
  showActionSheet(data) {
    const BUTTONS = ['Cập nhật đơn hàng', 'Chi tiết', 'Hủy'];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 3,
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          if (this.checkCreate(data?.createdBy,data.chuyenDon))
            this.editItem(data);
          else {
            this.modalService.error({
              nzTitle: 'Thông báo',
              nzContent: 'Bạn không có quyền thay đổi thông tin này',
            });
          }
        }
        else if (buttonIndex === 1) {
          this.chiTietDH(data);
        }
      }
    );
  }
  checkcreate() {
    if (this.roleId === 'NVKD' || this.roleId === 'BLD')
      return true;
    return false;
  }
}