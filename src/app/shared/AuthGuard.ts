import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router, 
        private message: NzMessageService,
        private authService: AuthService,
        private userService: UserService,
        ) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.decodedToken) {
            // const userRoles = this.authService.decodedToken.role as Array<string>;
            // if (!userRoles) {
            //     this.message.error('Bạn không có quyền vào trang này');
            //     this.router.navigate(['/dang-nhap'], { queryParams: { returnUrl: state.url } });
            //     return false;
            // }
            // console.log(this.authService.decodedToken);
        }
        if (this.authService.loggedIn()) {
            // GetCookie(this.cookieService, this.userService);
            return true;
        }
        this.message.remove();
        this.message.error('Bạn cần phải đăng nhập');
        this.router.navigate(['/dang-nhap'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
