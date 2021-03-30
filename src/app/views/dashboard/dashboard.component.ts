import { Component, OnInit } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  gridStyle = {
    textAlign: 'center'
  };
  totalHoaDon = 25500088;
  totalHoaDonNgay = 1560;
  totalHoaDonThang = 45400;
  totalHoaDonNam = 4200678;

  totalCanhBaoHoaDon = 3413;
  daHuy = 129;
  nhieuMatHang = 345;
  doanhThuHDBanra = 100;
  doanhThuLonThueIt = 89;
  dotBienDoanhThu = 222;
  xuatDNRuiRo = 78;
  DNRuiRoXuat = 120;
  panels = [
    {
      active: true,
      name: 'Doanh nghiệp',
      disabled: false,
      content: [
        'Doanh nghiệp lớn : 2100',
        'Doanh nghiệp vừa: 7888',
        'Doanh nghiệp nhỏ: 13450'
      ]
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];
  // charts
  public loadOfferStatus(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
  public legendSettings: any = {
    visible: true,
    position: 'Bottom'
  };
  // public title2: string = 'Số đề xuất theo trạng thái';
  public tooltip2: Object;
  public enableAnimation: boolean = true;
  public center: Object = { x: '50%', y: '40%' };
  public startAngle: number = 0;
  public endAngle: number = 360;
  public data: Object[] = [];
  //Initializing Datalabel
  public dataLabel: Object = {
    visible: false
  };
  public explode: boolean = true;
  public palette: string[] = ["#389DD9", "#d9241b"];

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.totalHoaDon += 1;
      this.totalHoaDonThang += 1;
      this.totalHoaDonNam += 1;
      this.totalHoaDonNgay += 1;
    }, 1000);
    setInterval(() => {
      this.xuatDNRuiRo += 1;
      this.dotBienDoanhThu += 1;
      this.nhieuMatHang += 1;
    }, 2000);
    setInterval(() => {
      this.doanhThuLonThueIt += 1;
      this.daHuy += 1;
      this.DNRuiRoXuat += 1;
      this.totalCanhBaoHoaDon += 1;
    }, 3000);
    this.setDataChart();
  }
  setDataChart() {
    this.data = [
      { 'x': 'Hóa đơn bình thường', y: 80 },
      { 'x': 'Hóa đơn rủi ro về thuế', y: 20 },
    ];
    this.tooltip2 = { enable: true, header: "Hóa đơn", format: '${point.x} : <b>${point.y}%</b>' }
  }
}
