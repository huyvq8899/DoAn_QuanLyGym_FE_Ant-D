import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ValidatorsDupcateRoleName } from 'src/app/customValidators/validatorsDupcateName';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.css']
})
export class AddEditRoleComponent implements OnInit {
  @Input() isAddNew: boolean;
  @Input() data: any;
  roles: any = [];
  roleForm: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private rolesv: RoleService,
    private message: NzMessageService,
    private modal: NzModalRef
    ) { }

  ngOnInit() {
    this.createForm();
    this.rolesv.GetAll().subscribe(rs => {
      this.roles = rs;
    });
  }
  createForm() {
    if (this.isAddNew) {
      this.roleForm = this.fb.group({
        roleId: [null],
        parentRoleId: [null],
        roleName: [null, [Validators.required], [ValidatorsDupcateRoleName(this.rolesv,'')]],
      });
    } else {
      this.roleForm = this.fb.group({
        roleId: [null],
        parentRoleId: [null],
        roleName: [null, [Validators.required], [ValidatorsDupcateRoleName(this.rolesv, this.data.roleName)]],
      });
      this.roleForm.patchValue(this.data);
    }
  }
  saveChanges() {
    if (this.roleForm.invalid) {
      for (const key in this.roleForm.controls) {
        this.roleForm.controls[key].markAsDirty();
        this.roleForm.controls[key].updateValueAndValidity();
      }
      return;
    }
    const model = this.roleForm.getRawValue();
    if(this.isAddNew) {
      this.isLoading = true;
      this.rolesv.Insert(model).subscribe((res: any) => {
        if (res) {
          this.message.success('Thêm mới thành công');
          this.isLoading = false;
          this.modal.destroy(true);
        } else {
          this.isLoading = false;
          this.modal.destroy(false);
        }
      }, _ => {
        console.log('error insert');
        this.message.error('Có lỗi xảy ra');
        this.isLoading = false;
        this.modal.destroy(false);
      });
    } else {
      this.isLoading = true;
      this.rolesv.Update(model).subscribe((res: any) => {
        if (res === 1) {
          this.message.success('Cập nhật thành công');
          this.isLoading = false;
          this.modal.destroy(true);
        } else {
          this.isLoading = false;
          this.modal.destroy(false);
        }
      }, _ => {
        console.log('error update');
        this.message.error('Có lỗi xảy ra');
        this.isLoading = false;
        this.modal.destroy(false);
      });
    }
  }
  closeModal() {
    this.modal.destroy(false);
  }
}
