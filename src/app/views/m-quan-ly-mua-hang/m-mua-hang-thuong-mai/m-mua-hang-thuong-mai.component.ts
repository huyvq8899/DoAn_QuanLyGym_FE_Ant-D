import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from '@syncfusion/ej2-charts';
import * as moment from 'moment';
import { ActionSheetService } from 'ng-zorro-antd-mobile';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { DonMuaHangService } from 'src/app/services/don-mua-hang.service';
import { ConvertDateTime } from 'src/app/shared/get-selected-array';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-mua-hang-thuong-mai',
  templateUrl: './m-mua-hang-thuong-mai.component.html',
  styleUrls: ['./m-mua-hang-thuong-mai.component.scss']
})
export class MMuaHangThuongMaiComponent implements OnInit {
  @ViewChildren("indexScroll") indexScrolls: QueryList<ElementRef>;
  stt = 0; 
  listOfData: any[] = [];
  listOfDataAll: any[] = [];
  getDateTime: any;
  loading: any;

  isView:boolean;
  isAddNew:boolean;
  valueModel = '';
  searchValue="";
  loaiDonHang =2;
  pageLimit = 10;
  currentUser: any;

  page = 0;
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false
    },
    direction: 'down',
    endReachedRefresh: true,
    height: 250,
    data: [],
    directionName: 'down'
  };
  dtPullToRefreshStyle = { height: this.state.height + 'px' };

  total = 0;
  selectedId:any;
  displayData: PagingParams = {
    fromDate: "",
    toDate: ""
  };
  
  name = '选择';
  now = new Date()
  valueBegin = new Date(this.now.getFullYear(), this.now.getMonth(), 1)
  valueEnd = new Date();

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
    this.displayData.fromDate = ConvertDateTime(result);
    this.valueBegin = result;
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
    private donmuahangsv: DonMuaHangService,
    private message: NzMessageService,
    private router: Router,
    private sharedService: SharedService,
    private _actionSheet: ActionSheetService
  ) {
    
   }

  ngOnInit(): void {
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
    this.sharedService.emitChange({
      title: 'Đơn mua hàng thương mại'
    });
    this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
    while(this.stt>this.pageLimit)
    {
      this.pageLimit+=5;
    }
    this.LoadData();
    this.addItems(this.listOfData[0]);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.listOfDataAll = [...this.listOfData];
  }

  
  ngAfterViewInit(){
    this.scroll(this.stt)
  }

  scroll(stt){
    this.indexScrolls.changes.subscribe(() => {
      this.indexScrolls.toArray()[stt].nativeElement.focus();
    })
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
    this.selectedId ="";
    this.donmuahangsv.GetAllMobile(this.displayData,this.selectedId, this.loaiDonHang).subscribe((data: any) => {
      this.listOfData = data;
      this.listOfDataAll = data;
      this.total = data.totalCount;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }
  
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    // console.log(pageIndex, pageSize, sortField, sortOrder, filter);
    // this.displayData.PageSize = pageSize;
    // this.displayData.PageNumber = pageIndex;
    const sortconst: any = {
      key: sortField,
      value: sortOrder
    }
    //his.sort(sortconst);
    // if (sortField != null && sortOrder != null) {
    //   this.sort(sortconst);
    // }
    if (filter.length > 0) {
      this.displayData.ColName = filter[0].key;
      this.displayData.KeywordCol = filter[0].value;
      if (this.displayData.KeywordCol == null) {
        this.displayData.KeywordCol = '';
      }
    }
    this.LoadData();
  }

  pullToRefresh(event) {
    this.pageLimit+=5;       
}

  // sort(sort: { key: string; value: string }): void {
  //   this.displayData.SortKey = sort.key;
  //   this.displayData.SortValue = sort.value;
  //   this.LoadData();
  // }

  changeSearch(event: any) {
    const arrCondition = ['ngayMua','ngayThanhToan','maNhaCungCap','maSoThueNhaCungCap',
    'tenNhaCungCap','emailNhaCungCap','diaChiDKKD','diaChiPhongGiaoDich','soDienThoaiKeToan','soDienThoaiNGuoiDaiDienPhapLuat',
     'productCode','productName','maKho','retailPrice','tongLuongMua','chietKhauMua','ngayMuaName','ngayThanhToanName'];
    //console.log(arrCondition);
    // this.displayData.Keyword = event;
    //console.log(this.displayData.Keyword);
    this.listOfData = SearchEngine(this.listOfDataAll, arrCondition, event);
  }

  removeItem(id) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.donmuahangsv.Delete(id).subscribe((rs: any) => {
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

  viewItem(data, stt) {
    this.isAddNew=false;
    this.isView = true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.changeView(this.isView);
    this.sharedService.sendData(data);
    this.sharedService.changeStt(stt)
    this.router.navigate(['/m-layout/m-quan-ly-mua-hang/m-mua-hang-thuong-mai/modal']);
  }

  addNewItem() {
    this.isAddNew=true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.isView = false;
    this.sharedService.changeView(this.isView);
    this.router.navigate(['/m-layout/m-quan-ly-mua-hang/m-mua-hang-thuong-mai/modal']);
  }

  editItem(data, stt) {
    this.isAddNew=false;
    this.isView = false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.changeView(this.isView);
    this.sharedService.sendData(data);
    this.sharedService.changeStt(stt)
    this.router.navigate(['/m-layout/m-quan-ly-mua-hang/m-mua-hang-thuong-mai/modal']);
  }

  showActionSheet(data, stt) {
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
          if (this.currentUser.roleId == 'KT')
            this.editItem(data, stt);
          else {
            this.modal.error({
              nzTitle: 'Thông báo',
              nzContent: 'Bạn không có quyền thay đổi thông tin này',
            });
          }
        }
        else if (buttonIndex === 1) {
          this.viewItem(data, stt);
        }
      }
    );
  }
  checkcreate() {
    if (this.currentUser.roleId === 'KT')
      return true;
    return false;
  }
}
