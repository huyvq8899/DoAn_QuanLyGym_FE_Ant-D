import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstant } from '../shared/GlobalConstant';
import { SharedService } from '../shared/shared.service';
import { NzModalService, } from 'ng-zorro-antd/modal';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { SignalRService } from '../services/signalr.service';

@Component({
  selector: 'app-m-layout',
  templateUrl: './m-layout.component.html',
  styleUrls: ['./m-layout.component.scss']
})
export class MLayoutComponent implements OnInit {
  isMobile: boolean=false;
  height: number = document.documentElement.clientHeight;
  currentUser: any;
  roleId: any;
  check: any;
  checkxemMua:any;
  listFunction: any[] = [];
  textHeader: any;
  state = {
    open: false
  };
  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub3: false
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private modalService: NzModalService,
    private usersv: UserService,
    private authsv: AuthService,
    private signalRService: SignalRService,
  ) { }

  ngOnInit() {
    this.isMobile=false;
    // this.route.params.subscribe(params => {
    //   if (params.id === undefined) {
    //     console.log(params.id);
    //     this.textHeader = 'Thêm mới';
    //   }
    // });
    if (localStorage.getItem('listFunction') && localStorage.getItem('listFunction') !== 'undefined') {
      this.listFunction = JSON.parse(localStorage.getItem('listFunction'));
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.roleId = localStorage.getItem('roleId');
    this.check = false;
    if (this.roleId === "ADMIN" || this.roleId === "BLD")
      this.check = true;
      
    this.checkxemMua = false;
    if (this.roleId === "ADMIN" || this.roleId === "BLD" || this.roleId === "KT")
      this.checkxemMua = true;
    this.sharedService.changeEmitted$.subscribe((res: any) => {
      if (res ) {
        setTimeout(() => {
        this.textHeader = res.title;
        }, 0);
      }
    })
  }
  CheckFunction(functionName: string) {
    const idx = this.listFunction.findIndex(x => x.functionName === functionName);
    return idx;
  }
  onClickBell(){
    this.isMobile=true;
  }
  CheckUser() {
    if (this.roleId == "ADMIN")
      return 1
  }
  CheckQuyen() {
    console.log(this.usersv.checkQuyen(localStorage.getItem('userId')))
    if (this.usersv.checkQuyen(localStorage.getItem('userId')))
      return 1;

  }
  initData: any;
  show: boolean = false;
  menuHeight: number = document.documentElement.clientHeight * 0.6;
  dataMenu: Array<any> = [
    {
      value: '1',
      label: 'Hệ thống',
      children: [
        {
          label: 'Danh sách tài khoản',
          value: '/m-layout/m-account/m-list',
          disabled: false
        }
      ]
    },
    {
      value: '2',
      label: 'Xin nghỉ',
      children: [
        {
          label: 'Đề xuất xin nghỉ',
          value: '/m-layout/m-xin-nghi/m-de-xuat-xin-nghi'
        },
        {
          label: 'Thống kê xin nghỉ',
          value: '/m-layout/m-xin-nghi/m-thong-ke-xin-nghi'
        }
      ]
    },
    {
      value: '3',
      label: 'Khách hàng',
      children: [
        {
          label: 'Khách hàng',
          value: '/m-layout/m-khach-hang'
        },
        {
          label: 'Lịch sử thông tin KH',
          value: '/m-layout/m-khach-hang/m-luu-lich-su-kh'
        }
      ]
    },
    {
      value: '4',
      label: 'Danh mục',
      children: [
        {
          label: 'Lợi nhuận',
          value: '/m-layout/m-danh-muc/m-loi-nhuan'
        },
        {
          label: 'Chênh lệch',
          value: '/m-layout/m-danh-muc/m-chenh-lech'
        },
        {
          label: 'Kho hàng',
          value: '/m-layout/m-danh-muc/m-kho-hang'
        },
        {
          label: 'Sản phẩm',
          value: '/m-layout/m-danh-muc/m-product'
        },
        {
          label: 'Nhà cung cấp',
          value: '/m-layout/m-danh-muc/m-nha-cung-cap'
        },
        {
          label: 'Cước vận chuyển',
          value: '/m-layout/m-danh-muc/m-cuoc-van-chuyen'
        },
        {
          label: 'Lái xe',
          value: '/m-layout/m-danh-muc/m-lai-xe'
        },
        {
          label: 'Chiết khấu',
          value: '/m-layout/m-danh-muc/m-chiet-khau'
        },
        {
          label: 'Vùng',
          value: '/m-layout/m-layout/m-danh-muc/m-vung'
        },
        {
          label: 'Ngành nghề',
          value: '/m-layout/m-danh-muc/m-nganh-nghe'
        },
        {
          label: 'Phòng ban',
          value: '/m-layout/m-danh-muc/m-phong-ban'
        },
        {
          label: 'Phương án nhập',
          value: '/m-layout/m-danh-muc/m-phuong-an-nhap'
        }
      ]
    },
    {
      value: '5',
      label: 'Bán hàng',
      children: [
        {
          label: 'Đơn hàng công nghiệp',
          value: '/m-layout/m-quan-ly-ban-hang/m-don-hang-cong-nghiep'
        },
        {
          label: 'Đơn hàng thương mại',
          value: '/m-layout/m-quan-ly-ban-hang/m-don-hang-thuong-mai'
        }
      ]
    },
    {
      value: '6',
      label: 'Mua hàng',
      children: [
        {
          label: 'Đơn mua hàng công nghiệp',
          value: '/m-layout/m-quan-ly-mua-hang/m-mua-hang-cong-nghiep'
        },
        {
          label: 'Đơn mua hàng thương mại',
          value: '/m-layout/m-quan-ly-mua-hang/m-mua-hang-thuong-mai'
        }
      ]
    },
    {
      value: '7',
      label: 'Thống kê',
      children: [
        {
          label: 'Số lượng khách hàng',
          value: '/m-layout/m-thong-ke/m-thong-ke-so-luong-khach-hang'
        },
      ]
    },
    {
      value: '8',
      label: 'Báo cáo',
      children: [
        {
          label: 'Báo cáo thêm khách hàng',
          value: '/m-layout/m-bao-cao/m-bao-cao-them-khach-hang'
        },
        {
          label: 'Báo cáo thêm KH theo tháng',
          value: '/m-layout/m-bao-cao/m-bao-cao-them-khach-hang-theo-nhan-vien'
        },
        {
          label: 'Báo cáo thêm khách hàng nhân viên kinh doanh',
          value: '/m-layout/m-bao-cao/m-bao-cao-them-khach-hang-theo-nhan-vien-KD'
        }
      ]
    },
  ];

  onChange(value: any) {
    let label = '';
    this.dataMenu.forEach(dataItem => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          for (let i = 0; i < dataItem.children.length; i++) {
            const cItem = dataItem.children[i];
            if (cItem.value === value[1]) {
              label += cItem.label;
              console.log(value[1]);

              this.router.navigateByUrl(value[1]);
              // this.router.navigate(['m-layout/m-account/m-list']);/m-layout/m-khach-hang
              this.onMaskClick();
            }
          }
        }
      }
    });
    console.log(label);
  }

  handleClick(e: any) {
    e.preventDefault();
    this.show = !this.show;
    if (!this.initData) {
      setTimeout(() => {
        this.initData = this.dataMenu;
      }, 500);
    }
  }

  onMaskClick() {
    this.show = false;
  }

  onSelect(event) {
    console.log(event);
  }

  onVisibleChange(event) {
    console.log(event);
  }

  onLeftClick() {
    console.log('onLeftClick');
  }
  logout() {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống ngay bây giờ?',
      // nzContent: '<b style='color: red;'>Some descriptions</b>',
      nzOkText: 'Có',
      nzOnOk: () => {
        this.usersv
          .SetOnline(localStorage.getItem('userId'), false)
          .subscribe((rs: any) => {
            // không thể set trạng thai offline
          });
        
       //this.signalRService.stopConnection();
        this.authsv.mlogout();
        //this.router.navigateByUrl('m-dang-nhap');
             
      },
      nzCancelText: 'Không',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  // openHandler(value: string): void {
  //   for (const key in this.openMap) {
  //     if (key !== value) {
  //       this.openMap[key] = false;
  //     }
  //   }
  // }
  onOpenChange(event) {
    console.log(event);
    this.state.open = !this.state.open;
  }
  onCloseChange(){
    this.state.open = false;
  }
}
