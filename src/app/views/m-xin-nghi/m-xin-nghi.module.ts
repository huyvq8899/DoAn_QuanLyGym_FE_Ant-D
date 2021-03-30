
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { MXinNghiRoutingModule } from './m-xin-nghi-routing.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { MXinNghiComponent } from './m-xin-nghi.component';
import { MAddEditXinNghiComponent } from './m-add-edit-xin-nghi/m-add-edit-xin-nghi.component';
import { MThongKeXinNghiComponent } from './m-thong-ke-xin-nghi/m-thong-ke-xin-nghi.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { 
  CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
  ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
  DataLabelService, SplineSeriesService, StripLineService,
  SelectionService, ScatterSeriesService, AccumulationLegendService, ZoomService,
} from '@syncfusion/ej2-angular-charts';
import { LOCAL_PROVIDER_TOKEN } from 'ng-zorro-antd-mobile';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { EnvServiceProvider } from 'src/app/env.service.provider';
@NgModule({
  declarations: [MXinNghiComponent, MAddEditXinNghiComponent, MThongKeXinNghiComponent],
  imports: [
    SharedModule,
    MXinNghiRoutingModule,
    CommonModule,
    NgZorroAntdMobileModule,
    ChartModule
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
})
export class MXinNghiModule { }
