import { Component, OnInit } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent, } from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode, } from 'ng-zorro-antd/tree';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { AccountRoleTreeDetailModalComponent } from '../modals/account-role-tree-detail-modal/account-role-tree-detail-modal.component';
import { AddEditRoleComponent } from '../modals/add-edit-role/add-edit-role.component';

@Component({
  selector: 'app-account-role-tree',
  templateUrl: './account-role-tree.component.html',
  styleUrls: ['./account-role-tree.component.scss']
})
export class AccountRoleTreeComponent implements OnInit {
  nodes: any[] = [];
  //tree
  activatedNode?: NzTreeNode;
  constructor(
    private roleService: RoleService,
    private nzContextMenuService: NzContextMenuService,
    private userService: UserService,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.roleService.GetRoleByTree().subscribe(
      (res: any[]) => {
        this.nodes = res;
        console.log(this.nodes);
      }
    );
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
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
    console.log(data);
    this.activatedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  clickOpenDetail(node: any) {
    const modal = this.modalService.create({
      nzTitle: 'Chi tiết',
      nzContent: AccountRoleTreeDetailModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzStyle: {
        top: '10px'
      },
      nzWidth: '1000px',
      nzComponentParams: {
        roleId: node.key
      },
      nzFooter: [null]
    });
    modal.afterClose.subscribe((result: boolean) => {
    });
  }

  clickSua(data: any) {
    // call modal
    if (data.roleName === 'ADMIN') {
      return;
    }
    this.roleService.GetById(data.roleId).subscribe((rs: any) => {
      const modal = this.modalService.create({
        nzTitle: 'Sửa',
        nzContent: AddEditRoleComponent,
        nzMaskClosable: false,
        nzClosable: true,
        nzWidth: '400',
        nzWrapClassName: "vertical-center-modal",
        nzBodyStyle: { 'padding': '1px' },
        nzComponentParams: {
          isAddNew: false,
          data: rs
        },
        nzFooter: [
          null
        ]
      });
      modal.afterClose.subscribe((rs: any) => {
        if (rs) {
          this.LoadData();
        }
      });
    })
  }
}
