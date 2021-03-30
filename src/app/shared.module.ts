import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from './ng-zorro.module';
import { FormatPricePipe } from './pipes/format-price.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { UserFollowPipe } from './pipes/user-follow.pipe';
import { NotifyDetailModalComponent } from './views/dashboard/notify-detail-modal/notify-detail-modal.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { LongPress } from './long-press';
 
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: "."
};

const APP_MODALS = [
    //
];

@NgModule({
    imports: [
        CurrencyMaskModule,
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        NgZorroModule,
    ],
    declarations: [
        UserFollowPipe,
        NotifyDetailModalComponent,
        FormatPricePipe,
        SafePipe,
        RelativeTimePipe,
        LongPress,
        ...APP_MODALS
    ],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
    entryComponents: [...APP_MODALS],
    exports: [
        CurrencyMaskModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NotifyDetailModalComponent,
        UserFollowPipe,
        RelativeTimePipe,
        SafePipe,
        FormatPricePipe,
        NgZorroModule,
        LongPress,
        ...APP_MODALS
    ]
})
export class SharedModule { }
