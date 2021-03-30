import { Component, OnInit } from '@angular/core';
import { NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzDropdownMenuComponent, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bao-cao',
  templateUrl: './bao-cao.component.html',
  styleUrls: ['./bao-cao.component.scss']
})
export class BaoCaoComponent implements OnInit {
  expandedTree = true;
  activedNode: NzTreeNode;

  doanhNghiepBoDiaChi = 125;
  doanhNghiepTamDungHoatDong = 100;
  doanhNghiepNgungHoatDong = 50;
  doanhNghiepBiCuongChe = 75;

  hoaDonHuy = 2400;
  hoaDonNhieuMatHang = 123;
  hoaDonDoanhThuLonThueNho = 5800;
  hoaDonDotBienDoanhThu = 456;
  hoaDonXuatDNRuiRo = 455;
  hoaDonDNRuiRoXuat = 666;

  nodes = [
    {
      title: 'Báo cáo doanh nghiệp',
      key: '100',
      expanded: this.expandedTree,
      link: '',
      children: [
        { title: `Doanh nghiệp ngừng hoạt động (${this.doanhNghiepNgungHoatDong})`, key: '1000', isLeaf: true, link: '/canh-bao/canh-bao-doanh-nghiep' },
        { title: `Doanh nghiệp tạm ngừng hoạt động (${this.doanhNghiepTamDungHoatDong})`, key: '1001', isLeaf: true, link: '/canh-bao/canh-bao-doanh-nghiep' },
        { title: `Doanh nghiệp bỏ địa chỉ (${this.doanhNghiepBoDiaChi})`, key: '1002', isLeaf: true, link: '/canh-bao/canh-bao-doanh-nghiep' },
        { title: `Doanh nghiệp bị cưỡng chế (${this.doanhNghiepBiCuongChe})`, key: '1003', isLeaf: true, link: '/canh-bao/canh-bao-doanh-nghiep' },
      ]
    },
    {
      title: 'Báo cáo hóa đơn',
      key: '101',
      isLeaf: true,
      link: '',
      children: [
        // tslint:disable-next-line: max-line-length
        { title: `Doanh thu lớn, thuế phát sinh nhỏ (${this.hoaDonDoanhThuLonThueNho})`, key: '1011', isLeaf: true, link: '/canh-bao/canh-bao-hoa-don' },
        { title: `Đột biến về doanh thu (${this.hoaDonDotBienDoanhThu})`, key: '1012', isLeaf: true, link: '/canh-bao/canh-bao-hoa-don' },
        { title: `Hóa đơn nhiều mặt hàng (${this.hoaDonNhieuMatHang})`, key: '1011', isLeaf: true, link: '/canh-bao/canh-bao-hoa-don' },
        { title: `Hóa đơn hủy và cưỡng chế (${this.hoaDonHuy})`, key: '1014', isLeaf: true, link: '/canh-bao/canh-bao-hoa-don' },
        { title: `Doanh thu hóa đơn bán ra (${this.hoaDonDotBienDoanhThu})`, key: '1015', isLeaf: true, link: '/canh-bao/canh-bao-hoa-don' },
        { title: `Hóa đơn xuất cho DN rủi ro (${this.hoaDonXuatDNRuiRo})`, key: '1016', isLeaf: true, link: '/canh-bao/canh-bao-hoa-don' },
        { title: `Hóa đơn xuất từ DN rủi ro (${this.hoaDonDNRuiRoXuat})`, key: '1017', isLeaf: true, link: '/canh-bao/canh-bao-hoa-don' },
      ]
    },
  ];
  selectBaoCao(node: any) {
    if (node.origin.link !== '') {
      this.router.navigate([node.origin.link]);
    }
  }
  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(node: any): void {
    // do something
    console.log(node);
    if (node.origin.link !== '') {
      window.open(node.origin.link);
    }
  }

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private router: Router
  ) { }
  ngOnInit() {
  }
  changeExpandedTree(event: any) {
    console.log(event);
    console.log(this.expandedTree);
  }
  toggleTree() {
    this.expandedTree = !this.expandedTree;
  }
}
