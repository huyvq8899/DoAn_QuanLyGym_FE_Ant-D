import { BaoCaoXinNghiComponent } from './views/xin-nghi/bao-cao-xin-nghi/bao-cao-xin-nghi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/AuthGuard';
import { Page404Component } from './page404/page404.component';
import { LayoutComponent } from './layout/layout.component';
import { DesktopGuard, MobileGuard } from './device-guard';
import { MLayoutComponent } from './m-layout/m-layout.component';
import { XinNghiComponent } from './views/xin-nghi/xin-nghi.component';
import { CardComponent } from './views/card/card.component';
import { MCardComponent } from './views/m-card/m-card.component';
import { MAddEditCardComponent } from './views/m-card/modal/m-add-edit-card/m-add-edit-card.component';

// {
//     path: '',
//     component: AppComponent,
//     canActivate: [DesktopGuard],
//     children: [... desktop routes ...]
//   },
//   {
//     path: 'm',
//     component: MobileAppComponent,
//     canActivate: [MobileGuard],
//     children: [... mobile routes ...]
//   }

const routes: Routes = [
    {
        path: 'm-dang-nhap',
        canActivate: [MobileGuard],
        loadChildren: () => import('./user/m-login/m-login.module').then(m => m.MLoginModule)
    },
    
    {
        path: '', redirectTo: 'khach-hang', pathMatch: 'full',
        canActivate: [DesktopGuard],
    },
    {
        path: 'dang-nhap',
        canActivate: [DesktopGuard],
        loadChildren: () => import('./user/login/login.module').then(m => m.LoginModule)
    },
    //mobile-routing
    {
        path: 'm-layout', component: MLayoutComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'm-khach-hang', pathMatch: 'full' },
            {
                path: 'm-bang-dieu-khien',
                loadChildren: () => import('./user/m-account/m-account.module').then(m => m.MAccountModule),
            },
            {   path: 'm-account',
                loadChildren: () => import('./user/m-account/m-account.module').then(m => m.MAccountModule),
                data: {
                    customBreadcrumb: 'Account'
                },
            },
            // {
            //     path: 'account',
            //     loadChildren: () => import('./user/m-account/m-account.module').then(m => m.MAccountModule),
            // },
            {
                path: 'm-khach-hang',
                loadChildren: () => import('./views/m-khach-hang/m-khach-hang.module').then(m => m.MKhachHangModule),
            },
            {
                path: 'm-danh-muc',
                loadChildren: () => import('./views/m-danh-muc/m-danh-muc.module').then(m => m.MDanhMucModule),
            },
            {
                path: 'm-quan-ly-mua-hang',
                loadChildren: () => import('./views/m-quan-ly-mua-hang/m-quan-ly-mua-hang.module').then(m => m.MQuanLyMuaHangModule),
            },
            {
                path: 'm-quan-ly-ban-hang',
                loadChildren: () => import('./views/m-quan-ly-ban-hang/m-quan-ly-ban-hang.module').then(m => m.MQuanLyBanHangModule),
            },
            {
                path: 'm-xin-nghi',
                loadChildren: () => import('./views/m-xin-nghi/m-xin-nghi.module').then(m => m.MXinNghiModule),
            },
            {
                path: 'm-thong-ke',
                loadChildren: () => import('./views/m-thong-ke/m-thong-ke.module').then(m => m.MThongKeModule),
            },
            {
                path: 'm-bao-cao',
                loadChildren: () => import('./views/m-bao-cao/m-bao-cao.module').then(m => m.MBaoCaoModule),
            },
             {
                path: 'm-card',
                component:MCardComponent
            },
            {
                //path:'m-khach-hang',
                path:'m-add-edit-card',
                component: MAddEditCardComponent
            },
          
        ]
    },
    {
        path: '', component: LayoutComponent,
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'khach-hang', pathMatch: 'full' },
            {
                path: 'bang-dieu-khien',
                loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            {
                path: 'he-thong',
                loadChildren: () => import('./views/he-thong/he-thong.module').then(m => m.HeThongModule),
            },
            {
                path: 'khach-hang',
                loadChildren: () => import('./views/khach-hang/khach-hang.module').then(m => m.KhachHangModule),
            },
            {
                path: 'quan-ly-ban-hang',
                loadChildren: () => import('./views/quan-ly-ban-hang/quan-ly-ban-hang.module').then(m => m.QuanLyBanHangModule),
            },
            {
                path: 'quan-ly-mua-hang',
                loadChildren: () => import('./views/quan-ly-mua-hang/quan-ly-mua-hang.module').then(m => m.QuanLyMuaHangModule),
            },
            {
                path: 'quan-ly-tai-chinh-ke-toan',
                loadChildren: () => import('./views/quan-ly-tai-chinh-ke-toan/quan-ly-tai-chinh-ke-toan.module').then(m => m.QuanLyTaiChinhKeToanModule),
            },
            {
                path: 'tinh-doanh-so-ban-hang',
                loadChildren: () => import('./views/tinh-doanh-so-ban-hang/tinh-doanh-so-ban-hang.module').then(m => m.TinhDoanhSoBanHangModule),
            },
            {
                path: 'quan-ly-cong-viec',
                loadChildren: () => import('./views/quan-ly-cong-viec/quan-ly-cong-viec.module').then(m => m.QuanLyCongViecModule),
            },
            {
                path: 'danh-muc',
                loadChildren: () => import('./views/danh-muc/danh-muc.module').then(m => m.DanhMucModule),
            },
            {
                path: 'account',
                loadChildren: () => import('./user/account/account.module').then(m => m.AccountModule),
                data: {
                    customBreadcrumb: 'Account'
                },
            },
            {
                path: 'thong-ke',
                loadChildren: () => import('./views/thong-ke/thong-ke.module').then(m => m.ThongKeModule),
            },
            {
                path: 'bao-cao',
                loadChildren: () => import('./views/bao-cao/bao-cao.module').then(m => m.BaoCaoModule),
            },
            {
                path: 'xin-nghi/de-xuat-xin-nghi',
                component:XinNghiComponent
            },
            {
                path: 'xin-nghi/thong-ke-xin-nghi',
                component:BaoCaoXinNghiComponent
            },
            {
                path: 'card',
                component:CardComponent
            },
        ]
    },
    // { path: '404', component: Page404Component },
    // { path: '**', redirectTo: '/404' }

];
@NgModule({
    // imports: [RouterModule.forRoot(routes, { useHash: true })],
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [
//     LayoutComponent, LoginComponent
// ];
