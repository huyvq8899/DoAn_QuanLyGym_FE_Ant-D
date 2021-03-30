import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AccountChangepassComponent } from '../modals/account-changepass/account-changepass.component';
import { AccountAddEditModalComponent } from '../modals/account-add-edit-modal/account-add-edit-modal.component';
import { go_full_screen } from 'src/app/customValidators/set-full-screen';
import { RolePermissionComponent } from '../modals/role-permission/role-permission.component';
import { ListRoleComponent } from '../modals/list-role/list-role.component';
import { UserManagerDoanhNghiepComponent } from '../modals/user-manager-doanh-nghiep/user-manager-doanh-nghiep.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  fullScreen = false;
  userListView: any[] = [];
  userAll: any[] = [];
  loadingTable = false;
  currentUser: any;
  constructor(
    private usersv: UserService,
    private router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.load();
  }
  load() {
    this.loadingTable = true;
    this.usersv.GetAllActiveByUser(localStorage.getItem('userId')).subscribe((rs: any) => {
      console.log(rs);
      this.userListView = rs;
      this.userAll = rs;
      this.loadingTable = false;
    }, _ => {
      this.loadingTable = false;
    });
  }
  changeStatus(userId: string) {
    this.usersv.changeStatus(userId).subscribe(rs => {
      if (rs) {
        this.message.success('Cập nhật thành công');
      } else {
        this.message.error('Lỗi cập nhật trạng thái');
      }
    }, _ => {
      this.message.error('Có lỗi xảy ra');
    });
  }
  changePass(id: string) {
    const modal = this.modalService.create({
      nzTitle: 'Đổi mật khẩu',
      nzContent: AccountChangepassComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: 680,
      nzComponentParams: {
        id: id
      },
      // nzFooter: [
      //   {
      //     label: 'Hủy',
      //     shape: 'default',
      //     onClick: () => modal.destroy(),
      //   },
      //   {
      //     label: 'Lưu',
      //     type: 'primary',
      //     onClick: (componentInstance) => {
      //       componentInstance.saveChanges();
      //     }
      //   }
      // ]
      nzFooter: [null]
    });
    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        // this.loadData();
      }
    });
  }
  addnew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm tài khoản',
      nzContent: AccountAddEditModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: 680,
      nzComponentParams: {
        isAddNew: true
      },
      nzFooter: [null
        // {
        //   label: 'Hủy',
        //   shape: 'default',
        //   onClick: () => modal.destroy(),
        // },
        // {
        //   label: 'Lưu',
        //   type: 'primary',
        //   onClick: (componentInstance) => {
        //     componentInstance.saveChanges();
        //   }
        // }
      ]
    });
    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.load();
      }
    });
  }
  edit(id: string) {
    this.loadingTable = true;
    this.usersv.GetById(id).subscribe((rs: any) => {
      this.loadingTable = false;
      if (rs) {
        const modal = this.modalService.create({
          nzTitle: 'Sửa tài khoản',
          nzContent: AccountAddEditModalComponent,
          nzMaskClosable: false,
          nzClosable: false,
          nzWidth: 680,
          nzComponentParams: {
            isAddNew: false,
            data: rs
          },
          nzFooter: [null]
        });
        modal.afterClose.subscribe((result: boolean) => {
          if (result) {
            this.load();
          }
        });
      }
    });
  }
  setRole(userId: string, roleName: string) {
    const model: any = {
      // tslint:disable-next-line:object-literal-shorthand
      userId: userId,
      // tslint:disable-next-line:object-literal-shorthand
      roleName: roleName
    };
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn không?',
      // nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước kho xóa</b>',
      nzOkText: 'Có',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.usersv.SetRole(model).subscribe(rs => {
          if (rs) {
            this.message.success('Cập nhật thành công');
            this.load();
          } else {
            this.message.error('Lỗi cập nhật');
          }
        }, _ => {
          this.message.error('Có lỗi xảy ra');
        });
      },
      nzCancelText: 'Không',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  changeSearch(event: any) {
    const arrCondition = ['userName', 'fullName', 'title', 'createdDate', 'email', 'phone', 'address','phong'];
    this.userListView = SearchEngine(this.userAll, arrCondition, event);
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 45) {
      this.addnew();
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 122) {
      this.toggleFullScreen();
    }
  }
  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
    go_full_screen();
  }
  setRolePer() {
    const modal = this.modalService.create({
      nzTitle: 'Thiết lập quyền',
      nzContent: ListRoleComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzStyle: {
        top: '10px'
      },
      nzWidth: 680,
      nzComponentParams: {
      },
      nzFooter: [null] 
    });
    modal.afterClose.subscribe((result: boolean) => {

    });
  }
  setPerOnCompany(data: any) {
    const modal = this.modalService.create({
      nzTitle: 'Thiết lập quyền theo doanh nghiệp',
      nzContent: UserManagerDoanhNghiepComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '1300px',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        userData: data
      },
      nzFooter: [null
      ]
    });
    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.load();
      }
    });
  }
}
