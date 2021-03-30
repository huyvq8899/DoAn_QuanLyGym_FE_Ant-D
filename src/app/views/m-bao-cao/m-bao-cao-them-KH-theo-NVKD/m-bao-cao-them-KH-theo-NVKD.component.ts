import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { UserService } from 'src/app/services/user.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-bao-cao-them-KH-theo-NVKD',
  templateUrl: './m-bao-cao-them-KH-theo-NVKD.component.html',
  styleUrls: ['./m-bao-cao-them-KH-theo-NVKD.component.scss']
})
export class MBaoCaoThemKHTheoNVKDComponent implements OnInit {

  @Output() total: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();
  selectedYears: number;
  selectedMonths: number;
  selectedNhanVien: any;
  date = new Date();
  years: number[] = [];
  months: number[] = [];
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public chartData: Object[];
  public marker: Object;
  animation = { enable: true };
  tooltip = { enable: true };
  public palette = ["#329B24	", "#ffc107", "#2196f3", "#8bc34a"];
  title = "Thống kê số lượng khách hàng đã thêm";

  listNhanVien: any[] = [];
  listNhanVienTmp: any[] = [];
  LISTFUNCTIONS: any[] = [];
  searchCustomerOverlayStyle = {
    width: "300px",
  };
  spinning = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sharedService: SharedService
  ) {}
  ngOnInit() {
    // this.LISTFUNCTIONS = JSON.parse(localStorage.getItem("listFunction"));
    // this.GetAllUser();
    this.sharedService.emitChange({
      title: 'Báo cáo thêm khách hàng theo nhân viên'
    });
    this.selectedYears = this.date.getFullYear();
    this.selectedMonths = (this.date.getMonth()+1);

    this.marker = {
      dataLabel: {
        visible: true,
      },
    };
    this.primaryXAxis = {
      zoomFactor: 0.5,
      valueType: "Category",
    };
    this.primaryYAxis = {
      minimum: 0,
      title: "Số lượng",
    };
    this.selectedNhanVien = localStorage.getItem("userId");
    this.GetAllLoi();
    this.userService.GetYears().subscribe((rs: any) => {
      this.years = rs;
    });
    this.userService.GetAddKHMonths().subscribe((rs: any) => {
      this.months = rs;
    });
  }
  SearchNhanVien(event: any) {
    const arrCondition = ["userName", "fullName", "title"];
    this.listNhanVien = SearchEngine(this.listNhanVienTmp, arrCondition, event);
  }
  GetAllLoi() {
    const model: any = {
      year: this.selectedYears,
      month: this.selectedMonths
    };
    console.log("model")
    //console.log("GetHopDongHoaDon");
    this.spinning = true;

    this.userService.GetAddKHByNhanVienKDByMonth(model).subscribe((rs: any) => {
      this.spinning = false;
      this.chartData = rs;
      console.log(this.chartData);
      // title
      this.title = "Thống kê khách hàng đã thêm tháng ";
      this.title += this.selectedMonths;
      if (this.selectedNhanVien != null) {
        const nv = this.listNhanVien.filter(
          (x) => x.userId === this.selectedNhanVien
        );
        if (nv.length > 0) {
          this.title +=
            " - Nhân viên: @" + nv[0].userName + " " + nv[0].fullName;
        }
      }
    });
  }
  changeNhanVien(event: any) {
    this.selectedNhanVien = event;
    // this.GetHopDong();
  }
  getData() {
    this.GetAllLoi();
  }
  public load(args: ILoadedEventArgs): void {
    args.chart.zoomModule.isZoomed = true;
  };
  public zoomSettings: Object = {
    mode: 'X',
    enableMouseWheelZooming: true,
    enablePinchZooming: true,
    enableSelectionZooming: true,
    enableScrollbar: true
  };
  changeData() {
    this.getData();
  }

}
