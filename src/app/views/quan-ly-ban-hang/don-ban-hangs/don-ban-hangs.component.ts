import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditDonHangThuongMaiModalComponent } from '../modals/add-edit-don-hang-thuong-mai-modal/add-edit-don-hang-thuong-mai-modal.component';
import {DonHangService} from 'src/app/services/don-hang.service'
import { PagingParams } from 'src/app/models/PagingParams';
import { ConvertDateTime } from "src/app/shared/get-selected-array";
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as moment from "moment";
import {UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-don-ban-hangs',
  templateUrl: './don-ban-hangs.component.html',
  styleUrls: ['./don-ban-hangs.component.scss']
})
export class DonBanHangsComponent implements OnInit {

  loadingExportExcel:boolean;
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
  constructor(

    private modalService: NzModalService,
    private DonHangService:DonHangService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
   
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
      // this.listOfData = this.listOfData.filter(x => x.loai === 2);

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
      console.log(this.selectedUser)
      this.selectedId=this.selectedUser
    }
    console.log(this.displayData);
    this.DonHangService.exportExcel(this.displayData,this.selectedId,localStorage.getItem('userId')).subscribe(
      (res: any) => {
        
        this.loadingExportExcel = false;
        const element = document.createElement("a");
        element.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.base64String}`;
        element.download = `Thong_ke_don_hang${year}-${month}-${day}-${hours}-${minute}-${sec}.xlsx`;
        element.click();
      },
      (err) => {
        console.log(err);
        this.loadingExportExcel = false;
      }
    );
  }
  filterTable() {
    this.LoadData();
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


  themMoi() {
      const modal = this.modalService.create({
        nzTitle: 'T???o m???i ????n h??ng',
        nzContent: AddEditDonHangThuongMaiModalComponent,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: '80%',
        nzStyle: { top: '20px' },
        nzBodyStyle: { padding: '5px' },
        nzComponentParams: {
          isAddNew: true,
        },
        nzFooter: null
      });
      modal.afterClose.subscribe((rs: any) => {
        console.log(rs);
        if (rs) {
          

          this.ngOnInit();
          
        }
      });
    
  }

  editItem(data: any) {
      
      const modal = this.modalService.create({
        nzTitle: 'C???p nh???t ????n h??ng',
        nzContent: AddEditDonHangThuongMaiModalComponent,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: '80%',
        nzStyle: { top: '20px' },
        nzBodyStyle: { padding: '5px' },
        nzComponentParams: {
          isAddNew: false,
          data,
        },
        nzFooter: null
      });
      modal.afterClose.subscribe((rs: any) => {
        console.log(rs);
        if (rs) {
          console.log('afterclosed')
          this.ngOnInit();

        }
      });
    
  }
  

  removeItem(data: any) {
    this.modalService.confirm({
      nzTitle: 'Th??ng b??o',
      nzContent: 'B???n c?? ch???c ch???n mu???n x??a ????n h??ng n??y kh??ng?',
      nzOkText: 'C??',
      nzOnOk: () => {
        let list = JSON.parse(localStorage.getItem('ListDonBanHang'));
        list = list.filter(x => x.donBanHangId !== data.donBanHangId);
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Kh??ng',
    });
  }
}
