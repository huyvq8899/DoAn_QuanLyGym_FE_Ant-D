import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { UserService } from 'src/app/services/user.service';
import { ConvertDateTime } from 'src/app/shared/get-selected-array';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { KhachHangLogService } from './../../../services/khach-hang-log.service';

@Component({
  selector: 'app-luu-lich-su-thay-doi-KH',
  templateUrl: './luu-lich-su-thay-doi-KH.component.html',
  styleUrls: ['./luu-lich-su-thay-doi-KH.component.scss']
})
export class LuuLichSuThayDoiKHComponent implements OnInit {
  check: any;
  listOfData: any[] = [];
  roleId:any;
  getDateTime: any;
  selectedId:any;
  listUser:any[]=[];
  listUserTmp:any[]=[];
  listOfDatatmp: any[] = [];
  isBLD: boolean = false;
  loadingExportExcel:boolean;
  selectedUser:any;
  searchCustomerOverlayStyle = {
    width: "300px",
  };

  total = 0;
  totalPages = 0;
  pageSizeOptions: any[];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
  searchValue="";
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
  constructor(
    private modal: NzModalService,
    private khachhangsv:KhachHangService,
    private message: NzMessageService,
    private userService:UserService,
    private khachHangLogService:KhachHangLogService
  ) { }
  
  ngOnInit() {
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    // this.getDateTime = [
    //   moment().startOf("months").format("YYYY-MM-DD"),
    //   moment().format("YYYY-MM-DD"),
    // ];
    this.filterTable();
    this.userService.GetAllUserById(localStorage.getItem('userId')).subscribe((rs: any)=>{
      this.listUser=rs;
      this.listUserTmp=rs;
    })
    this.roleId= localStorage.getItem('roleId');
    if(this.roleId=="ADMIN" || this.roleId=="BLD"){
      this.isBLD=true;
    }
    this.userService.checkQuyen(localStorage.getItem('userId')).subscribe((rs: any)=>{
      this.check=rs;
    });
  }
  changeUser(event){
    this.selectedUser = event;
  }
  searchUser(event){
    const arrCondition = ["userName", "fullName", "title"];
    this.listUser = SearchEngine(this.listUserTmp, arrCondition, event);
  }
  filterTable() {
    this.LoadData();
  }
  exportExcel() {
    const dateOb = new Date();
    const day = ("0" + dateOb.getDate()).slice(-2);
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
    const year = dateOb.getFullYear();
    const hours = ("0" + dateOb.getHours()).slice(-2);
    const minute = ("0" + (dateOb.getMinutes() + 1)).slice(-2);
    const sec = ("0" + (dateOb.getSeconds() + 1)).slice(-2);

    this.loadingExportExcel = true;
    this.selectedId="";
    if(this.selectedUser){
      this.selectedId=this.selectedUser
    }
    console.log(this.displayData);
    this.khachHangLogService.exportExcel(this.displayData,this.selectedId).subscribe(
      (res: any) => {
        this.loadingExportExcel = false;
        const element = document.createElement("a");
        element.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.base64String}`;
        element.download = `Thong_ke_lich_su_thay_doi_KH${year}-${month}-${day}-${hours}-${minute}.xlsx`;
        element.click();
      },
      (err) => {
        console.log(err);
        this.loadingExportExcel = false;
      }
    );
  }
  LoadDL()
  {
    this.displayData.Keyword='';
    this.displayData.SortKey= '';
    this.displayData.SortValue= '';
    this.displayData.KeywordCol= "";
    this.displayData.ColName= "";
    {
      this.loading = true;
      this.displayData.userId = localStorage.getItem('userId');
      this.selectedId="";
      if(this.selectedUser){
        this.selectedId=this.selectedUser
      }
      this.khachHangLogService.GetAllPaging(this.displayData,this.selectedId).subscribe((data: any) => {
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
  }
  LoadData() {
    this.loading = true;
    this.displayData.userId = localStorage.getItem('userId');
    this.selectedId="";
    if(this.selectedUser){
      this.selectedId=this.selectedUser
    }
    this.khachHangLogService.GetAllPaging(this.displayData,this.selectedId).subscribe((data: any) => {
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
  refresh() {
    this.displayData = {
      PageNumber: 1,
    PageSize: 20,
    Keyword: '',
    SortKey: '',
    SortValue: '',
    //fromDate: "",
    //toDate: "",
    KeywordCol: "",
    ColName: "",
    };
    //this.LoadData();
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

  changeSearch(event: any) {
    
    const arrCondition = ['tenKhachHang','maKhachHang','maSoThue','createdBy','tenTruongThayDoi','dienGiai','duLieuCu','duLieuMoi'];
    //console.log(arrCondition);
    this.displayData.Keyword = event;
    //console.log(this.displayData.Keyword);
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
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
}
