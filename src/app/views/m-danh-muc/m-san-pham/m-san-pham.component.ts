import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetService } from "ng-zorro-antd-mobile";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { PagingParams } from "src/app/models/PagingParams";
import { SearchEngine } from "src/app/shared/searchEngine";
import { SharedService } from "src/app/shared/shared.service";
import { ProductService } from "./../../../services/product.service";

@Component({
  selector: 'app-m-san-pham',
  templateUrl: './m-san-pham.component.html',
  styleUrls: ['./m-san-pham.component.scss']
})
export class MSanPhamComponent implements OnInit {
  @ViewChildren("indexScroll") indexScrolls: QueryList<ElementRef>;
  stt = 0; 
  isAddNew:boolean;
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
  pageLimit = 30;
  public directionCount = 0;
  page = 0;
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false
    },
    direction: 'down',
    endReachedRefresh: true,
    height: 750,
    data: [],
    directionName: 'down'
  };
  dtPullToRefreshStyle = { height: this.state.height + 'px' };
  listProduct: any[] = [];
  listProductAll: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = "";
  listOfData: any;
  constructor(
    private _productService: ProductService,
    private modal: NzModalService,
    private _message: NzMessageService,
    private sharedService:SharedService,
    private router: Router,
    private _actionSheet: ActionSheetService,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.addItems(this.listProduct[0]);
    this.LoadData();
    this.sharedService.emitChange({
      title: 'Sản phẩm'
    });
    this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
    console.log(this.stt);
    while(this.stt>this.pageLimit)
    {
      this.pageLimit+=30;
    }
  }
  LoadData() {
    this.loading = true;
    this._productService.getAllProduct().subscribe((rs: any) => {
      this.loading = false;
      this.listProduct = rs;
      this.listProductAll = rs;
    });
  }
  pullToRefresh(event) {
    this.pageLimit+=30;       
}
addItems(startIndex) {
  for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
    this.listProduct.push(this.listProduct[i]);
  }
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
    this.isAddNew=true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.router.navigate(['m-layout/m-danh-muc/m-san-pham/m-add-edit-san-pham']);
  }
  editItem(data,stt) {
    this.isAddNew=false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.sendData(data);
    this.sharedService.changeStt(stt)
    this.router.navigate(['m-layout/m-danh-muc/m-san-pham/m-add-edit-san-pham']);
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
  showActionSheet(data,i) {
    console.log('buttonIndex');
    const BUTTONS = ['Sửa', 'Xóa', 'Hủy'];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex === 0)
          this.editItem(data,i);
        else if (buttonIndex === 1)
          this.removeItem(data.productId);
      }
    );

  }


}