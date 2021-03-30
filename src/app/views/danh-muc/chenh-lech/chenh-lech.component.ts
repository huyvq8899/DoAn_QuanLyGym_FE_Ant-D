import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChenhLechService } from 'src/app/services/chenh-lech.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditChenhLechModalComponent } from './modals/add-edit-chenh-lech-modal.component'

@Component({
  selector: 'app-chenh-lech',
  templateUrl: './chenh-lech.component.html',
  styleUrls: ['./chenh-lech.component.scss']
})
export class ChenhLechComponent implements OnInit {
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
  
  constructor(
    private modal: NzModalService,
    private chenhlechsv:ChenhLechService,
    private message: NzMessageService,
    
    
  ) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.loading = true;
    this.chenhlechsv.getAll().subscribe((rs: any) => {
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
      nzContent: AddEditChenhLechModalComponent,
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
    const arrCondition = ['tenChenhLech','soChenhLech'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  editItem(data, index) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật',
      nzContent:  AddEditChenhLechModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '25%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        chenhLechData: data,
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
        this.chenhlechsv.Delete(id).subscribe((rs: any) => {
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
