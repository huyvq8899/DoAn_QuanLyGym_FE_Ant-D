import { DonMuaHangService } from './../../../services/don-mua-hang.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { MuaHangGuiKhoModalComponent } from './modals/mua-hang-gui-kho-modal/mua-hang-gui-kho-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PagingParams } from 'src/app/models/PagingParams';
import { ConvertDateTime } from 'src/app/shared/get-selected-array';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as moment from 'moment';

@Component({
  selector: 'app-mua-hang-gui-kho',
  templateUrl: './mua-hang-gui-kho.component.html',
  styleUrls: ['./mua-hang-gui-kho.component.scss']
})
export class MuaHangGuiKhoComponent implements OnInit {
  listOfData: any[] = [];
  listOfDataAll: any[] = [];
  pageSizeOptions: any[];
  getDateTime: any;
  loadingExportExcel:boolean;
  loading: boolean;
  selectedId:any;
  selectedUser:any;
  total:any;
  spinning: boolean;
  valueModel = '';
  searchValue="";
  loaiDonHang = 2;
  currentUser: any;
  listLoaiDonHang= 1;
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

    this.listOfDataAll = [...this.listOfData];
  }

  LoadData() {
    this.loading = true;
    this.selectedId="";
    if(this.selectedUser){
      this.selectedId=this.selectedUser
    }
    this.donMuaHangService.GetAllPaging(this.displayData,this.selectedId, this.loaiDonHang).subscribe((data: any) => {
      console.log(data.items)
      this.listOfData = data.items;
      this.listOfDataAll = data.items;
      this.total = data.totalCount;
      // console.log(this.total)
      // this.listOfData = this.listOfData.filter(x => x.loaiDonHang == 2)
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

  filterTable() {
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
  
  changeSearch(event: any) {
    const arrCondition = ['ngayMua','ngayThanhToan','maNhaCungCap','maSoThueNhaCungCap',
    'tenNhaCungCap','emailNhaCungCap','diaChiDKKD','diaChiPhongGiaoDich','soDienThoaiKeToan','soDienThoaiNGuoiDaiDienPhapLuat',
     'productCode','productName','maKho','retailPrice','tongLuongMua','chietKhauMua','ngayMuaName','ngayThanhToanName'];
    this.listOfData = SearchEngine(this.listOfDataAll, arrCondition, event);
  }

  addNewItem() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới',
      nzContent: MuaHangGuiKhoModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '80%',
      nzStyle: { top: '20px' },
      nzBodyStyle: { padding: '5px' },
      nzComponentParams: {
        isAddNew: true,
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.message.success('Thêm thành công');
        this.ngOnInit();
      }
    });
  }

  editItem(data) {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật',
      nzContent: MuaHangGuiKhoModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '80%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        isAddNew: false,
        //listOfData: this.listOfData,
        data: data,
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        //base
        this.message.success('Sửa thành công');
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
      nzContent: MuaHangGuiKhoModalComponent,
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
    this.donMuaHangService.exportExcel(this.displayData,this.selectedId,this.loaiDonHang).subscribe(
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
  onChangeSearch(cont,event: any) {
    const arrCondition =[];
    arrCondition.push(cont);

    //console.log(arrCondition);
    this.displayData.ColName = cont;
    this.displayData.KeywordCol = event;
    //console.log(event);
    this.listOfData = SearchEngine(this.listOfDataAll, arrCondition, event);
  }
}
