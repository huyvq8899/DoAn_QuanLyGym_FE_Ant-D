import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CheckChangePasswordConfirmValidator } from 'src/app/customValidators/check-change-password-confirm-validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-account-change-password',
  templateUrl: './m-account-change-password.component.html',
  styleUrls: ['./m-account-change-password.component.scss']
})
export class MAccountChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  isLoading= false;
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 13) {
      this.saveChanges();
    }
  }
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Cập nhật mật khẩu'
    });
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [
        Validators.required,
        CheckChangePasswordConfirmValidator
      ]]
    });
  }

  saveChanges() {
    console.log('subit pass');
    
    if (this.changePasswordForm.invalid) {
      // tslint:disable-next-line:forin
      for (const key in this.changePasswordForm.controls) {
        this.changePasswordForm.controls[key].markAsDirty();
        this.changePasswordForm.controls[key].updateValueAndValidity();
      }
      return;
    }
    const obj: any = {
      userId: localStorage.getItem('userId'),
      password: this.changePasswordForm.get('password').value
    };
    console.log('subit pass1');
    this.isLoading= true;
    this.userService.UpdatePassWord(obj).subscribe((res: any) => {
      if (res === 1) {
        this.message.success('Thay đổi mật khẩu thành công');
        this.changePasswordForm.reset();
        this.isLoading= false;
        this.BackPages();
      } else {
        this.isLoading= false;
      }
    }, _ => {
      console.log('error changePassword');
      this.message.error('Có lỗi xảy ra');
      this.isLoading= false;
    });
  }
  BackPages() {
    this.router.navigate(['m-layout']);
  }

}
