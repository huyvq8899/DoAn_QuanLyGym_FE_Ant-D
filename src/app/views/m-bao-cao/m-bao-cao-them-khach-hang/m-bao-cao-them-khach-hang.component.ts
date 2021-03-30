import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ILoadedEventArgs } from "@syncfusion/ej2-angular-charts";
import { map } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { SearchEngine } from "src/app/shared/searchEngine";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: 'app-m-bao-cao-them-khach-hang',
  templateUrl: './m-bao-cao-them-khach-hang.component.html',
  styleUrls: ['./m-bao-cao-them-khach-hang.component.css']
})
export class MBaoCaoThemKhachHangComponent implements OnInit {

  @Output() total: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();
  selectedYears: number;
  selectedNhanVien: any;
  date = new Date();
  years: number[] = [];
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
    width: "225px",
  };
  spinning = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    // this.LISTFUNCTIONS = JSON.parse(localStorage.getItem("listFunction"));    
    this.sharedService.emitChange({
      title: 'Báo cáo thêm khách hàng'
    });
    this.GetAllUser();
    this.selectedYears = this.date.getFullYear();

    this.marker = {
      dataLabel: {
        visible: true,
      },
    };
    this.primaryXAxis = {
      zoomFactor: 0.5,
      valueType: "Category",
      title: "Tháng",
    };
    this.primaryYAxis = {
      minimum: 0,
      title: "Số lượng",
    };
    this.selectedNhanVien = localStorage.getItem('userId');
    this.GetAllLoi();
    this.userService.GetYears().subscribe((rs: any) => {
      this.years = rs;
    })
  }

  GetAllUser() {
    this.userService.GetAllUserById(localStorage.getItem('userId')).subscribe((rs: any) => {
      this.listNhanVien = rs;
      this.listNhanVienTmp = rs;
    });
  }
  SearchNhanVien(event: any) {
    const arrCondition = ["userName", "fullName", "title"];
    this.listNhanVien = SearchEngine(this.listNhanVienTmp, arrCondition, event);
  }


  GetAllLoi() {
    const model: any = {
      userId: this.selectedNhanVien,
      year: this.selectedYears,

    };
    //console.log("GetHopDongHoaDon");
    this.spinning = true;

    this.userService
      .GetAddKHByYear(model, localStorage.getItem('userId'))
      .pipe(
        map((res: any) => {
          this.spinning = false;
          const result: any[] = [];
          for (let i = 1; i <= 12; i++) {
            const index = res.findIndex((x) => x.thang === i);
            //console.log("get hop dong hoa don");
            if (index === -1) {
              result.push({
                thang: i,
                sThang: +`${i}`,
                tongSoKhachHang: 0,
              });
            } else {
              result.push({
                ...res.find((x) => x.thang === i),
                sThang: `${i}`,
              });
            }
          }
          return { result };
        })
      )
      .subscribe((rs: any) => {
        this.chartData = rs.result;
        console.log(this.chartData);
        // title
        this.title = "Thống kê khách hàng đã thêm năm ";
        this.title += this.selectedYears;
        // if (this.selectedNhanVien != null) {
        //   const nv = this.listNhanVien.filter(
        //     (x) => x.userId === this.selectedNhanVien
        //   );
        //   if (nv.length > 0) {
        //     this.title +=
        //       "Nhân viên: @" +
        //       nv[0].userName +
        //       " " +
        //       nv[0].fullName;
        //   }
        // }
      });
  }



  changeNhanVien(event: any) {
    this.selectedNhanVien = event;
    this.getData();
    // this.GetHopDong();
  }
  changeNam() {
    this.getData();
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
}
