import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/services/data.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { DieuXeModalComponent } from '../../modals/dieu-xe-modal/dieu-xe-modal.component';
import { TaoDonMuaHangModalComponent } from '../../modals/tao-don-mua-hang-modal/tao-don-mua-hang-modal.component';

@Component({
  selector: 'app-tab-trang-thai-don-hang-hoa-don',
  templateUrl: './tab-trang-thai-don-hang-hoa-don.component.html',
  styleUrls: ['./tab-trang-thai-don-hang-hoa-don.component.scss']
})
export class TabTrangThaiDonHangHoaDonComponent implements OnInit {
  @Input() trangThai: any;
  listOfData: any[] = [];
  listOfDataAll: any[] = [];
  loading = false;
  roleId: string;
  keyword: string;
  widthConfig = ['150px', '150px', '200px', '150px', '150px', '150px', '150px', '150px', '150px', '150px', '150px', '200px', '100px'];
  scrollConfig = { x: '2050px', y: '600px' };

  constructor(
    private modalService: NzModalService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');

    this.dataService.loadData$.subscribe((res: any) => {
      if (res) {
        this.listOfData = JSON.parse(localStorage.getItem('ListDonBanHang'));
        this.filterList();
      }
    });

    if (localStorage.getItem('ListDonBanHang')) {
      this.listOfData = JSON.parse(localStorage.getItem('ListDonBanHang'));
      this.filterList();
    }
  }

  filterList() {
    if (this.trangThai === 7 || this.trangThai === 8) {
      if (this.trangThai === 7) {
        this.listOfData = this.listOfData.filter(x => x.trangThai === 6 && x.tinhTrangThanhToan === 1);
      } else {
        this.listOfData = this.listOfData.filter(x => x.trangThai === 6 && x.tinhTrangThanhToan === 2);
      }
    } else {
      this.listOfData = this.listOfData.filter(x => x.trangThai === this.trangThai);
    }
    this.listOfDataAll = [...this.listOfData];
  }

  changeSearch(event: any) {
    const arrCondition = ['maDonMuaHang'];
    this.listOfData = SearchEngine(this.listOfDataAll, arrCondition, event);
  }

  editItem(data: any, isView = false) {
    const modal = this.modalService.create({
      nzTitle: isView == true ? 'Xem ????n h??ng' : 'C???p nh???t ????n h??ng',
      nzContent: TaoDonMuaHangModalComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: '80%',
      nzStyle: { top: '20px' },
      nzBodyStyle: { padding: '5px' },
      nzComponentParams: {
        isAddNew: false,
        data,
        isView
      },
      nzFooter: null
    });
  }

  removeItem(data: any) {
    this.modalService.confirm({
      nzTitle: 'Th??ng b??o',
      nzContent: 'B???n c?? ch???c ch???n mu???n x??a ????n h??ng n??y kh??ng?',
      nzOkText: 'C??',
      nzOnOk: () => {
        let list = JSON.parse(localStorage.getItem('ListDonBanHang'));
        list = list.filter(x => x.maDonMuaHang !== data.maDonMuaHang);
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Kh??ng',
    });
  }

  duyetDonHang(data: any) {
    this.modalService.confirm({
      nzTitle: 'Th??ng b??o',
      nzContent: 'B???n c?? ch???c ch???n mu???n duy???t ????n h??ng n??y kh??ng?',
      nzOkText: 'C??',
      nzOnOk: () => {
        const list = JSON.parse(localStorage.getItem('ListDonBanHang'));
        const index = list.findIndex(x => x.maDonMuaHang === data.maDonMuaHang);
        list[index].trangThai = 1;
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Kh??ng',
    });
  }

  rutHang(data: any) { // comment
    this.modalService.confirm({
      nzTitle: 'Th??ng b??o',
      nzContent: 'B???n c?? ch???c ch???n mu???n r??t h??ng n??y kh??ng?',
      nzOkText: 'C??',
      nzOnOk: () => {
        const list = JSON.parse(localStorage.getItem('ListDonBanHang'));
        const index = list.findIndex(x => x.maDonMuaHang === data.maDonMuaHang);
        list[index].trangThai = 2;
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Kh??ng',
    });
  }

  dieuXe(data: any, isView = false) {
    const modal = this.modalService.create({
      nzTitle: '??i???u xe',
      nzContent: DieuXeModalComponent,
      nzMaskClosable: false,
      nzClosable: true,
      // nzWidth: '80%',
      nzStyle: { top: '20px' },
      nzBodyStyle: { padding: '5px' },
      nzComponentParams: {
        isView,
        data: data.dieuXe
      },
      nzFooter: null
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        const list = JSON.parse(localStorage.getItem('ListDonBanHang')) as any[];
        const index = list.findIndex(x => x.maDonMuaHang === data.maDonMuaHang);
        list[index].dieuXe = rs;
        list[index].trangThai = 3;
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      }
    });
  }

  layXongHang(data: any) {
    this.modalService.confirm({
      nzTitle: 'Th??ng b??o',
      nzContent: 'B???n c?? ch???c ch???n mu???n l???y ????n h??ng n??y kh??ng?',
      nzOkText: 'C??',
      nzOnOk: () => {
        const list = JSON.parse(localStorage.getItem('ListDonBanHang')) as any[];
        const index = list.findIndex(x => x.maDonMuaHang === data.maDonMuaHang);
        list[index].trangThai = 4;
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Kh??ng',
    });
  }

  dangGiao(data: any) {
    this.modalService.confirm({
      nzTitle: 'Th??ng b??o',
      nzContent: 'B???n c?? ch???c ch???n mu???n x??c nh???n ??ang giao ????n h??ng n??y kh??ng?',
      nzOkText: 'C??',
      nzOnOk: () => {
        const list = JSON.parse(localStorage.getItem('ListDonBanHang')) as any[];
        const index = list.findIndex(x => x.maDonMuaHang === data.maDonMuaHang);
        list[index].trangThai = 5;
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Kh??ng',
    });
  }

  daGiao(data: any) {
    this.modalService.confirm({
      nzTitle: 'Th??ng b??o',
      nzContent: 'B???n c?? ch???c ch???n mu???n x??c nh???n ???? giao ????n h??ng n??y kh??ng?',
      nzOkText: 'C??',
      nzOnOk: () => {
        const list = JSON.parse(localStorage.getItem('ListDonBanHang')) as any[];
        const index = list.findIndex(x => x.maDonMuaHang === data.maDonMuaHang);
        list[index].trangThai = 6;
        list[index].daGiao = true;
        localStorage.setItem('ListDonBanHang', JSON.stringify(list));
        this.ngOnInit();
      },
      nzCancelText: 'Kh??ng',
    });
  }
}
