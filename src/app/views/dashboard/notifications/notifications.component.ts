import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagingParams } from 'src/app/models/PagingParams';
import { NotificationService } from 'src/app/services/Notification.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/share-service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() isMobile: boolean=false;
  roleId:string;
  titleNotic = "Thông báo";
  a = 1;
  b = 2;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  currentDate = new Date();
  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: '',
    SortKey: '',
    SortValue: '',
    fromDate: '',
    toDate: '',
    KeywordCol: '',
    ColName: '',
    userId: localStorage.getItem('userId')
  };
  spinning = false;
  total = 0;
  totalPage = 0;
  currentPage = 0;
  listNotic: any[] = [];
  constructor(
    private noticService: NotificationService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    console.log(this.isMobile);
    this.roleId = localStorage.getItem('roleId');
    console.log(localStorage.getItem('roleId'))
    this.LoadData();
  }
  LoadData() {
    this.spinning = true;
    this.titleNotic = "Thông báo";
    this.noticService.GetAllPaging(this.displayData).subscribe((data: any) => {
    //console.log(data.items);
      
      this.listNotic = [...this.listNotic, ...data.items];
      this.total = data.totalCount;
      this.totalPage = data.totalPages;
      this.currentPage = data.currentPage;
      this.spinning = false;
      this.titleNotic += ' (' + this.total + ')';
    //console.log(this.listNotic);
    });
  }
  ViewMoreNotic() {
    if (this.currentPage < this.totalPage) {
      this.displayData.PageNumber += 1;
      this.LoadData();
    }
  }
  ReadNotic(event: any) {
  //console.log(event);
  //console.log(this.router.url);
    const _url = this.router.url
    if(event.type === 1 ) {
      if(this.isMobile==true){
        this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-thuong-mai']);
      }else{
        this.router.navigate(['quan-ly-ban-hang/don-hang-thuong-mai']);
      }
        

      
    } 
    if(event.type ===2 ) {
      if(this.isMobile==true){
        this.router.navigate(['m-layout/m-quan-ly-ban-hang/m-don-hang-cong-nghiep']);
      }else{
        this.router.navigate(['quan-ly-ban-hang/don-hang-thong-thuong']);
      }
    }
    if(event.type ===3 ) {
      if (_url.includes('/hop-dong')){
       
      } else {
        this.router.navigate(['/hop-dong']);
      }
    }
    if(!event.read) {
      const model = event;
      model.read = true;
      this.noticService.Update(model).subscribe((rs: any) => {
        if (rs) {
          event.read = true;
        //console.log("Cập nhật thành công");
        } else {
        //console.log("Lỗi cập nhật");
        }
      }, _ => {
      //console.log("Error update");
      });
    }
  }
  DeleteNotic() {
    this.noticService.DeleteNoticByUser(localStorage.getItem('roleId')).subscribe((rs: any) => {
      if (rs) {
      //console.log("Xóa thành công");
        this.listNotic = [];
        this.total = 0;
        this.titleNotic = "Thông báo";
      } else {
      //console.log("Lỗi Xóa");
      }
    }, _ => {
    //console.log("Error delete");
    });
  }
}
