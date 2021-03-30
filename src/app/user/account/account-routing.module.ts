import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountCenterComponent } from './account-center/account-center.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoleTreeComponent } from './account-role-tree/account-role-tree.component';
import { AccountSystemComponent } from './account-system/account-system.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path:'',
                redirectTo:'system',
                pathMatch:'full'
            },
            // {
            //     path:'center',
            //     component: AccountCenterComponent,
            //     data: {
            //         customBreadcrumb: 'Center'
            //     },
            // },
            {
                path:'setting',
                component: AccountSettingComponent,
                data: {
                    customBreadcrumb: 'Setting'
                },
            },
            {
                path:'list',
                component: AccountListComponent,
                data: {
                    customBreadcrumb: 'List'
                },
            },
            {
                path:'tree',
                component: AccountRoleTreeComponent,
                data: {
                    customBreadcrumb: 'Tree'
                },
            }
            ,
            {
                path:'system',
                component: AccountSystemComponent,
                data: {
                    customBreadcrumb: 'Tree'
                },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
