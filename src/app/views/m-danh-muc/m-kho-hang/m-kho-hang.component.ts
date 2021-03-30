import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetService } from 'ng-zorro-antd-mobile';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { KhoHangService } from 'src/app/services/kho-hang.service';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-m-kho-hang',
  templateUrl: './m-kho-hang.component.html',
  styleUrls: ['./m-kho-hang.component.scss']
})
export class MKhoHangComponent implements OnInit {
  @ViewChildren("indexScroll") indexScrolls: QueryList<ElementRef>;
  stt = 0; 
  isAddNew:boolean;
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
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
  constructor(
    private modal: NzModalService,
    private khohangsv:KhoHangService,
    private message: NzMessageService,
    private sharedService:SharedService,
    private router: Router,
    private _actionSheet: ActionSheetService
  ) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Kho hàng'
    });
    this.sharedService.currentStt.subscribe(stt=>this.stt=stt);
    while(this.stt>this.pageLimit)
    {
      this.pageLimit+=30;
    }
    this.LoadData();
    this.addItems(this.listOfData[0]);
  }

  ngAfterViewInit(){
    this.scroll(this.stt)
  }

  scroll(stt){
    this.indexScrolls.changes.subscribe(() => {
      this.indexScrolls.toArray()[stt].nativeElement.focus();
    })
  }

  pullToRefresh(event) {
    this.pageLimit+=30;       
}
addItems(startIndex) {
  for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
    this.listOfData.push(this.listOfData[i]);
  }
}
  LoadData() {
    this.loading = true;
    this.khohangsv.getAll().subscribe((rs: any) => {
      this.listOfDatatmp = rs;
      this.listOfData = rs;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }

  changeSearch(event: any) {
    const arrCondition = ['maKho', 'tenKho'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  addNewItem() {
    this.isAddNew=true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.router.navigate(['m-layout/m-danh-muc/m-kho-hang/m-add-edit-kho-hang']);
    this.khohangsv.sendData(this.listOfData);
  }

  editItem(data, stt) {
    this.isAddNew=false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.sendData(data);
    this.sharedService.changeStt(stt)
    this.khohangsv.sendData(this.listOfData);
    this.router.navigate(['m-layout/m-danh-muc/m-kho-hang/m-add-edit-kho-hang']);
  }
  showActionSheet(data, stt) {
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
          this.editItem(data, stt);
        else if (buttonIndex === 1)
          this.removeItem(data.khoHangId);
      }
    );

  }
  removeItem(id) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.khohangsv.Delete(id).subscribe((rs: any) => {
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
