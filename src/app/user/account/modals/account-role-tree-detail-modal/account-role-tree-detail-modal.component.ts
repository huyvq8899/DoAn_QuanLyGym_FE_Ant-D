import { Component, Input, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { AccountAddEditModalComponent } from '../account-add-edit-modal/account-add-edit-modal.component';
import { AccountChangepassComponent } from '../account-changepass/account-changepass.component';
import { AddEditRoleComponent } from '../add-edit-role/add-edit-role.component';
import { RolePermissionComponent } from '../role-permission/role-permission.component';
import { UserManagerDoanhNghiepComponent } from '../user-manager-doanh-nghiep/user-manager-doanh-nghiep.component';

@Component({
  selector: 'app-account-role-tree-detail-modal',
  templateUrl: './account-role-tree-detail-modal.component.html',
  styleUrls: ['./account-role-tree-detail-modal.component.css']
})
export class AccountRoleTreeDetailModalComponent implements OnInit {
  @Input() roleId: any;
  listUsers: any[] = [];
  role: any;
  loading: boolean;
  currentUser: any;
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private modalService: NzModalService,
    private modal: NzModalRef,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    this.GetForkJoin().subscribe(
      (res: any[]) => {
        this.loading = false;
        this.listUsers = res[0],
          this.role = res[1];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  LoadData() {
    this.GetForkJoin().subscribe(
      (res: any[]) => {
        this.loading = false;
        this.listUsers = res[0],
          this.role = res[1];
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  changeStatus(userId: string) {
    this.userService.changeStatus(userId).subscribe(rs => {
      if (rs) {
        this.message.success('Cập nhật thành công');
      } else {
        this.message.error('Lỗi cập nhật trạng thái');
      }
    }, _ => {
      this.message.error('Có lỗi xảy ra');
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
        this.LoadData();
      }
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
      nzFooter: [null]
    });
    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        // this.loadData();
      }
    });
  }

  edit(id: string) {
    this.loading = true;
    this.userService.GetById(id).subscribe((rs: any) => {
      this.loading = false;
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
            this.LoadData();
          }
        });
      }
    });
  }

  GetForkJoin() {
    return forkJoin([
      this.userService.GetByRoleId(this.roleId),
      this.roleService.GetById(this.roleId)
    ])
  }

  closeModal() {
    this.modal.destroy();
  }
}
