import { Component, OnInit, HostListener, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FunctionRoleService } from 'src/app/services/function-role.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  @Input() data: any;
  spinning = false;
  listFunctionRole: any[] = [];
  constructor(
    private modal: NzModalRef,
    private functionRoleService: FunctionRoleService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.GetFunctionByRoleName();
  }
  GetFunctionByRoleName() {
    this.functionRoleService.GetFunctionByRoleName(this.data.roleName).subscribe((rs: any) => {
      console.log(rs);
      this.listFunctionRole = rs;
    });
  }
  saveChanges() {
    console.log(this.listFunctionRole);
    this.spinning = true;
    this.functionRoleService.UpdateFunctionRole(this.listFunctionRole).subscribe(
      (result: any) => {
        this.spinning = false;
        if (result) {
          this.message.create('success', `Cập nhật tài khoản thành công`);
          // console.log(result);
          this.modal.destroy(result);
        } else {
          this.message.create('error', `Sửa lỗi`);
          // console.log(result);
          this.modal.destroy(result);
        }
      }
    );
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      this.saveChanges();
    }
  }
  closeModal() {
    this.modal.destroy();
  }
  changeActive(i, j, event) {
    console.log(event);
    this.listFunctionRole[i].listFunction[j].active = event;
  }
}
