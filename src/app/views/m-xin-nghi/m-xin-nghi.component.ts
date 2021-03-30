import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { SearchEngine } from 'src/app/shared/searchEngine';

import { XinNghiService } from 'src/app/services/xin-nghi.service'
import { PagingParams } from 'src/app/models/PagingParams';
import { ConvertDateTime } from "src/app/shared/get-selected-array";
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as moment from "moment";
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { ActionSheetService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-m-xin-nghi',
  templateUrl: './m-xin-nghi.component.html',
  styleUrls: ['./m-xin-nghi.component.scss']
})
export class MXinNghiComponent implements OnInit {
  isAddNew: boolean;
  isNVKD: boolean = false;
  isBld: boolean = false;
  selectedId: any;
  getDateTime: any;
  valueModel = "";
  searchValue = "";
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  listOfDataAll: any[] = [];
  total: any;
  selectedUser: any;
  loading = false;
  roleId: string;
  name: any;
  displayData: PagingParams = {
    fromDate: "",
    toDate: "",
  };

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

  valueBegin = new Date();
  valueEnd = new Date();
  constructor(
    private modalService: NzModalService,
    private XinNghiService: XinNghiService,
    private message: NzMessageService,
    private sharedService: SharedService,
    private router: Router,
    private _actionSheet: ActionSheetService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Đơn xin nghỉ'
    });
    this.valueBegin = new Date(moment().startOf("month").format("YYYY-MM-DD"));
    this.valueEnd = new Date(moment().format("YYYY-MM-DD"));
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.onOkBegin(this.valueBegin);
    this.onOkEnd(this.valueEnd);

    this.roleId = localStorage.getItem('roleId');
    if (this.roleId == "BLD" || this.roleId == "ADMIN") {
      this.isBld = true;
    }
    if (this.roleId == "NVKD") {
      this.isNVKD = true;
    }
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
  LoadData() {
    this.loading = true;
    this.XinNghiService.GetAllMobile(this.displayData).subscribe((data: any) => {
      this.listOfData = data;
      this.listOfDatatmp = data;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }
  changeSearch(event: any) {
    console.log(event);
    const arrCondition = ['createdDate','createdDateName', 'thoiGianDiMuon', 'soNgayNghiPhep', 'lyDo',
     'lyDoTuChoi', 'trangThaiDuyet', 'tenDeXuat', , 'tenNguoiNghi','ngayNghi',
    'ngayNghiName','ngayDiLam','ngayDiLamName','ngayDiMuonName','ngayDiMuonName'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  filterTable() {
    this.LoadData();
  }
  changeToDate(event: any) {
    if (!event) {
      this.displayData.toDate = "";
    } else {
      //this.displayData.toDate = ConvertDateTime(event);
    }
  }
  changeFromDate(event: any) {
    if (!event) {
      this.displayData.fromDate = "";
    } else {
      //this.displayData.fromDate = ConvertDateTime(event);
    }
  }

  showActionSheet(data) {
    console.log('buttonIndex');
    const BUTTONS = ['Sửa', 'Xóa', 'Hủy'];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex === 0)
          this.editItem(data);
        else if (buttonIndex === 1)
          this.removeItem(data.xinNghiId);
      }
    );

  }
  themMoi() {
    this.isAddNew = true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.router.navigate(['m-layout/m-xin-nghi/m-add-edit-xin-nghi']);
  }

  editItem(data: any) {
    this.isAddNew = false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.sendData(data);
    this.router.navigate(['m-layout/m-xin-nghi/m-add-edit-xin-nghi']);
    // console.log(data);
    //   const modal = this.modalService.create({
    //     nzTitle: 'Cập nhật đơn nghỉ',
    //     nzContent: AddEditXinNghiComponent,
    //     nzMaskClosable: false,
    //     nzClosable: true,
    //     nzWidth: '50%',
    //     nzStyle: { top: '20px' },
    //     nzBodyStyle: { padding: '5px' },
    //     nzComponentParams: {
    //       isAddNew: false,
    //       data,
    //     },
    //     nzFooter: null
    //   });
    //   modal.afterClose.subscribe((rs: any) => {
    //     if (rs) {
    //       this.ngOnInit();

    //     }
    //   });
  }


  removeItem(data: any) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.XinNghiService.Delete(data).subscribe((rs: any) => {
          if (rs == 1) {
            this.message.success('Đã xóa');
            this.ngOnInit();
          }
          else {
            this.message.error('Đã có lỗi');
          }
        })
      }
    })

  }
  checkcreate() {
    if (this.roleId === 'NVKD' || this.roleId === 'BLD')
      return true;
    return false;
  }
}