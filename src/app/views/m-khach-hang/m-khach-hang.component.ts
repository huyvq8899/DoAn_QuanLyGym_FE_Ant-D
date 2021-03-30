import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { CloneData } from 'src/app/shared/CloneData';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { MAddEditKhachHangComponent } from './m-add-edit-khach-hang/m-add-edit-khach-hang.component';
import { UserService } from 'src/app/services/user.service';
import { ConvertDateTime } from "src/app/shared/get-selected-array";
import * as moment from 'moment';
import { SharedService } from 'src/app/shared/shared.service';
import { ActionSheetService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-m-khach-hang',
  templateUrl: './m-khach-hang.component.html',
  styleUrls: ['./m-khach-hang.component.scss']
})
export class MKhachHangComponent implements OnInit {

  isAddNew: boolean;
  check: any;
  listOfData: any[] = [];
  roleId: any;
  getDateTime: any;
  listOfDatatmp: any[] = [];
  isBLD: boolean = false;
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
    private modal: NzModalService,
    private khachhangsv: KhachHangService,
    private message: NzMessageService,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService,
    private _actionSheet: ActionSheetService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Danh sách khách hàng'
    });
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
    this.roleId = localStorage.getItem('roleId');
    if (this.roleId == "ADMIN" || this.roleId == "BLD") {
      this.isBLD = true;
    }
    this.userService.checkQuyen(localStorage.getItem('userId') as any).subscribe((rs: any) => {
      this.check = rs;
    });
    this.LoadData();
    console.log('OK')
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
  LoadData() {
    this.loading = true;
    this.khachhangsv.GetAllMobile(localStorage.getItem('userId') as any, this.displayData).subscribe((data: any) => {
      this.listOfData = data;
      this.total = data.totalCount;
      this.listOfDatatmp = data;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }
  changeSearch(event: any) {

    const arrCondition = ['tenKhachHang', 'diaChi', 'nganhNghe', 'soDienThoai', 'tenNganhNghe', 'maKhachHang', 'tenVung', 'loaiKhachHang', 'trangThaiKhachHang', 'nguoiLienHe', 'maSoThue', 'cacVanDeCuaNhaCCCu', 'nhaCungCapHienTai', 'nguoiThem', 'nguoiDaiDienPhapLuat', 'soDienThoaiNguoiDaiDien', 'keToan', 'soDienThoaiKeToan', 'congNo', 'checkCIC', 'hanMuc', 'createdDate', 'thoiHanNo', 'diaChiGiaoHang', 'vanPhongGiaoDich', 'email', 'deXuatNhanVien'];

    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  addNewItem() {
    this.isAddNew = true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.router.navigate(['m-layout/m-khach-hang/m-add-khach-hang']);

  }

  editItem(data: any) {
    this.isAddNew = false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.sendData(data);
    this.router.navigate(['m-layout/m-khach-hang/m-add-khach-hang']);
  }
  chiTietKH(data: any) {
    this.sharedService.sendData(data);
    this.router.navigate(['m-layout/m-khach-hang/m-add-edit-khach-hang']);
  }

  removeItem(id: any) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.khachhangsv.Delete(id).subscribe((rs: any) => {
          if (rs === -1) {
            this.message.error('Dữ liệu đang được sử dụng, không thể xóa');
            return;
          }
          if (rs > 0) {
            this.message.success('Xóa thành công');
            this.LoadData();
          } else {
            this.message.error('Lỗi xóa dữ liệu');
          }
        }, _ => {
          this.message.error('Error delete');
          console.log('Error delete');
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  checkCreate(tmp: any) {
    if (localStorage.getItem('userId') === tmp) {
      return 1;
    } else {
      return 0;
    }
  }
  showActionSheet(data) {
    const BUTTONS = ['Sửa', 'Chi tiết', 'Hủy'];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        //destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          if (this.checkCreate(data?.createdBy))
            this.editItem(data);
          else {
            this.modalService.error({
              nzTitle: 'Thông báo',
              nzContent: 'Bạn không có quyền thay đổi thông tin này',
            });
          }
        }
        else if (buttonIndex === 1) {
          this.chiTietKH(data);
        }
      }
    );

  }
}
