import { Component,OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationError, Router } from '@angular/router';
import { ToastService } from 'ng-zorro-antd-mobile';
import { EnvService } from 'src/app/env.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './m-login.component.html',
  styleUrls: ['./m-login.component.scss']
})
export class MLoginComponent implements OnInit {
  passwordVisible = false;
  loginForm: any;
  // data: LoginModel;
  // url: string;
  data: any;
  url: any;
 
  constructor(
    private _toast: ToastService,
    private fb: FormBuilder,
    private usersv: UserService,
    private authsv: AuthService,
    private env: EnvService,
    private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log('Lỗi điều hướng');
        this.url = 'bang-dieu-khien';
        this.router.navigate([this.url]);
      } 
    });
  }

    ngOnInit() {
      console.log(this.env.apiUrl);
      this.loginForm = this.fb.group({
        userName: [null, [Validators.required]],
        password: [null, [Validators.required]],
        remember: [null]
      });
    }


  inputErrorClick(e: any) {
    this._toast.info('Please enter 11 digits');
  }
  submitForm(): void {
    const data = this.loginForm.getRawValue();
    console.log(data);
    const toast = this._toast.loading('Loading...', 3000, () => {
      console.log('Load complete !!!');
    });

    if (this.loginForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
      // this.modal.destroy(true);
      return;
    }

    this.data = this.loginForm.value;
    // console.log(this.data);
    this.authsv.login(this.data).subscribe((rs: any) => {
      // console.log(rs);
      if (rs.tokenKey === '') {
        this.router.navigate(['m-dang-nhap']);
      }
      if (rs.result === 1) {
        const toast = this._toast.success('Đăng nhập thành công !!!', 3000);
        // chuyển hướng đến trang admin
        // localStorage.setItem('userName', rs.userName);
        // localStorage.setItem('userId', rs.userId);
        // localStorage.setItem('tokenKey', rs.tokenKey);
        // localStorage.setItem('roleName', JSON.stringify(rs.listRoles.map(x => x.roleName)));
        // tslint:disable-next-line:no-shadowed-variable
        console.log();
        this.usersv.SetOnline(localStorage.getItem('userId') as any, true).subscribe((rs: any) => {
          if (rs) {
            //this.router.navigateByUrl('/test');
            //this.router.navigate(['m-layout/m-account']);
            this.router.navigate(['m-layout/m-khach-hang']);
          }
          else {
            const toast = this._toast.offline('Lỗi đăng nhập !!!', 3000);
          }
        });
      } else if (rs.result === 2) {
        const toast = this._toast.offline('Tài khoản bị khóa !!!', 3000);
      } else if (rs.result === -1) {
        const toast = this._toast.offline('Tài khoản không tồn tại !!!', 3000);
      } else if (rs.result === 0) {
        const toast = this._toast.fail('Sai mật khẩu !!!', 3000);
      }
    });

   
  }

  loadingToast() {
    // const toast = this._toast.loading('Loading...', 3000, () => {
    //   console.log('Load complete !!!');
    // });
  }
}
