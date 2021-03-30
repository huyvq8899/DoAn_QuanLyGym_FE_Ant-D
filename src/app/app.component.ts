import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { en_US, LocaleProviderService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadingRoute = false;
  isConnected = true;
  constructor(
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private onlineStatusService: OnlineStatusService,
    private localeProviderService: LocaleProviderService
  ) {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadingRoute = true;
          // this.loadingsv.createBasicMessage();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadingRoute = false;
          // this.loadingsv.removeBasicMessage();
          break;
        }
        default: {
          break;
        }
      }
    });
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      if (status === OnlineStatusType.ONLINE) {
        this.spinner.hide();
      } else {
        this.spinner.show();
      }
    });
  }

  ngOnInit(): void {
    this.localeProviderService.setLocale(en_US);
    // this.oneSignalService.initOneSignal();
    // this.oneSignalService.listenNotificationOpened();
  }
}
