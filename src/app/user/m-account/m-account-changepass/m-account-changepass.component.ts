import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/user.service';
import { CheckChangePasswordConfirmValidator } from 'src/app/customValidators/check-change-password-confirm-validator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-m-account-changepass',
  templateUrl: './m-account-changepass.component.html',
  styleUrls: ['./m-account-changepass.component.scss']
})
export class MAccountChangepassComponent implements OnInit {

   @Input() id: any;
  //@Input() id='920bb11c-f63d-4821-99e7-a00a4c4ac020';
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
    //private modal: NzModalRef,
    private userService: UserService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.createForm();
    this.route.paramMap.subscribe((params: ParamMap)=>{
     this.id =  params.get('id');
     console.log(this.id);
    });
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
        //this.modal.destroy(true);
      } else {
        //this.modal.destroy(false);
      }
    }, _ => {
      this.spinning = false;
      console.log('error changePassword');
      this.message.error('Có lỗi xảy ra');
      //this.modal.destroy(false);
    });
  }
  BackPages(){
    this.router.navigate(['m-layout/m-account/m-list']);
  }
}
