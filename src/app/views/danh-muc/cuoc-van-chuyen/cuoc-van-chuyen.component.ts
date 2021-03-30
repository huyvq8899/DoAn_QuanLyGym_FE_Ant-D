import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CuocVanChuyenService } from 'src/app/services/cuoc-van-chuyen.service';
import { CloneData } from 'src/app/shared/CloneData';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditCuocVanChuyenModalComponent } from './modals/add-edit-cuoc-van-chuyen-modal/add-edit-cuoc-van-chuyen-modal.component';

@Component({
  selector: 'app-cuoc-van-chuyen',
  templateUrl: './cuoc-van-chuyen.component.html',
  styleUrls: ['./cuoc-van-chuyen.component.scss']
})
export class CuocVanChuyenComponent implements OnInit {
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
  constructor(
    private modal: NzModalService,
    private cuocvanchuyensv:CuocVanChuyenService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.loading = true;
    this.cuocvanchuyensv.getAll().subscribe((rs: any) => {
      this.listOfDatatmp = rs;
      this.listOfData = rs;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }

  changeSearch(event: any) {
    const arrCondition = ['tinhThanhPho', 'quanHuyen', 'maVanChuyen', 'cuocVanChuyen'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  addNewItem() {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới',
      nzContent: AddEditCuocVanChuyenModalComponent,
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
      nzContent: AddEditCuocVanChuyenModalComponent,
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
        this.cuocvanchuyensv.Delete(id).subscribe((rs: any) => {
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
