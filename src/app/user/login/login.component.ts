import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/LoginModel';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, NavigationError } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  url: string;
  loginForm: FormGroup;
  data: LoginModel;
  isLoadingLogin = false;
  constructor(
    private fb: FormBuilder,
    private usersv: UserService,
    private authsv: AuthService,
    private message: NzMessageService,
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
  ngOnInit(): void {
    if (this.authsv.loggedIn()) {
      this.router.navigate(['/']);
    }
    this.route.queryParams.subscribe(rs => {
      // tslint:disable-next-line: no-string-literal
      if (rs['returnUrl'] === undefined) {
        this.url = 'khach-hang';
      } else {
        // tslint:disable-next-line: no-string-literal
        this.url = rs['returnUrl'];
      }
    });
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
  submitForm(): void {
    // tslint:disable-next-line:forin
    if (this.loginForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
      // this.modal.destroy(true);
      return;
    }
    // login
    this.isLoadingLogin = true;
    this.data = this.loginForm.value;
    // console.log(this.data);
    this.authsv.login(this.data).subscribe((rs: any) => {
      // console.log(rs);
      if (rs.tokenKey === '') {
        this.router.navigate(['dang-nhap']);
      }
      if (rs.result === 1) {
        this.message.success('Đăng nhập thành công');
        // chuyển hướng đến trang admin
        // localStorage.setItem('userName', rs.userName);
        // localStorage.setItem('userId', rs.userId);
        // localStorage.setItem('tokenKey', rs.tokenKey);
        // localStorage.setItem('roleName', JSON.stringify(rs.listRoles.map(x => x.roleName)));
        // tslint:disable-next-line:no-shadowed-variable
        this.usersv.SetOnline(localStorage.getItem('userId'), true).subscribe((rs: any) => {
          if (rs) {
            this.router.navigateByUrl(this.url);
          }
          else {
            this.message.error('Lỗi đăng nhập');
            this.router.navigate(['dang-nhap']);
          }
        });
      } else if (rs.result === 2) {
        this.message.warning('Tài khoản bị khóa');
      } else if (rs.result === -1) {
        this.message.error('Tài khoản không tồn tại');
      } else if (rs.result === 0) {
        this.message.error('Sai mật khẩu');
      }
      this.isLoadingLogin = false;
    });

  }
}
