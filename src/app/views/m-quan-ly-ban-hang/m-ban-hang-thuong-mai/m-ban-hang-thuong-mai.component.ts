import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SearchEngine } from 'src/app/shared/searchEngine';
import {DonHangService} from 'src/app/services/don-hang.service'
import { PagingParams } from 'src/app/models/PagingParams';
import { ConvertDateTime } from "src/app/shared/get-selected-array";
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as moment from "moment";
import {UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActionSheetService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-m-ban-hang-thuong-mai',
  templateUrl: './m-ban-hang-thuong-mai.component.html',
  styleUrls: ['./m-ban-hang-thuong-mai.component.scss']
})
export class MBanHangThuongMaiComponent implements OnInit {
  isChiTiet: boolean=false;
  isAddNew: boolean;
  isNVKD:boolean = false;
  isBld:boolean=false;
  selectedId:any;
  listUser:any[]=[];
  listUserTmp:any[]=[];
  getDateTime: any;
  valueModel="";
  searchValue="";
  listOfData: any[] = [];
  listOfDatatmp:any[]=[];
  pageSizeOptions: any[];
  listOfDataAll: any[] = [];
  total:any;
  selectedUser:any;
  loading = false;
  roleId: string;
  keyword: string;
  searchCustomerOverlayStyle = {
    width: "300px",
  };
  name = '选择';
  widthConfig = ['150px', '150px', '200px', '100px', '150px', '150px', '150px', '150px'];
  scrollConfig = { x: '1200px', y: '600px' };
  loai = 1;
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
    private DonHangService:DonHangService,
    private userService:UserService,
    private sharedService: SharedService,
    private router: Router,
    private _actionSheet: ActionSheetService,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Đơn hàng thương mại'
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
    if(this.roleId=="BLD" || this.roleId =="ADMIN"){
      this.isBld=true;
    }
    if(this.roleId == "NVKD"){
      this.isNVKD=true;
    }
    this.LoadData();
    if(this.isNVKD){
      this.userService.GetAllUserById(localStorage.getItem('userId')).subscribe((rs: any)=>{
        this.listUser=rs;
        this.listUserTmp=rs;
      })
    }else{
    this.userService.getAll().subscribe((rs: any)=>{
      this.listUser=rs;
      this.listUserTmp=rs;
    })
  }
    this.loai = 2;
    this.addItems(this.listOfData[0]);
      // this.listOfData = this.listOfData.filter(x => x.loai === 2);

  }
  pullToRefresh(event) {
    this.displayData.PageSize+=30;       
}
addItems(startIndex) {
  for (let i = startIndex; i < this.displayData.PageSize * (this.page + 1); i++) {
    this.listOfData.push(this.listOfData[i]);
  }
}
themMoi() {
  this.isAddNew=true;
  this.sharedService.changeAddNew(this.isAddNew);
  this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-thuong-mai/m-add-edit-don-hang-thuong-mai']);
  
}

editItem(data: any) {
  this.isAddNew=false;
  this.sharedService.changeAddNew(this.isAddNew);
  this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-thuong-mai/m-add-edit-don-hang-thuong-mai']);
  this.sharedService.sendData(data);
  console.log(data)
}
chiTietDH(data: any) {
  this.isAddNew=false;
  this.isChiTiet=true;
  this.sharedService.changeAddNew(this.isAddNew);
  this.sharedService.changeChiTiet(this.isChiTiet);
  this.sharedService.sendData(data);
  this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-thuong-mai/m-add-edit-don-hang-thuong-mai']);
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
  changeUser(event){
    this.selectedUser = event;
    console.log(event);
  }
  searchUser(event){
    const arrCondition = ["userName", "fullName", "title"];
    this.listUser = SearchEngine(this.listUserTmp, arrCondition, event);
  }
  LoadData() {
    this.loading = true;
    this.displayData.Keyword='';
    this.displayData.SortKey= '';
    this.displayData.SortValue= '';
    this.displayData.KeywordCol= "";
    this.displayData.ColName= "";
    this.selectedId="";
    if(this.selectedUser){
      this.selectedId=this.selectedUser
    }
    
   
    this.DonHangService.GetAllPaging(this.displayData,this.selectedId,localStorage.getItem('userId')).subscribe((data: any) => {
      this.listOfData = data.items;
      console.log(this.listOfData);
      this.listOfDatatmp = data.items;
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
  showActionSheet(data) {
    console.log('buttonIndex');
    const BUTTONS = ['Cập nhật đơn hàng', 'Chi tiết', 'Hủy'];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 3,
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex === 0)
          this.editItem(data);
        else if (buttonIndex === 1)
        this.chiTietDH(data);
      }
    );

  }
  filterTable() {
    this.LoadData();
  }
  changeToDate(event: any) {
    if (!event) {
      this.displayData.toDate = "";
    } else {
      //this.displayData.toDate = ConvertDateTime(event[0]);
    }
  }
  changeFromDate(event: any) {
    if (!event) {
      this.displayData.fromDate = "";
    } else {
      //this.displayData.fromDate = ConvertDateTime(event[0]);
    }
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
    if (sortField != null && sortOrder != null) {
      this.sort(sortconst);
    }
    if (filter.length > 0) {
      this.displayData.ColName = filter[0].key;
      this.displayData.KeywordCol = filter[0].value;
      if (this.displayData.KeywordCol == null) {
        this.displayData.KeywordCol = '';
      }
    }
    this.LoadData();
  }
  sort(sort: { key: string; value: string }): void {
    this.displayData.SortKey = sort.key;
    this.displayData.SortValue = sort.value;
    this.LoadData();
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
    this.pageSizeOptions = pageSizeOptions1;
  }

  onChangeSearch(cont,event: any) {
    const arrCondition =[];
    arrCondition.push(cont);

    //console.log(arrCondition);
    this.displayData.ColName = cont;
    this.displayData.KeywordCol = event;
    //console.log(event);
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  changeSearch(event: any) {
    this.displayData.Keyword = event;
    const arrCondition = ['maDonHang', 'tenKhachHang','maKhachHang', 'createdBy', 'giaSanPham','hinhThucThanhToan','thanhToan','kho','chietKhauCongTy','chietKhauKhachHang','maKhacHang','ngayGiaoHang','ngaySeThanhToan','ngayDaThanhToan','tongLuongGiao','soDienThoaiNguoiLienHe','email','diaChi','ghiChu','trangThai','nVKD','maSoThue','createdDate'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }



  

  removeItem(data: any) {
    this.modalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
      nzOkText: 'Có',
      nzOnOk: () => {
        let list = JSON.parse(localStorage.getItem('ListDonBanHang'));
        list = list.filter(x => x.donBanHangId !== data.donBanHangId);
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Không',
    });
  }
}
