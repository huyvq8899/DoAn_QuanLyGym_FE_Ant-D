import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-add-edit-equipment',
  templateUrl: './add-edit-equipment.component.html',
  styleUrls: ['./add-edit-equipment.component.scss']
})
export class AddEditEquipmentComponent implements OnInit {
  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() EquipmentData: any;
  myFormGroup: FormGroup;
  loading: boolean;
  displayData: any;
  selectedId: string;
  selectedUser: any;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private equipmentService: EquipmentService,
    private router: Router,
    private modal: NzModalRef,
  ) { }

  ngOnInit() {
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`id`).setValue(this.idNew);
    } else {
      
      this.myFormGroup.patchValue({
        ...this.EquipmentData
      });
    }
    this.loading = true;
    this.selectedId = localStorage.getItem('userId');
 
  }
  

  saveChanges() {
    if(this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
    }
    // console.log('submitted');
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.equipmentService.postEquipment(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          console.log(this.myFormGroup.value);
          this.modal.destroy(rs);
          this.message.create('success', `Thêm thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.equipmentService.putEquipment(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin thành công`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modal.destroy(result);
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }


  createForm() {
    this.myFormGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      description: [null],
      amount: [null, [Validators.required]],
      userId: this.selectedId,
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
