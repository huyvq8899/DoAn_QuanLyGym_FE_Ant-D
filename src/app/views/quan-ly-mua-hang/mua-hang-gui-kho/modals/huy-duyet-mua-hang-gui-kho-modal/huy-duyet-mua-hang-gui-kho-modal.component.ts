import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-huy-duyet-mua-hang-gui-kho-modal',
  templateUrl: './huy-duyet-mua-hang-gui-kho-modal.component.html',
  styleUrls: ['./huy-duyet-mua-hang-gui-kho-modal.component.scss']
})
export class HuyDuyetMuaHangGuiKhoModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private message: NzMessageService,
    private modal: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      lyDo: [null, [Validators.required]]
    });
  }

  submitForm() {
    if (this.form.invalid) {
      for (const i in this.form.controls) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
      return;
    }

    const data = this.form.getRawValue();
    this.modal.destroy(data.lyDo);
  }

  closeModal() {
    this.modal.destroy();
  }

}
