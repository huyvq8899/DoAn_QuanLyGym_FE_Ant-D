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
import { AddEditDonBanHangModalComponent } from '../modals/add-edit-don-ban-hang-modal/add-edit-don-ban-hang-modal.component';
import { DonBanHangTTService } from 'src/app/services/don-ban-hang-tt.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-don-hang-thong-thuong',
  templateUrl: './don-hang-thong-thuong.component.html',
  styleUrls: ['./don-hang-thong-thuong.component.scss']
})
export class DonHangThongThuongComponent implements OnInit {
  @Input() trangThai: any;
  loadingExportExcel:boolean;
  check: any;
  listOfData: any[] = [];
  listOfNgayGiao: any[] = [];
  listOfDataAll: any[] = [];
  loading = false;
  roleId: string;
  getDateTime: any;
  selectedId:any;
  listUser:any[]=[];
  listUserTmp:any[]=[];
  keyword: string;
  selectedUser:any;
  ngayGiao: any;
  searchCustomerOverlayStyle = {
    width: "300px",
  };
  private value; 

  total = 0;
  tongBan:any;
  thanhTien: any;
  loiNhuan:any;
  totalPages = 0;
  pageSizeOptions: any[];
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
    private router: Router,
    private modalService: NzModalService,
    private modal: NzModalService,
    private donbanhangsv:DonBanHangTTService,
    private message: NzMessageService,
    private userService:UserService,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');

    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
    this.userService.GetAllUserByRole(localStorage.getItem('userId')).subscribe((rs: any)=>{
      this.listUser=rs;
      this.listUserTmp=rs;
    })
    this.filterTable();
    //this.LoadDL();
    this.userService.checkQuyen(localStorage.getItem('userId')).subscribe((rs: any)=>{
      this.check=rs;
    });
  }

  themMoi() { 
      const modal = this.modalService.create({
        nzTitle: 'Tạo mới đơn hàng',
        nzContent: AddEditDonBanHangModalComponent,
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
        if (rs) {
          this.ngOnInit();
        }
      });
    }


  editItem(data: any,index) { 
      const modal = this.modalService.create({
        nzTitle: 'Cập nhật đơn hàng',
        nzContent: AddEditDonBanHangModalComponent,
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
        if (rs) {
          this.ngOnInit();
        }
      });
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
  searchUser(event){
    const arrCondition = ["userName", "fullName", "title"];
    this.listUser = SearchEngine(this.listUserTmp, arrCondition, event);
  }
  changeUser(event){
    this.selectedUser = event;
    this.LoadDL();
  }
  changeDate(event: any) {
    if (!event[0] && !event[1]) {
      this.displayData.fromDate = "";
      this.displayData.toDate = "";
    } else {
      // = ConvertDateTime(event[0]);
      //this.displayData.toDate = ConvertDateTime(event[1]);
    }
  }
  filterTable() {
    this.LoadDL();
  }
  filterDL() { 
    
      const arrCondition = [
        'ngayGiaoHangDuKien','ngayGiaoHangDuKienName'
      ];
      this.displayData.Keyword='';
    this.displayData.SortKey= '';
    this.displayData.SortValue= '';
    //this.displayData.fromDate = "";
    //this.displayData.toDate = "";
    let latest_date =this.datepipe.transform(this.ngayGiao, 'dd/MM/yyyy');
    this.displayData.KeywordCol= latest_date ;
    this.displayData.ColName= "ngayGiaoHangDuKienName";
    this.selectedId="";
    this.displayData.userId = localStorage.getItem('userId');
    this.listOfData = SearchEngine(this.listOfNgayGiao, arrCondition, this.ngayGiao);
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
      this.donbanhangsv.GetAllPaging(this.displayData,localStorage.getItem('userId'),this.selectedId).subscribe((data: any) => {
        this.ngayGiao="";
        this.listOfData = data.items;
        console.log(this.listOfData);
        this.listOfDataAll = data.items;
        this.total = data.totalCount;
        this.findsum(this.listOfData);
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
    this.ngayGiao="";
    this.displayData.userId = localStorage.getItem('userId');
    this.selectedId="";
    if(this.selectedUser){
      this.selectedId=this.selectedUser
    }
    this.donbanhangsv.GetAllPaging(this.displayData,localStorage.getItem('userId'),this.selectedId).subscribe((data: any) => {
      this.listOfData = data.items;
      console.log(this.listOfData);
      this.listOfDataAll = data.items;
      this.listOfNgayGiao = data.items;
      this.total = data.totalCount;
      this.findsum(this.listOfData);
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
  findsum(data){   
    this.tongBan=0;
    this.thanhTien=0;
    this.loiNhuan=0   
    this.value=data    
    for(let j=0;j<data.length;j++){   
      if(this.value[j].trangThai===11 || this.value[j].trangThai===12 || this.value[j].trangThai===13 || this.value[j].trangThai===14)
      {
        this.tongBan+= this.value[j].soLuongThucTe
        this.loiNhuan+= this.value[j].loiNhuan
        this.thanhTien+= this.value[j].thanhTien
      }
             
    }  
    //console.log(this.tongBan);
  }

  //excel
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
    this.donbanhangsv.exportExcel(this.displayData,this.selectedId).subscribe(
      (res: any) => {
        this.loadingExportExcel = false;
        const element = document.createElement("a");
        element.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.base64String}`;
        element.download = `Thong_ke_khach_hang${year}-${month}-${day}-${hours}-${minute}-${sec}.xlsx`;
        element.click();
      },
      (err) => {
        console.log(err);
        this.loadingExportExcel = false;
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
    
    const arrCondition = [
      'maDonHang', 'loaiDonHang', 'createDateName', 'nguoiThem','tenKhachHang',
      'maSoThue','soDienThoaiNguoiDaiDien','diaChiKhachHang','email','soDienThoaiKeToan',
      'vanPhongGiaoDich','productName','retailPrice','tenKhoHang','tenVungCK',
      'chietKhauCongTy','chietKhauKhachHang','soLuongDuKien','soLuongThucTe','chiPhiKhac',
      'khuVucGiaoHang','cuocVanChuyenDuKien','cuocVanChuyenThucTe','diaDiemGiaoHang','lienHeNguoiNhanHang',
      'ngayGiaoHangDuKienName','ngayGiaoHangThucTeName','tenPhuongAnNhap','ghiChu','thongTinXe',
      'tinhTrangXeName','hinhThucThanhToan','ngaySauThanhToanName','ngayThanhToanName','soHoaDon',
      'thoiDiemXuatHoaDonName','thanhToanName','loaiThoiDiemXuatHoaDonName','lyDoHuyDuyet','createdDate',
      'ngayGiaoHangDuKien','ngayGiaoHangThucTe','ngaySauThanhToan','ngayThanhToan','thoiDiemXuatHoaDon',
      'thanhTien','loiNhuan'
    ];
    //console.log(arrCondition);
    this.displayData.Keyword = event;
    //console.log(this.displayData.Keyword);
    this.listOfData = SearchEngine(this.listOfDataAll, arrCondition, event);
    this.findsum(this.listOfData);
  }

  onChangeSearch(cont,event: any) {
    const arrCondition =[];
    arrCondition.push(cont);

    //console.log(arrCondition);
    this.displayData.ColName = cont;
    this.displayData.KeywordCol = event;
    //console.log(event);
    this.listOfData = SearchEngine(this.listOfDataAll, arrCondition, event);
    this.findsum(this.listOfData);
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
}