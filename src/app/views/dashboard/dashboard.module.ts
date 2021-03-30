import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { ChartModule, CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService, ColumnSeriesService, BarSeriesService, SelectionService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService, AccumulationAnnotationService } from '@syncfusion/ej2-angular-charts';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AccumulationChartModule
  ],
  declarations: [DashboardComponent],
  providers: [CategoryService, LegendService, TooltipService, DataLabelService, ColumnSeriesService,
    BarSeriesService, SelectionService, AccumulationLegendService, AccumulationTooltipService,
    AccumulationDataLabelService, AccumulationAnnotationService,]
})
export class DashboardModule { }
