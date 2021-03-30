import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { forkJoin } from "rxjs";
import { EnvService } from "src/app/env.service";
import { PagingParams } from "src/app/models/PagingParams";
import { UserService } from "src/app/services/user.service";
import { ConvertDateTime } from "src/app/shared/get-selected-array";
import { SharedService } from "src/app/shared/shared.service";
@Component({
  selector: "app-m-thong-ke-so-luong-khach-hang",
  templateUrl: "./m-thong-ke-so-luong-khach-hang.component.html",
  styleUrls: ["./m-thong-ke-so-luong-khach-hang.component.scss"],
})
export class MThongKeSoLuongKhachHangComponent implements OnInit {
  loadingExportExcel: boolean;
  getDateTime: any;
  displayData: PagingParams = {
    fromDate: "",
    toDate: "",
  };
  listData: any[] = [];
  listOfData: any[] = [];
  loading = false;
  total=0; 
  
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
  
  private value;     
  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  constructor(
    private modalService: NzModalService,
    private env: EnvService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
  ) { }
  ngOnInit() {
    //this.LoadData();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.sharedService.emitChange({
      title: 'Thống kê số lượng khách hàng'
    });
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.getDateTime = [
      moment().startOf("months").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ];
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
  LoadData() {
    this.loading = true;
    this.displayData.userId = localStorage.getItem("userId");
    this.userService
      .GetBySoLuong(this.displayData)
      .subscribe((data: any) => {
        this.listData = data.items;
        this.listOfData = data;
        console.log(data);
        this.displayData.PageNumber = data.currentPage;
        this.findsum(data);
        this.loading = false;
        // delete all

      });
  }
  findsum(data){   
    this.total=0;   
    this.value=data    
    for(let j=0;j<data.length;j++){   
         this.total+= this.value[j].soLuongKhachHang    
    }  
    console.log(this.total);
  }
  ConvertDateTime(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  changeDate(event: any) {
    if (!event[0] && !event[1]) {
      this.displayData.fromDate = "";
      this.displayData.toDate = "";
    } else {
      //this.displayData.fromDate = this.ConvertDateTime(event[0]);
      //this.displayData.toDate = this.ConvertDateTime(event[1]);
    }
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
    this.userService.ExportExcelBaoCao(this.displayData).subscribe(
      (res: any) => {
        this.loadingExportExcel = false;
        const element = document.createElement("a");
        element.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.base64String}`;
        element.download = `Thong_ke_so_luong_khach_hang_da_them_${year}-${month}-${day}${hours}${minute}${sec}.xlsx`;
        element.click();
      },
      (err) => {
        console.log(err);
        this.loadingExportExcel = false;
      }
    );
  }

}
