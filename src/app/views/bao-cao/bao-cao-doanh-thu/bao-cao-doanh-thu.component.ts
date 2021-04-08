import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { CardService } from 'src/app/services/card.service';
import { UserService } from 'src/app/services/user.service';
import { SearchEngine } from 'src/app/shared/searchEngine';

@Component({
  selector: 'app-bao-cao-doanh-thu',
  templateUrl: './bao-cao-doanh-thu.component.html',
  styleUrls: ['./bao-cao-doanh-thu.component.scss']
})
export class BaoCaoDoanhThuComponent implements OnInit {

  @Output() total: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();
  selectedYears: number;
  selectedMonths: number;
  selectedNhanVien: any;
  selectedId:any;
  userId:any;
  roleId: any;
  check: any;
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
    private cardService: CardService,
  ) {}
  ngOnInit() {
    // this.LISTFUNCTIONS = JSON.parse(localStorage.getItem("listFunction"));
    // this.GetAllUser();
    this.selectedYears = this.date.getFullYear();
    this.selectedMonths = (this.date.getMonth()+1);

    this.marker = {
      dataLabel: {
        visible: true,
      },
    };
    this.primaryXAxis = {
      valueType: "Category",
      zoomFactor: 0.6
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
    this.roleId = localStorage.getItem('roleId');
    this.check = false;
    if (this.roleId === "ADMIN" || this.roleId === "BLD")
      this.check = true;
  }
  SearchNhanVien(event: any) {
    const arrCondition = ["userName", "fullName", "title"];
    this.listNhanVien = SearchEngine(this.listNhanVienTmp, arrCondition, event);
  }
  GetAllLoi() {
    this.userId = localStorage.getItem('userId');
    this.selectedId="";
    const model: any = {
      year: this.selectedYears,
      month: this.selectedMonths
    };
    console.log("model")
    //console.log("GetHopDongHoaDon");
    this.spinning = true;

    this.cardService.GetDoanhThuNhanVien(model,this.userId,this.selectedId).subscribe((rs: any) => {
      this.spinning = false;
      this.chartData = rs;
      console.log(this.chartData);
      // title
      this.title = "Thống kê thẻ tập đã thêm tháng ";
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
  CheckQuyen() {
    console.log(this.userService.checkQuyen(localStorage.getItem('userId')))
    if (this.userService.checkQuyen(localStorage.getItem('userId')))
      return 1;

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
