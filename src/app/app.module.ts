import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LayoutComponent } from './layout/layout.component';
import { Page404Component } from './page404/page404.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { Config } from 'src/assets/Config';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared.module';
import { EnvServiceProvider } from './env.service.provider';

import { OnlineStatusModule } from 'ngx-online-status';
import { NotificationsComponent } from './views/dashboard/notifications/notifications.component';

import { FormsModule } from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MLayoutComponent } from './m-layout/m-layout.component';
import { LOCAL_PROVIDER_TOKEN } from 'ng-zorro-antd-mobile';

import { XinNghiComponent } from './views/xin-nghi/xin-nghi.component';
import { AddEditXinNghiComponent } from './views/xin-nghi/add-edit-xin-nghi/add-edit-xin-nghi.component';
import { BaoCaoXinNghiComponent } from './views/xin-nghi/bao-cao-xin-nghi/bao-cao-xin-nghi.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { 
  CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
  ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
  DataLabelService, SplineSeriesService, StripLineService,
  SelectionService, ScatterSeriesService, AccumulationLegendService, ZoomService,
} from '@syncfusion/ej2-angular-charts';
import { AddEditCardComponent } from './views/card/add-edit-card/add-edit-card/add-edit-card.component';
import { CardComponent } from './views/card/card.component';

registerLocaleData(en);
export function tokenGetter() {
   return localStorage.getItem('token');
}
@NgModule({
   declarations: [	
      AppComponent,
      LayoutComponent,
      NotificationsComponent,
      Page404Component,

      MLayoutComponent,

      XinNghiComponent,
      AddEditXinNghiComponent,
      BaoCaoXinNghiComponent,
      CardComponent,
      AddEditCardComponent,
      
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,
      SharedModule,
      ChartModule,
      OnlineStatusModule,
      JwtModule.forRoot({
         config: {
            skipWhenExpired: true,
            tokenGetter,
            allowedDomains: [Config.getDomain()],
            disallowedRoutes: [`${Config.getDomain()}/api/auth`]
         }
      }),
      FormsModule,
      NgZorroAntdMobileModule,
   ],
   providers: [
      { provide: LOCAL_PROVIDER_TOKEN, useValue: en_US },
      { provide: NZ_I18N, useValue: en_US },
      EnvServiceProvider,CategoryService, DateTimeService, ScrollBarService, LineSeriesService,
      ColumnSeriesService,
      ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
      DataLabelService, SplineSeriesService, StripLineService,
      SelectionService, ScatterSeriesService, ZoomService, AccumulationLegendService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
