import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ActionSheetService } from 'ng-zorro-antd-mobile';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PagingParams } from 'src/app/models/PagingParams';
import { KhachHangLogService } from 'src/app/services/khach-hang-log.service';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/services/user.service';
import { ConvertDateTime } from 'src/app/shared/get-selected-array';
import { SearchEngine } from 'src/app/shared/searchEngine';


@Component({
  selector: 'app-m-luu-lich-su-KH',
  templateUrl: './m-luu-lich-su-KH.component.html',
  styleUrls: ['./m-luu-lich-su-KH.component.scss']
})
export class MLuuLichSuKHComponent implements OnInit {
  isAddNew: boolean;
  selectedId:any;
  loadingExportExcel: boolean;
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
    PageNumber: 1,
    PageSize: 20,
    Keyword: '',
    SortKey: '',
    SortValue: '',
    fromDate: "",
    toDate: "",
    KeywordCol: "",
    ColName: "",
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
  selectedUser: any;

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
    private khachHangLog: KhachHangLogService,
    private message: NzMessageService,
    private userService: UserService,
    private _actionSheet: ActionSheetService,
    private sharedService:SharedService,

  ) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Lịch sử khách hàng'
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
  chiTietDH(data: any) {
    this.sharedService.sendData(data);
    this.router.navigate(['/m-layout/m-khach-hang/m-luu-lich-su-kh/m-chi-tiet-luu-lich-su-kh']);
  }
  LoadData() {
    this.loading = true;
    this.displayData.userId = localStorage.getItem('userId');
    this.selectedId="";
    if(this.selectedUser){
      this.selectedId=this.selectedUser
    }
    this.khachHangLog.GetAllPaging(this.displayData,this.selectedId).subscribe((data: any) => {
      this.listOfData = data.items;
      console.log(this.listOfData);

      this.total = data.totalCount;
      this.displayData.PageNumber = data.currentPage;
      this.getPageSizeOption();
      this.loading = false;
      // delete all
      if (this.listOfData.length === 0 && this.displayData.PageNumber > 1) {
        this.displayData.PageNumber -= 1;
        this.LoadData();
      }
    });
  }

  changeSearch(event: any) {
    
    const arrCondition = ['tenKhachHang','maKhachHang','maSoThue',
    'createdBy','tenTruongThayDoi',
    'dienGiai','duLieuCu','duLieuMoi'];
    //console.log(arrCondition);
    this.displayData.Keyword = event;
    //console.log(this.displayData.Keyword);
    this.listOfData = SearchEngine(this.listOfData, arrCondition, event);
  }
  showActionSheet(data) {
    const BUTTONS = ['Chi tiết', 'Hủy'];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 3,
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.chiTietDH(data);
        }
      }
    );
  }
  getPageSizeOption() {
    const pageSizeOptions1 = [];
    if (this.total > 20) {
      for (let index = 20; index < this.total; index = (index * 2)) {
        pageSizeOptions1.push(index);
        // console.log(pageSizeOptions1);
      }
    } else {
      this.displayData.PageSize = 20;
    }
    pageSizeOptions1.push(this.total);
  }
}
