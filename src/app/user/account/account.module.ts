import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { SharedModule } from 'src/app/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountCenterComponent } from './account-center/account-center.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountChangepassComponent } from './modals/account-changepass/account-changepass.component';
import { AccountAddEditModalComponent } from './modals/account-add-edit-modal/account-add-edit-modal.component';
import { RolePermissionComponent } from './modals/role-permission/role-permission.component';
import { ListRoleComponent } from './modals/list-role/list-role.component';
import { AddEditRoleComponent } from './modals/add-edit-role/add-edit-role.component';
import { UserManagerDoanhNghiepComponent } from './modals/user-manager-doanh-nghiep/user-manager-doanh-nghiep.component';
import { AccountRoleTreeComponent } from './account-role-tree/account-role-tree.component';
import { AccountRoleTreeDetailModalComponent } from './modals/account-role-tree-detail-modal/account-role-tree-detail-modal.component';
import { AccountSystemComponent } from './account-system/account-system.component';
import { AccountListRoleComponent } from './account-list-role/account-list-role.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [AccountComponent, AccountCenterComponent, AccountSettingComponent,
    AccountEditComponent, AccountChangePasswordComponent, AccountListComponent,
    AccountChangepassComponent, AccountAddEditModalComponent, RolePermissionComponent,
    ListRoleComponent, AddEditRoleComponent, UserManagerDoanhNghiepComponent,AccountRoleTreeComponent,
    AccountRoleTreeDetailModalComponent,AccountSystemComponent,AccountListRoleComponent
  ],
  entryComponents: [
    AccountChangepassComponent,
    AccountAddEditModalComponent,
    RolePermissionComponent,
    ListRoleComponent, AddEditRoleComponent, UserManagerDoanhNghiepComponent,AccountRoleTreeComponent,
    AccountRoleTreeDetailModalComponent,AccountSystemComponent,AccountListRoleComponent
  ],
})
export class AccountModule { }
