import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ILoadedEventArgs } from "@syncfusion/ej2-angular-charts";
import { Index } from "@syncfusion/ej2-charts";
import { map } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { SearchEngine } from "src/app/shared/searchEngine";

@Component({
  selector: 'app-bao-cao-xin-nghi',
  templateUrl: './bao-cao-xin-nghi.component.html',
  styleUrls: ['./bao-cao-xin-nghi.component.scss']
})
export class BaoCaoXinNghiComponent implements OnInit {

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
  title = "Thống kê số lần đi muộn , xin nghỉ ";

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

  ) {}
 
  ngOnInit() {
    // this.LISTFUNCTIONS = JSON.parse(localStorage.getItem("listFunction"));
 
    // this.selectedNhanVien=localStorage.getItem('userId'); 
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
    };
    this.primaryYAxis = {
      minimum: 0,
      title: "Số lượng",
    };

    
    this.userService.GetYearsXinNghi().subscribe((rs:any)=>{
      this.years=rs;
    })
    this.GetAll();
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


  GetAll() {
    const model: any = {
      userId: this.selectedNhanVien,
      year: this.selectedYears,

    };
    //console.log("GetHopDongHoaDon");
    this.spinning = true;
    this.userService
      .GetAllXinNghi(model,localStorage.getItem('userId'))
      .pipe(
        map((res: any) => {
          this.spinning = false;
          const result: any[] = [];
          if(this.selectedNhanVien!=null){
            const list =this.listNhanVien.filter(x=>x.userId==this.selectedNhanVien)
            console.log(list)
            list.forEach(element => {            
              const index = res.findIndex((x) => x.ten == element.userId);
              if(index===-1){
                result.push({               
                  ten:element.fullName,
                  tongLanDiMuon:res.tongLanDiMuon,
                  soLanNghiPhep:res.soLanNghiPhep,
                  soNgayNghiPhep:res.soNgayNghiPhep
                })
              }else{
                result.push({
                  ...res.find((x=>x.ten==element.userId)),
                  ten:element.fullName
                })
              }
            
          
            })
          }else{
         
          this.listNhanVien.forEach(element => {            
            const index = res.findIndex((x) => x.ten == element.userId);
            if(index===-1){
              result.push({               
                ten:element.fullName,
                tongLanDiMuon:res.tongLanDiMuon,
                soLanNghiPhep:res.soLanNghiPhep,
                soNgayNghiPhep:res.soNgayNghiPhep
              })
            }else{
              result.push({
                ...res.find((x=>x.ten==element.userId)),
                ten:element.fullName
              })
            }
          
        
          })
        }
          // for (let i = 1; i <= 12; i++) {
          //   const index = res.findIndex((x) => x.thang === i);
          //   //console.log("get hop dong hoa don");
          //   if (index === -1) {
          //     result.push({
          //       thang: i,
          //       sThang: `Tháng ${i}`,
          //       tongLanDiMuon: 0,
          //       soLanNghiPhep:0,
          //       soNgayNghiPhep:0

          //     });
          //   } 
          //   // else {
          //   //   result.push({
          //   //     ...res.find((x) => x.thang === i),
          //   //     sThang: `Tháng ${i}`,
          //   //   });
          //   // }
          // }
          return { result };
        })
      )
      .subscribe((rs: any) => {
        this.chartData = rs.result;
        console.log(this.chartData);
        // title
        this.title = "Thống kê số lần đi muộn , xin nghỉ năm ";
        this.title += this.selectedYears;
        this.GetAllUser();
        if (this.selectedNhanVien != null) {
          

          const nv = this.listNhanVien.filter(
            (x) => x.userId === this.selectedNhanVien
          );
          console.log(nv);
          if (nv.length > 0) {
            this.title +=
              " - Nhân viên: @" +
              nv[0].userName +
              " " +
              nv[0].fullName; 
           
          }
        }
      });
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
  changeNhanVien(event: any) {
    this.selectedNhanVien = event;
    // this.GetHopDong();
  }
  getData() {
     
      this.GetAll();

  }
}
