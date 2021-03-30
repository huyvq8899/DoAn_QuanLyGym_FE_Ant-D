import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { MBaoCaoRoutingModule } from './m-bao-cao.routing.module';

import { MBaoCaoThemKhachHangComponent } from './m-bao-cao-them-khach-hang/m-bao-cao-them-khach-hang.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { 
  CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
  ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
  DataLabelService, SplineSeriesService, StripLineService,
  SelectionService, ScatterSeriesService, AccumulationLegendService, ZoomService,
} from '@syncfusion/ej2-angular-charts';
import { MBaoCaoThemKhachHangTheoNhanVienComponent } from './m-bao-cao-them-khach-hang-theo-nhan-vien/m-bao-cao-them-khach-hang-theo-nhan-vien.component';
import { MBaoCaoThemKHTheoNVKDComponent } from './m-bao-cao-them-KH-theo-NVKD/m-bao-cao-them-KH-theo-NVKD.component';

@NgModule({
  imports: [
    CommonModule,
    MBaoCaoRoutingModule,
    ReactiveFormsModule,
    NgZorroModule,
    FormsModule,
    ChartModule
  ],
  declarations: [
    MBaoCaoThemKhachHangComponent,
    MBaoCaoThemKhachHangTheoNhanVienComponent,
    MBaoCaoThemKHTheoNVKDComponent
  ],
  entryComponents: [
    MBaoCaoThemKhachHangComponent,
    MBaoCaoThemKhachHangTheoNhanVienComponent,
    MBaoCaoThemKHTheoNVKDComponent
  ],
  exports: [],
  providers: [CategoryService, DateTimeService, ScrollBarService, LineSeriesService,
    ColumnSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
    DataLabelService, SplineSeriesService, StripLineService,
    SelectionService, ScatterSeriesService, ZoomService, AccumulationLegendService]
})
export class MBaoCaoModule { }
