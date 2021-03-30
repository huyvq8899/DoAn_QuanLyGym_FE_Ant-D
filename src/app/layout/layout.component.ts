import { Component, OnInit, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService, } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";
import { SignalRService } from '../services/signalr.service';
import { environment } from 'src/environments/environment';
import { ThongBaoService } from '../services/thong-bao.service';
import { NotifyDetailModalComponent } from '../views/dashboard/notify-detail-modal/notify-detail-modal.component';
import { DataService } from '../services/data.service';
import { TaoDonMuaHangModalComponent } from '../views/quan-ly-ban-hang/modals/tao-don-mua-hang-modal/tao-don-mua-hang-modal.component';
import {
  PushNotification,
  PushNotificationService,
} from "../services/push-notification.service";
import { NotificationService } from "../services/Notification.service";
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('notificationTemplate', { static: false }) template?: TemplateRef<{}>;
  isCollapsed = false;
  public templateref: TemplateRef<any>;
  isShowSider = true;
  isActiveThisPage: any;
  noticBasic: any;
  isShowDrawer = false;
  totalNoticNotView = 0;
  currentUser: any;
  roleId: any;
  isViewDrawerSetting = false;
  listFunction: any[] = [];
  visibleNotify = false;
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false
  };
  check: any;
  checkxemMua:any;
  countNotOpenNotify = 0;
  constructor(
    private _pushNotificationService: PushNotificationService,
    private modalService: NzModalService,
    private usersv: UserService,
    private authsv: AuthService,
    private signalRService: SignalRService,
    private notificationService: NzNotificationService,
    private thongBaoService: ThongBaoService,
    private dataService: DataService,
    private noticService: NotificationService,
    private router: Router,
    private sharedService: SharedService,

  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setResize();
  }
  setResize() {
    if (window.innerWidth < 992 && window.innerWidth >= 768) {
      this.isCollapsed = true;
      this.isShowSider = true;
      this.isShowDrawer = false;
    } else if (window.innerWidth >= 992) {
      this.isCollapsed = false;
      this.isShowSider = true;
      this.isShowDrawer = false;
    } else if (window.innerWidth < 768) {
      this.isShowSider = false;
      this.isCollapsed = false;
      // this.isShowDrawer = true;
    }
  }
  closeDrawer() {
    this.isCollapsed = false;
    this.isShowDrawer = false;
  }
  openDrawer() {
    this.isCollapsed = false;
    this.isShowDrawer = true;
  }

  toggleCollapsed() {
    if (window.innerWidth < 768) {
      this.openDrawer();
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.receiveCanhBao((res: any) => {
      this.ninja(res);
      this.loadCountUnOpenYet();
    });
    this.Onlistening();
    this.GetNoticNotView();
    if (localStorage.getItem('listFunction') && localStorage.getItem('listFunction') !== 'undefined') {
      this.listFunction = JSON.parse(localStorage.getItem('listFunction'));
    }
    // this.usersv.checkQuyen(localStorage.getItem('userId')).subscribe((rs: any)=>{
    //   this.check=rs;
    // });
    this.setResize();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.roleId = localStorage.getItem('roleId');
    this.check = false;
    if (this.roleId === "ADMIN" || this.roleId === "BLD")
      this.check = true;
      
    this.checkxemMua = false;
    if (this.roleId === "ADMIN" || this.roleId === "BLD" || this.roleId === "KT")
      this.checkxemMua = true;
    //console.log(this.check);
    this.loadCountUnOpenYet();
    //console.log(this.roleId);
  }
  GetNoticNotView() {
    this.noticService
      .GetNoticNotViewByUser(localStorage.getItem("userId"))
      .subscribe((rs: any) => {
        this.totalNoticNotView = rs;
      });
  }

  loadCountUnOpenYet() {
    this.thongBaoService.GetCountNotOpenYetByNguoiNhan(this.currentUser.userId)
      .subscribe((res2: any) => {
        this.countNotOpenNotify = res2;
      });
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  logout() {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống ngay bây giờ?',
      // nzContent: '<b style='color: red;'>Some descriptions</b>',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.usersv
          .SetOnline(localStorage.getItem('userId'), false)
          .subscribe((rs: any) => {
            // không thể set trạng thai offline
          });
        this.signalRService.stopConnection();
        this.authsv.logout();
      },
      nzCancelText: 'Không',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  openDrawerSetting(): void {
    this.isViewDrawerSetting = true;
  }

  closeDrawerSetting(): void {
    this.isViewDrawerSetting = false;
  }
  toggleSetting() {
    this.isViewDrawerSetting = !this.isViewDrawerSetting;
  }
  CheckFunction(functionName: string) {
    const idx = this.listFunction.findIndex(x => x.functionName === functionName);
    return idx;
  }
  CheckUser() {
    if (this.roleId == "ADMIN")
      return 1
  }
  CheckQuyen() {
    console.log(this.usersv.checkQuyen(localStorage.getItem('userId')))
    if (this.usersv.checkQuyen(localStorage.getItem('userId')))
      return 1;

  }

  ninja(data: any): void {
    this.notificationService.template(this.template, {
      nzKey: data.thongBaoId,
      nzData: data,
      nzPlacement: 'bottomLeft',
      nzStyle: {
        padding: '10px 15px 10px 10px'
      }
    });
  }

  ViewNotic() {
    this.thongBaoService.UpdateAllOpenedByNguoiNhan(this.currentUser.userId)
      .subscribe((res: any) => {
        if (res) {
          this.countNotOpenNotify = 0;
        }
      });
  }

  viewDetailNotify(data: any) {
    this.thongBaoService.GetDetail(data.thongBaoId)
      .subscribe((res: any) => {
        this.loadCountUnOpenYet();
        if (res) {
          data.isRead = true;
          const modal = this.modalService.create({
            nzTitle: res.tieuDe,
            nzContent: NotifyDetailModalComponent,
            nzMaskClosable: false,
            nzClosable: true,
            nzWidth: '70%',
            nzStyle: { top: '20px' },
            nzBodyStyle: { padding: '1px' },
            nzComponentParams: {
              data: res
            },
            nzFooter: null
          });
        }
      });
  }
  clickHopDong(event){
    const _url = this.router.url;
    if (_url.includes("quan-ly-ban-hang/don-hang-thuong-mai")) {
      const data: any = {
        type: 1,
        donHangId: event.donHangId,
      };
      this.sharedService.emitChange(data);
    } else {
      this.router.navigate(["quan-ly-ban-hang/don-hang-thuong-mai"], {
        queryParams: { donHangId: event.donHangId },
      });
    }
  };
  Onlistening() {
    const conAdd = "receiveNotification";
    this.signalRService.hubConnection.on(conAdd, (mNotic: any) => {
      //console.log(mNotic);
      if (mNotic.type === 1 || mNotic.type === 2 || mNotic.type === 4) {
        this.noticService
          .GetById(mNotic.notificationId)
          .subscribe((res: any) => {
            this.noticBasic = res;
            this.totalNoticNotView += 1;
            this.clearBeforeNotifications();
            // chỉ gọi pushNotification khi blur
            if (this.isActiveThisPage === false) {
              //console.log('tạo push notic');
              this.pushNotification(res);
            } else {
              this.createBasicNotification(this.templateref);
              //console.log('tạo basic notic');
            }
          });
      } else if (mNotic.type === 3) {
        //console.log(' phản hồi khách hàng');
        let res: any = mNotic;
        let createdByUser: any = {
          userName: mNotic.createdBy,
          avatar: "../../assets/christmas_flat-08-512.png",
        };
        res.createdByUser = createdByUser;

        this.noticBasic = res;
        this.totalNoticNotView += 1;
        this.clearBeforeNotifications();
        // chỉ gọi pushNotification khi blur
        if (this.isActiveThisPage === false) {
          //console.log('tạo push notic');
          this.pushNotification(res);
        } else {
          this.createBasicNotification(this.templateref);
          //console.log('tạo basic notic');
        }
      }
    });
  }
  createBasicNotification(template: TemplateRef<{}>): void {
    this.PlayAudio();
    this.notificationService.template(template, {
      nzPlacement: "bottomLeft",
      nzDuration: 15000,
    });
  }
  PlayAudio() {
    // tslint:disable-next-line: prefer-const
    let audio = new Audio();
    // audio.src = "../assets/alert_drip.wav";
    audio.load();
    audio.play();
  }
  clearBeforeNotifications(): void {
    this.notificationService.remove();
  }
  pushNotification(noticModel: any) {
    //console.log(noticModel);

    const title = "donhang";
    const options: PushNotification = {};
    this.createBodyForPushNotification(options, noticModel);
    options.silent = true;
    this._pushNotificationService.create(title, options).subscribe(
      (notif) => {
        if (notif.event.type === "show") {
          this.PlayAudio();
          //console.log('onshow');
          setTimeout(() => {
            notif.notification.close();
          }, 10000);
        }
        if (notif.event.type === "click") {
          //console.log('click');
          this.clickPushNotification(noticModel);
          notif.notification.close();
        }
        if (notif.event.type === "close") {
          //console.log('close');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  createBodyForPushNotification(options: any, noticModel: any) {
    //console.log(noticModel);
    if (noticModel.type === 2) {
      options.icon = noticModel.createdByUser.avatar;
      options.body =
        noticModel.createdByUser.userName +
        " " +
        noticModel.content +
        " " +
        "[" +
        noticModel.hopDongViewModel.soHopDong +
        "] ";
    }
    if (noticModel.type === 3) {
      options.icon = noticModel.createdByUser.avatar;
      options.body =
        noticModel.createdByUser.userName + " " + noticModel.content;
    }
  }
  clickPushNotification(noticModel: any) {
    // Hợp đồng
    if (noticModel.type === 1) {
      window.focus();
      this.clickHopDong(noticModel);
    }
    if (noticModel.type === 3) {
      window.focus();
      this.clickPhanHoi(noticModel);
    }
  }
  clickPhanHoi(event){};
  @HostListener("window:focus")
  onFocus() {
    this.isActiveThisPage = true;
  }
  @HostListener("window:blur")
  onBlur() {
    this.isActiveThisPage = false;
  }
  @HostListener("window:beforeunload")
  beforeunloadHandler() {
    this.isActiveThisPage = false;
  }

  taoDonMuaHang() {
    const modal = this.modalService.create({
      nzTitle: 'Tạo đơn hàng',
      nzContent: TaoDonMuaHangModalComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '80%',
      nzStyle: { top: '20px' },
      nzBodyStyle: { padding: '5px' },
      nzComponentParams: {
        isAddNew: true
      },
      nzFooter: null
    });
  }
}
