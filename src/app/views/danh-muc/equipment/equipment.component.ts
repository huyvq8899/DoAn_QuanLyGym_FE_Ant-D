import { Component, HostListener, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/app/models/PagingParams';
import { EquipmentService } from 'src/app/services/equipment.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { AddEditEquipmentComponent } from './add-edit-equipment/add-edit-equipment/add-edit-equipment/add-edit-equipment.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
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
  listEquipment: any[] = [];
  listEquipmentAll: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = "";
  constructor(
    private equipmentService: EquipmentService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}
  
  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    this.equipmentService.getAllEquipment().subscribe((rs: any) => {
      this.loading = false;
      this.listEquipment = rs;
      this.listEquipmentAll = rs;
    });
  }
  changeSearch(event: any) {
    const arrCondition = ["name", "amount","userId","description","createdDate"];
    this.listEquipment = SearchEngine(this.listEquipmentAll, arrCondition, event);
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
      nzTitle: "Thêm trang thiết bị",
      nzContent: AddEditEquipmentComponent,
      nzClosable: false,
      nzFooter: "null",
      nzWidth: "35%",
      nzStyle: {
        top: "30px",
      },
      nzComponentParams: {
        idNew: this.listEquipment.length + 1,
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
      nzTitle: "Cập nhật thông thin trang thiết bị",
      nzContent: AddEditEquipmentComponent,
      nzClosable: false,
      nzFooter: "null",
      nzWidth: "35%",
      nzStyle: {
        top: "10px",
      },
      nzComponentParams: {
        EquipmentData: data,
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
        this.equipmentService.deleteEquipment(id).subscribe(
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
    this.listEquipment = SearchEngine(
      this.listEquipmentAll,
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
