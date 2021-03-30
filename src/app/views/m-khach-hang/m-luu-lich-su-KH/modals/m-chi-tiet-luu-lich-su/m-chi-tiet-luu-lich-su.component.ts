import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-m-chi-tiet-luu-lich-su',
  templateUrl: './m-chi-tiet-luu-lich-su.component.html',
  styleUrls: ['./m-chi-tiet-luu-lich-su.component.scss']
})
export class MChiTietLuuLichSuComponent implements OnInit {
  isAddNew: boolean;
  data: any;
  list: any[] = [];
  roleId: string;
  myFormGroup: FormGroup;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: NzModalService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    this.createForm();
    this.sharedService.currentData.subscribe(data => this.data = data);
      this.myFormGroup.enable();
      this.myFormGroup.patchValue({
        ...this.data
      });
      this.sharedService.emitChange({
        title: 'Lịch sử chỉnh sửa khách hàng: '+ this.data.tenKhachHang
      });
    this.myFormGroup.disable();
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      id: [null],
      createdBy: [null],
      createdDate: [null],
      maKhachHang: [null],
      tenKhachHang: [null],//
      maSoThue: [null],//
      tenTruongThayDoi: [null],//
      dienGiai: [null],//
      duLieuCu: [null],//
      duLieuMoi: [null],//
    });
  }
  BackPage() {
    this.router.navigate(['/m-layout/m-khach-hang/m-luu-lich-su-kh']);
  }
}
