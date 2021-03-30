import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MAccountComponent } from './m-account.component';

import { MAccountListComponent } from './m-account-list/m-account-list.component';

import { MAddAccountComponent } from './m-add-account/m-add-account.component';
import { MAccountEditComponent } from './m-account-edit/m-account-edit.component';
import { MAccountChangePasswordComponent } from './m-account-change-password/m-account-change-password.component';
import { MAccountChangepassComponent } from './m-account-changepass/m-account-changepass.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path:'',
                redirectTo:'',
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
                path:'m-list',
                component: MAccountListComponent,
                data: {
                    customBreadcrumb: 'm-list'
                },
            },
            {
                path:'m-add-account',
                component: MAddAccountComponent,
                data: {
                    customBreadcrumb: 'm-add-account',
                    title: 'Thê mới'
                },
            },
            {
                path:'m-setting',
                component: MAccountEditComponent,
                data: {
                    customBreadcrumb: 'm-Setting'
                },
            },
            {
                path:'m-account-change-password',
                component: MAccountChangePasswordComponent,
                data: {
                    customBreadcrumb: 'm-account-change-password'
                },
            },
            {
                path:'m-account-changepass/:id',
                component: MAccountChangepassComponent,
                data: {
                    customBreadcrumb: 'm-account-changepass'
                },
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MAccountRoutingModule { }
