import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { DonMuaHangService } from 'src/app/services/don-mua-hang.service';
import { CloneData } from 'src/app/shared/CloneData';
import { ConvertDateTime } from 'src/app/shared/get-selected-array';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { MuaHangKhongQuaKhoModalComponent } from './modals/mua-hang-khong-qua-kho-modal/mua-hang-khong-qua-kho-modal.component';

@Component({
  selector: 'app-don-mua-hang',
  templateUrl: './don-mua-hang.component.html',
  styleUrls: ['./don-mua-hang.component.scss']
})
export class DonMuaHangComponent implements OnInit {
  [x: string]: any;
  pageSizeOptions: any[];
  total:any;


  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  roleId:string;
  getDateTime: any;
  selectedId:any;
  searchValue="";
  valueModel = '';
  currentUser: any;
  selectedDontt:any;
  loadingExportExcel:boolean;
  loading: boolean;
  loaiDonHang=1;
  listLoaiDonHang= 1;
  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: "",
    SortKey: "",
    SortValue: "",
    fromDate: "",
    toDate: "",
    KeywordCol: "",
    ColName: "",
  };
  userService: any;
  listUser: any;
  listUserTmp: any;
  isBLD: boolean;
  check: any;
  
  constructor(
    private router: Router,
    private modal: NzModalService,
    private modalService:NzModalService,
    private donMuaHangService: DonMuaHangService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {

    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
    this.LoadData();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (this.loai === 2) {
    //   this.widthConfig = ['150px', '200px', '100px', '150px', '150px', '150px', '150px', '150px'];
    //   this.scrollConfig = { x: '1200px', y: '600px' };
    // }

    this.listOfDatatmp = [...this.listOfData];
  }
  filterTable() {
    this.LoadData();
    // throw new Error('Method not implemented.');
  }
 

  LoadData() {
    this.loading = true;
    this.selectedId="";
    if(this.selectedUser){
      this.selectedId=this.selectedUser
    }
    this.donMuaHangService.GetAllPaging(this.displayData,this.selectedId, this.loaiDonHang).subscribe((data: any) => {
      this.listOfData = data.items;
      this.listOfDatatmp = data.items;
      // console.log(this.listOfData)
      this.total = data.totalCount;
      // console.log(this.total)
      // this.listOfData = this.listOfData.filter(x => x.loaiDonHang == 1)
      this.displayData.PageNumber = data.currentPage;
      this.getPageSizeOption();
      this.loading = false;
      // delete all
      if (this.listOfData.length === 0 && this.displayData.PageNumber > 1) {
        this.displayData.PageNumber -= 1;
        this.ngOnInit();
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

  changeSearch(event: any) {
    const arrCondition = ['ngayMua','ngayThanhToan','maNhaCungCap','maSoThueNhaCungCap','maDonMua',
    'tenNhaCungCap','emailNhaCungCap','diaChiDKKD','diaChiPhongGiaoDich','soDienThoaiKeToan','soDienThoaiNGuoiDaiDienPhapLuat',
     'productCode','productName','maKho','retailPrice','tongLuongMua','chietKhauMua','thueXuat','donGiaTruocThue',
    'thanhToan','loaiNoiNhan','noiNhanChiTiet','hinhThucThanhToan','ghiChu','ngayMuaName','ngayThanhToanName','thueXuatName'];
    this.displayData.Keyword = event;
    
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }
  addNewItem() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới',
      nzContent: MuaHangKhongQuaKhoModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '80%',
      nzStyle: { top: '20px' },
      nzBodyStyle: { padding: '5px' },
      nzComponentParams: {
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }MuaHangKhongQuaKhoModalComponent

  editItem(data) {
    // console.log(data)
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật đơn hàng',
      nzContent: MuaHangKhongQuaKhoModalComponent,
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
        
        this.ngOnInit();
        
      }
    });
  }
  removeItem(data){
    this.modalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.donMuaHangService.Delete(data.donMuaHangId).subscribe((rs: any) => {
          if (rs === -1) {
            this.message.error('Dữ liệu đang được sử dụng, không thể xóa');
            return;
          }
          if (rs > 0) {
            this.message.success('Xóa thành công');
            this.ngOnInit();
          } else {
            this.message.error('Lỗi xóa dữ liệu');
          }
        }, _ => {
          this.message.error('Error delete');
          console.log('Error delete');
        })
      },
      nzCancelText: 'Không',
    });
  }

  viewItem(data) {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật',
      nzContent: MuaHangKhongQuaKhoModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '80%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        isView: true,
        data: data,
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        //base
        this.ngOnInit();
      }
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
  this.donMuaHangService.exportExcel(this.displayData,this.selectedId,this.loaiDonHang=1).subscribe(
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



  // clickDuyet(data) {
  //   const modal = this.modal.create({
  //     nzTitle: 'Duyệt đơn mua hàng',
  //     nzContent: MuaHangKhongQuaKhoModalComponent,
  //     nzClosable: false,
  //     nzFooter: 'null',
  //     nzWidth: '80%',
  //     nzStyle: {
  //       top: '10px'
  //     },
  //     nzComponentParams: {
  //       //listOfData: this.listOfData,
  //       isDuyetDonMuaHang: true,
  //       data: data,
  //     },
  //   });
  //   modal.afterClose.subscribe((rs: any) => {
  //     if (rs) {
  //       //base
  //       this.LoadData();
  //     }
  //   });
  // }

 

