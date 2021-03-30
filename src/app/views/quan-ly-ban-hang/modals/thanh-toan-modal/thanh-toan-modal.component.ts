import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-thanh-toan-modal',
  templateUrl: './thanh-toan-modal.component.html',
  styleUrls: ['./thanh-toan-modal.component.scss']
})
export class ThanhToanModalComponent implements OnInit {
  @Input() data: any;
  SoTienList: FormGroup;
  listData:any[]=[];
  soTien: any;
  chiTiet: any [];

  

  constructor(
    private message: NzMessageService,
    private modal: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createform();
    console.log(this.data)
    this.soTien=this.data;
    this.chiTiet = JSON.parse(this.soTien) ;
    const chiTietST=this.SoTienList.get('chiTietST') as FormArray;
      this.chiTiet.forEach(element => {
        const formGourp = this.createItem();
        formGourp.patchValue({
          ...element
        });
        chiTietST.push(formGourp);
      });
    }

    createform() {
      this.SoTienList= this.fb.group({
        chiTietST:this.fb.array([])
     });
   }
  createItem() {
   return this.fb.group({
      ngayThanhToan: [moment().format('YYYY-MM-DD'), [Validators.required]],
      soTienThanhToan: [0, [Validators.required]]
   });
 }

  submitForm() {
    if (this.SoTienList.invalid) {
      for (const i in this.SoTienList.controls) {
        this.SoTienList.controls[i].markAsDirty();
        this.SoTienList.controls[i].updateValueAndValidity();
      }
      return;
    }
    var str = "[" ;
    for (const i in this.SoTienList.get('chiTietST').value) {
      //dungTich += this.myFormGroup.get(`chiTietKhoangHam.${i}.dungTich`).value + ";"
      str +='{"ngayThanhToan":'+'"'+ this.SoTienList.get(`chiTietST.${i}.ngayThanhToan`).value+'"'+',"soTienThanhToan":'+ this.SoTienList.get(`chiTietST.${i}.soTienThanhToan`).value+'}'+",";
    }
    str=str.substring(0, str.length - 1);
    str+="]";
    this.modal.destroy(str);
    // const data = this.form.getRawValue();
    // this.modal.destroy(data.lyDo);
  }
  addItemChiTietSTs() {
    const chiTietST = this.SoTienList.get(`chiTietST`) as FormArray;
    chiTietST.push(this.createItem());
  }
  removeItemChiTietSTs(index) {
    const chiTietST = this.SoTienList.get(`chiTietST`) as FormArray;
    chiTietST.removeAt(index);
  }
  inputthanhtoan() {
    
  }
  closeModal() {
    this.modal.destroy();
  }
}
