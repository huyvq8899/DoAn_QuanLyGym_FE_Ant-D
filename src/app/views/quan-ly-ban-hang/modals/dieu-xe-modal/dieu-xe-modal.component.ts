import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CloneData } from 'src/app/shared/CloneData';

@Component({
  selector: 'app-dieu-xe-modal',
  templateUrl: './dieu-xe-modal.component.html',
  styleUrls: ['./dieu-xe-modal.component.scss']
})
export class DieuXeModalComponent implements OnInit {
  @Input() isView: boolean;
  @Input() data: any;
  listLaiXe: any[] = [];
  selectedData: any;
  dieuXeForm: FormGroup;
  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.listLaiXe = CloneData.listLaiXe;

    this.createForm();

    if (this.isView) {
      this.dieuXeForm.patchValue({
        ...this.data
      });
      this.dieuXeForm.disable();
    }
  }

  saveChanges() {
    if (this.dieuXeForm.invalid) {
      for (const i in this.dieuXeForm.controls) {
        this.dieuXeForm.controls[i].markAsDirty();
        this.dieuXeForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    
    this.modelRef.destroy(this.selectedData);
  }

  changeLaiXe(event: any) {
    const data = this.listLaiXe.find(x => x.id === event);
    this.selectedData = data;
    this.dieuXeForm.patchValue({
      tenGoi: data.data,
      bienKiemSoat: data.bienKiemSoat,
      tenLaiXe: data.tenLaiXe,
      cmt: data.cmt,
      soDienThoai: data.soDienThoai,
      tongDungTich: data.tongDungTich,
    });
  }

  createForm() {
    this.dieuXeForm = this.fb.group({
      id: [null, [Validators.required]],
      tenGoi: [null],
      bienKiemSoat: [{ value: null, disabled: true }],
      tenLaiXe: [{ value: null, disabled: true }],
      cmt: [{ value: null, disabled: true }],
      soDienThoai: [{ value: null, disabled: true }],
      tongDungTich: [{ value: null, disabled: true }],
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
