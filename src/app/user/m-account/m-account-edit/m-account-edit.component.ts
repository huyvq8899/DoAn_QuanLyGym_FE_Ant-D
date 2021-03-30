import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NoWhitespaceValidator } from 'src/app/customValidators/no-whitespace-validator';
import { GetDate } from 'src/app/shared/getDate';
import { ValidatorsDupcateName } from 'src/app/customValidators/validatorsDupcateName';
import { ValidatorsDupcateUserName } from 'src/app/customValidators/validatorsDupcateName';
import { ValidatorsDupcateMail } from 'src/app/customValidators/validatorsDupcateMail';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m-account-edit',
  templateUrl: './m-account-edit.component.html',
  styleUrls: ['./m-account-edit.component.scss']
})
export class MAccountEditComponent implements OnInit {

  isAddNew = false;
  data = JSON.parse(localStorage.getItem('currentUser'));
  userForm: FormGroup;
  roles: any = [];
  isLoading = false;
  constructor(
    private usersv: UserService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private sharedService: SharedService,) { }
  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Chỉnh sửa tài khoản'
    });

    this.createformUpdate();
      this.userForm.patchValue(this.data);
      this.userForm.get('dateOfBirth').setValue(GetDate(this.data.dateOfBirth));
  }
  createformUpdate() {
    this.userForm = this.fb.group({
      userId: [null, [Validators.required]],
      userName: [{ value: null, disabled: true }, [Validators.required, NoWhitespaceValidator], [ValidatorsDupcateUserName(this.usersv,this.data.userName)]],
      fullName: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [{ value: null, disabled: false }, [Validators.required, Validators.email, NoWhitespaceValidator], [ValidatorsDupcateMail(this.usersv, this.data.email)]],
      title: [null],
      roleId: [null, [Validators.required]],
      dateOfBirth: [null],
      phone: [null],
      address: [null],
    });
  }
  saveChanges(): void {
    const data = this.userForm.getRawValue();
    console.log(data);
    if (this.userForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.userForm.controls) {
        this.userForm.controls[i].markAsDirty();
        this.userForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    // console.log('submitted');
      this.isLoading = true;
      this.usersv.Update(this.userForm.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            this.message.create('success', `Cập nhật tài khoản thành công`);
            // console.log(result);
            this.usersv.GetByUserName(data.userName).subscribe(
              (rs: any)=>{
                console.log(rs);
                localStorage.setItem('currentUser', JSON.stringify(rs));
              });
            this.isLoading = false;
            this.BackPages();
          } else {
            this.message.create('error', `Sửa lỗi`);
            // console.log(result);
            this.isLoading = false;
          }
        }
      );
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      this.saveChanges();
    }
  }
  BackPages() {
    this.router.navigate(['m-layout']);
  }
}
