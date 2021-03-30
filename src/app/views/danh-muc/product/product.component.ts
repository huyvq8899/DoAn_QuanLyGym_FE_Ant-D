import { Component, HostListener, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { PagingParams } from "src/app/models/PagingParams";
import { SearchEngine } from "src/app/shared/searchEngine";
import { ProductService } from "./../../../services/product.service";
import { AddEditProductComponent } from "./modals/add-edit-product/add-edit-product.component";


@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
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
  listProduct: any[] = [];
  listProductAll: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = "";
  constructor(
    private _productService: ProductService,
    private modal: NzModalService,
    private _message: NzMessageService
  ) {}

  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.loading = true;
    this._productService.getAllProduct().subscribe((rs: any) => {
      this.loading = false;
      this.listProduct = rs;
      this.listProductAll = rs;
    });
  }
  changeSearch(event: any) {
    const arrCondition = ["productName", "productCode"];
    this.listProduct = SearchEngine(this.listProductAll, arrCondition, event);
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
      nzTitle: "Thêm sản phẩm",
      nzContent: AddEditProductComponent,
      nzClosable: false,
      nzFooter: "null",
      nzWidth: "35%",
      nzStyle: {
        top: "30px",
      },
      nzComponentParams: {
        idNew: this.listProduct.length + 1,
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
      nzTitle: "Cập nhật sản phẩm",
      nzContent: AddEditProductComponent,
      nzClosable: false,
      nzFooter: "null",
      nzWidth: "35%",
      nzStyle: {
        top: "10px",
      },
      nzComponentParams: {
        productData: data,
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
        this._productService.deleteProduct(id).subscribe(
          (rs: any) => {
            if (rs === -1) {
              this._message.error("Dữ liệu đang được sử dụng, không thể xóa");
              return;
            }
            if (rs > 0) {
              this._message.success("Xóa thành công");
              this.LoadData();
            } else {
              this._message.error("Lỗi xóa dữ liệu");
            }
          },
          (_) => {
            this._message.error("Error delete");
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
    this.listProduct = SearchEngine(
      this.listProductAll,
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
