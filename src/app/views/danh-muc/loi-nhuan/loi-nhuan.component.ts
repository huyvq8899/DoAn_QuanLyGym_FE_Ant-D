import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoiNhuanService } from 'src/app/services/loi-nhuan.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditLoiNhuanModalComponent } from './modals/add-edit-loi-nhuan-modal.component'

@Component({
  selector: 'app-loi-nhuan',
  templateUrl: './loi-nhuan.component.html',
  styleUrls: ['./loi-nhuan.component.scss']
})
export class LoiNhuanComponent implements OnInit {
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
  
  constructor(
    private modal: NzModalService,
    private loinhuansv:LoiNhuanService,
    private message: NzMessageService,
    
    
  ) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.loading = true;
    this.loinhuansv.getAll().subscribe((rs: any) => {
      console.log(rs);
      this.listOfDatatmp = rs;
      this.listOfData = rs;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }
  addNewItem() {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditLoiNhuanModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '25%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listOfData.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }
  changeSearch(event: any) {
    const arrCondition = ['tenLoiNhuan','mucLoiNhuan'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  editItem(data, index) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật',
      nzContent:  AddEditLoiNhuanModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '25%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        loiNhuanData: data,
      },
    })
    ;
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
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
        this.loinhuansv.Delete(id).subscribe((rs: any) => {
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
