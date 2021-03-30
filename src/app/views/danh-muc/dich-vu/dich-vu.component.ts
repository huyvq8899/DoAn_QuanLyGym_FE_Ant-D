import { Component, HostListener, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { DichVuService } from 'src/app/services/dich-vu.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditDichVuComponent } from './add-edit-dich-vu/add-edit-dich-vu/add-edit-dich-vu.component';

@Component({
  selector: 'app-dich-vu',
  templateUrl: './dich-vu.component.html',
  styleUrls: ['./dich-vu.component.scss']
})
export class DichVuComponent implements OnInit {
  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: "",
    SortKey: "",
    SortValue: "",
    fromDate: "",
    toDate: "",
    KeywordCol: "",
    ColName: "",
  };
  listService: any[] = [];
  listServiceAll: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = "";
  constructor(
    private serviceg: DichVuService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    this.serviceg.getAllService().subscribe((rs: any) => {
      this.loading = false;
      this.listService = rs;
      this.listServiceAll = rs;
    });
  }
  changeSearch(event: any) {
    const arrCondition = ["serviceName", "description","money"];
    this.listService = SearchEngine(this.listServiceAll, arrCondition, event);
  }
  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 73) {
      this.addNewItem();
    }
  }
  addNewItem() {
    const modal = this.modal.create({
      nzTitle: "Thêm loại thẻ",
      nzContent: AddEditDichVuComponent,
      nzClosable: false,
      nzFooter: "null",
      nzWidth: "35%",
      nzStyle: {
        top: "30px",
      },
      nzComponentParams: {
        idNew: this.listService.length + 1,
        isAddNew: true,
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
      nzTitle: "Cập nhật loại thẻ",
      nzContent: AddEditDichVuComponent,
      nzClosable: false,
      nzFooter: "null",
      nzWidth: "35%",
      nzStyle: {
        top: "10px",
      },
      nzComponentParams: {
        ServiceData: data,
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
      nzTitle: "Bạn có chắc chắn muốn xóa không?",
      nzContent:
        '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: "Yes",
      nzOkType: "danger",
      nzOnOk: () => {
        this.serviceg.deleteService(id).subscribe(
          (rs: any) => {
            if (rs === -1) {
              this.message.error("Dữ liệu đang được sử dụng, không thể xóa");
              return;
            }
            if (rs > 0) {
              this.message.success("Xóa thành công");
              this.LoadData();
            } else {
              this.message.error("Lỗi xóa dữ liệu");
            }
          },
          (_) => {
            this.message.error("Error delete");
            console.log("Error delete");
          }
        );
      },
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel"),
    });
  }

  search(colName: any) {
    this.displayData.ColName = colName;
    const arrCondition = [this.displayData.ColName];
    this.listService = SearchEngine(
      this.listServiceAll,
      arrCondition,
      this.displayData.KeywordCol
    );
    this.displayData.KeywordCol = "";
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    // console.log(pageIndex, pageSize, sortField, sortOrder, filter);
    const sortconst: any = {
      key: sortField,
      value: sortOrder,
    };
  }
}
