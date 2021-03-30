import { NhaCungCapService } from './../../../services/nha-cung-cap.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditNhaCungCapModalComponent } from './modals/add-edit-nha-cung-cap-modal/add-edit-nha-cung-cap-modal.component';

@Component({
  selector: 'app-nha-cung-cap',
  templateUrl: './nha-cung-cap.component.html',
  styleUrls: ['./nha-cung-cap.component.scss']
})
export class NhaCungCapComponent implements OnInit {
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
  constructor(
    private modal: NzModalService,
    private NhaCungCapService:NhaCungCapService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.LoadData();
    
  }

  LoadData() {
    this.loading = true;
    this.NhaCungCapService.getAll().subscribe((rs: any) => {
      this.listOfDatatmp = rs;
      this.listOfData = rs;
      console.log(this.listOfData);
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }

  changeSearch(event: any) {
    const arrCondition = ['maNhaCungCap', 'tenNhaCungCap'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  addNewItem() {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditNhaCungCapModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '650px',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listOfData.length + 1,
        listOfData: this.listOfData,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }

  editItem(data, index) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật',
      nzContent: AddEditNhaCungCapModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '650px',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        listOfData: this.listOfData,
        myFormData: data,
      },
    });
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
        this.NhaCungCapService.Delete(id).subscribe((rs: any) => {
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
