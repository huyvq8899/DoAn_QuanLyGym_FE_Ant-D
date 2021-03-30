import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CloneData } from 'src/app/shared/CloneData';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditLaiXeModalComponent } from './modals/add-edit-lai-xe-modal/add-edit-lai-xe-modal.component';
import {LaiXeService} from 'src/app/services/lai-xe.service ';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormArray } from '@angular/forms';
@Component({
  selector: 'app-lai-xe',
  templateUrl: './lai-xe.component.html',
  styleUrls: ['./lai-xe.component.scss']
})
export class LaiXeComponent implements OnInit {
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
  dungTich:any;
  dts:any[]=[];
  constructor(
    private modal: NzModalService,
    private LaiXeService : LaiXeService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.LaiXeService.getAll().subscribe((rs: any)=>{
      this.listOfData = rs
      this.listOfDatatmp = rs
      this.listOfData.forEach(x=>{
        x.dungtichct=JSON.parse(x.dt);
      });
      console.log(this.listOfData);
      
    })
    
  }

  changeSearch(event: any) {
    const arrCondition = ['tenGoi', 'bienKiemSoat', 'tenLaiXe', 'cMT', 'soDienThoai','tongDungTich'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  addNewItem() {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditLaiXeModalComponent,
      nzClosable: false,
      nzWidth: '650px',
      nzFooter: 'null',
      nzComponentParams: {
        idNew: this.listOfData.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        //this.listOfData = this.listOfData.concat(rs);
        //this.listOfDatatmp = this.listOfData;
        this.ngOnInit();
      }
    });
  }

  editItem(data, index) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật dữ liệu',
      nzContent: AddEditLaiXeModalComponent,
      nzWidth: '650px',
      nzClosable: false,
      nzComponentParams: {
        myFormData: data,
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
        //baseData
         this.listOfData[index].xeId = rs.xeId;
         this.listOfData[index].tenGoi = rs.tenGoi;
         this.listOfData[index].bienKiemSoat = rs.bienKiemSoat;
         this.listOfData[index].tenLaiXe = rs.tenLaiXe;
         this.listOfData[index].cmt = rs.cmt;
         this.listOfData[index].soDienThoai = rs.soDienThoai;
         this.listOfData[index].tongDungTich = rs.tongDungTich;
         this.listOfData[index].dt = rs.dt;
         //tmp
         this.listOfDatatmp[index].xeId = rs.xeId;
         this.listOfDatatmp[index].tenGoi = rs.tenGoi;
         this.listOfDatatmp[index].bienKiemSoat = rs.bienKiemSoat;
         this.listOfDatatmp[index].tenLaiXe = rs.tenLaiXe;
         this.listOfDatatmp[index].cmt = rs.cmt;
         this.listOfDatatmp[index].soDienThoai = rs.soDienThoai;
         this.listOfDatatmp[index].tongDungTich = rs.tongDungTich;
         this.listOfDatatmp[index].dt = rs.dt;
      }
    });
  }

  removeItem(id) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.LaiXeService.Delete(id).subscribe((rs: any) => {
          if (rs === -1) {
            this.message.error('Dữ liệu đang được sử dụng, không thể xóa');
            return;
          }
          if (rs > 0) {
            this.message.success('Xóa thành công');
            this.LoadData();
          } else {
            this.message.error('Lỗi xóa dữ liệu');
          }
        }, _ => {
          this.message.error('Error delete');
          console.log('Error delete');
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
