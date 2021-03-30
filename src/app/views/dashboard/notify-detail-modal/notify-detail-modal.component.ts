import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfigConstant } from 'src/app/constants/config.constant';

@Component({
  selector: 'app-notify-detail-modal',
  templateUrl: './notify-detail-modal.component.html',
  styleUrls: ['./notify-detail-modal.component.scss']
})
export class NotifyDetailModalComponent implements OnInit {
  @Input() data: any;

  constructor(
    private modalService: NzModalService
  ) { }

  ngOnInit() {
  }

  viewHoaDon(data: any) {
    // const modal = this.modalService.create({
    //   nzTitle: 'Xem hóa đơn',
    //   nzWidth: ConfigConstant.MODAL_LARGE_SIZE,
    //   nzContent: ViewHoaDonModalComponent,
    //   nzStyle: {
    //     top: ConfigConstant.MODAL_TOP_20PX
    //   },
    //   nzBodyStyle: {
    //     padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
    //   },
    //   nzMaskClosable: false,
    //   nzComponentParams: {
    //     data: data.hoaDon.hoaDonFile
    //   },
    //   nzFooter: null
    // });
  }
}
