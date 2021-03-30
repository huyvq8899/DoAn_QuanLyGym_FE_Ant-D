import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { GetDate } from 'src/app/shared/getDate';
import { NoWhitespaceValidator } from 'src/app/customValidators/no-whitespace-validator';
import { ValidatorsDupcateName } from 'src/app/customValidators/validatorsDupcateName';
import { ValidatorsDupcateUserName } from 'src/app/customValidators/validatorsDupcateName';
import { ValidatorsDupcateMail } from 'src/app/customValidators/validatorsDupcateMail';
import { PhongBanService } from 'src/app/services/phong-ban.service';

@Component({
  selector: 'app-account-add-edit-modal',
  templateUrl: './account-add-edit-modal.component.html',
  styleUrls: ['./account-add-edit-modal.component.css']
})
export class AccountAddEditModalComponent implements OnInit {
  @Input() isAddNew: boolean;
  @Input() data: any;
  spinning = false;
  userForm: FormGroup;
  roles: any = [];
  userListView: any[] = [];
  userAll: any[] = [];
  phongs: any[];
  userName: string;
  constructor(
    private rolesv: RoleService,
    private usersv: UserService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private phong: PhongBanService,
    private modal: NzModalRef) { }
  ngOnInit() {
    this.GetAllUser();
    this.rolesv.GetAll().subscribe(rs => {
      this.roles = rs;
    });
    if (this.isAddNew === true) {
      this.createformInsert();
    } else {
      this.createformUpdate();
      this.userForm.patchValue(this.data);
      this.userForm.get('dateOfBirth').setValue(GetDate(this.data.dateOfBirth));
    }
    this.phong.getAll().subscribe((rs: any) => {
      console.log(rs);
      this.phongs = rs;
    });
  }
  createformInsert() {
    this.userForm = this.fb.group({
      userId: [null],
      userName: [null, [Validators.required], [ValidatorsDupcateUserName(this.usersv,'')]],
      fullName: [null, [Validators.required]],
      email: [null, [ Validators.email], [ValidatorsDupcateMail(this.usersv, '')]],
      phone: [null],
      title: [null],
      roleId: [null, [Validators.required]],
      nguoiQuanLy:[null],
      phongBanPhongId:[null]
    });
  }
  createformUpdate() {
    this.userForm = this.fb.group({
      userId: [null, [Validators.required]],
      userName: [{ value: null, disabled: false }, [Validators.required], [ValidatorsDupcateUserName(this.usersv,this.data.userName)]],
      fullName: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [{ value: null, disabled: false }, [ Validators.email], [ValidatorsDupcateMail(this.usersv, this.data.email)]],
      phone: [null],
      title: [null],
      roleId: [null, [Validators.required]],
      dateOfBirth: [null],
      address: [null],
      nguoiQuanLy:[null],
      phongBanPhongId:[null],
    });
    //this.userForm.get("userName").disable();
  }
  saveChanges(): void {
    this.spinning = true;
    if (this.userForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.userForm.controls) {
        this.userForm.controls[i].markAsDirty();
        this.userForm.controls[i].updateValueAndValidity();
      }
      this.spinning = false;
      return;
    }
    // console.log('submitted');
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.usersv.Insert(this.userForm.value).subscribe((rs: any) => {
        this.spinning = false;
        if (rs === 1) {
          this.message.create('success', `Thêm tài khoản thành công`);

          this.modal.destroy(rs);
        } else {
          this.message.create('error', `Thêm lỗi`);
          // console.log(rs);
          this.modal.destroy(rs);
        }
      });
    } else {
      this.usersv.Update(this.userForm.getRawValue()).subscribe(
        (result: any) => {
          this.spinning = false;
          if (result === 1) {
            this.message.create('success', `Cập nhật tài khoản thành công`);
            // console.log(result);
            this.modal.destroy(result);
          } else {
            this.message.create('error', `Sửa lỗi`);
            // console.log(result);
            this.modal.destroy(result);
          }
        }
      );
    }
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      this.saveChanges();
    }
  }
  closeModal() {
    this.modal.destroy();
  }

  GetAllUser() {
    this.usersv.getAll().subscribe((rs: any) => {
      this.userListView = rs;
      this.userAll = rs;
    });
  }
}
