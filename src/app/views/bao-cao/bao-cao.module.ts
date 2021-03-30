import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/ng-zorro.module';
import { BaoCaoRoutingModule } from './bao-cao.routing.module';
import { BaoCaoComponent } from './bao-cao.component';

import { BaoCaoThemKhachHangComponent } from './bao-cao-them-khach-hang/bao-cao-them-khach-hang.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { 
  CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
  ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
  DataLabelService, SplineSeriesService, StripLineService,
  SelectionService, ScatterSeriesService, AccumulationLegendService, ZoomService,
} from '@syncfusion/ej2-angular-charts';
import { BaoCaoThemKhachHangTheoNhanVienComponent } from './bao-cao-them-khach-hang-theo-nhan-vien/bao-cao-them-khach-hang-theo-nhan-vien.component';
import { BaoCaoThemKHTheoNVKDComponent } from './bao-cao-them-KH-theo-NVKD/bao-cao-them-KH-theo-NVKD.component';

@NgModule({
  imports: [
    CommonModule,
    BaoCaoRoutingModule,
    ReactiveFormsModule,
    NgZorroModule,
    FormsModule,
    ChartModule
  ],
  declarations: [
    BaoCaoComponent,
    BaoCaoThemKhachHangComponent,
    BaoCaoThemKhachHangTheoNhanVienComponent,
    BaoCaoThemKHTheoNVKDComponent
  ],
  entryComponents: [
    BaoCaoThemKhachHangComponent,
    BaoCaoThemKhachHangTheoNhanVienComponent,
    BaoCaoThemKHTheoNVKDComponent
  ],
  exports: [],
  providers: [CategoryService, DateTimeService, ScrollBarService, LineSeriesService,
    ColumnSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,
    DataLabelService, SplineSeriesService, StripLineService,
    SelectionService, ScatterSeriesService, ZoomService, AccumulationLegendService]
})
export class BaoCaoModule { }
