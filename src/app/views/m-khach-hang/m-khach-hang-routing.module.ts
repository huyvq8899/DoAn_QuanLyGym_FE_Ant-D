import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MAddEditKhachHangComponent } from './m-add-edit-khach-hang/m-add-edit-khach-hang.component';
import { MAddKhachHangComponent } from './m-add-khach-hang/m-add-khach-hang.component';
import { MKhachHangComponent } from './m-khach-hang.component';
import { MLuuLichSuKHComponent } from './m-luu-lich-su-KH/m-luu-lich-su-KH.component';
import { MChiTietLuuLichSuComponent } from './m-luu-lich-su-KH/modals/m-chi-tiet-luu-lich-su/m-chi-tiet-luu-lich-su.component';

const routes: Routes = [
    {
        path: '',
        component: MKhachHangComponent,
    },
    {
        path: '',
        children: [
            {
                path:'',
                redirectTo:'',
                pathMatch:'full'
            },
            {
                path:'m-khach-hang',
                component: MKhachHangComponent,
                data: {
                    customBreadcrumb: 'm-khach-hang'
                },
            },
           
            {
                //path:'m-khach-hang',
                path:'m-add-khach-hang',
                component: MAddKhachHangComponent,
                data: {
                    customBreadcrumb: 'm-add-khach-hang'
                },
            },
            {
                //path:'m-khach-hang',
                path:'m-add-edit-khach-hang',
                component: MAddEditKhachHangComponent,
                data: {
                    customBreadcrumb: 'm-add-edit-khach-hang'
                },
            },
            {
                //path:'m-khach-hang',
                path:'m-luu-lich-su-kh',
                component: MLuuLichSuKHComponent,
                data: {
                    customBreadcrumb: 'm-luu-lich-su-kh'
                },
            },
                {
                //path:'m-khach-hang',
                path:'m-luu-lich-su-kh/m-chi-tiet-luu-lich-su-kh',
                component: MChiTietLuuLichSuComponent,
            }
            // {
            //     path:'m-add-account',
            //     component: MAddAccountComponent,
            //     data: {
            //         customBreadcrumb: 'm-add-account',
            //         title: 'Thê mới'
            //     },
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class MKhachHangRoutingModule { }
