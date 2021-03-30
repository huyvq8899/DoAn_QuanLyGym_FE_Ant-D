import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/user.service';
import { CheckChangePasswordConfirmValidator } from 'src/app/customValidators/check-change-password-confirm-validator';

@Component({
  selector: 'app-account-changepass',
  templateUrl: './account-changepass.component.html',
  styleUrls: ['./account-changepass.component.css']
})
export class AccountChangepassComponent implements OnInit {
  @Input() id: any;
  changePasswordForm: FormGroup;
  spinning = false;
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 13) {
      this.saveChanges();
    }
  }

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private userService: UserService,
    private message: NzMessageService) { }

  ngOnInit() {
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
    if (this.changePasswordForm.invalid) {
      // tslint:disable-next-line:forin
      for (const key in this.changePasswordForm.controls) {
        this.changePasswordForm.controls[key].markAsDirty();
        this.changePasswordForm.controls[key].updateValueAndValidity();
      }
      return;
    }
    const obj: any = {
      userId: this.id,
      password: this.changePasswordForm.get('password').value
    };
    this.spinning = true;
    this.userService.UpdatePassWord(obj).subscribe((res: any) => {
      this.spinning = false;
      if (res === 1) {
        this.message.success('Thay đổi mật khẩu thành công');
        this.changePasswordForm.reset();
        this.modal.destroy(true);
      } else {
        this.modal.destroy(false);
      }
    }, _ => {
      this.spinning = false;
      console.log('error changePassword');
      this.message.error('Có lỗi xảy ra');
      this.modal.destroy(false);
    });
  }
  closeModal() {
    this.modal.destroy();
  }
}
