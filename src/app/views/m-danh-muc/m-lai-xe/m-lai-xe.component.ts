import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MAddEditLaiXeComponent } from './m-modal/m-add-edit-chiet-khau/m-add-edit-lai-xe.component';
import {LaiXeService} from 'src/app/services/lai-xe.service ';
import { SearchEngine } from 'src/app/shared/searchEngine';
import * as moment from 'moment';
import { SharedService } from 'src/app/shared/shared.service';
import { ActionSheetService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-m-lai-xe',
  templateUrl: './m-lai-xe.component.html',
  styleUrls: ['./m-lai-xe.component.scss']
})
export class MLaiXeComponent implements OnInit {
  @ViewChildren("indexScroll") indexScrolls: QueryList<ElementRef>;
   stt = 0; 
  isAddNew:boolean;
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  spinning: boolean;
  valueModel = '';
  dungTich:any;
  dts:any[]=[];
  
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
    private LaiXeService : LaiXeService,
    private _actionSheet: ActionSheetService,
    private message: NzMessageService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Danh sách lái xe'
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
    this.pageLimit += 30;
  }
  addItems(startIndex) {
    for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
      this.listOfData.push(this.listOfData[i]);
    }
  }

  LoadData() {
    this.LaiXeService.getAll().subscribe((rs: any)=>{
      this.listOfData = rs
      this.listOfDatatmp = rs
      this.listOfData.forEach(x=>{
        x.dungtichct=JSON.parse(x.dt);
      });      
    })
    
  }
  addNewItem() {
    this.isAddNew=true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.router.navigate(['m-layout/m-danh-muc/m-lai-xe/m-add-edit-lai-xe']);
  }
  editItem(data,stt) {
    this.isAddNew=false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.sendData(data);
    this.sharedService.changeStt(stt);
    this.router.navigate(['m-layout/m-danh-muc/m-lai-xe/m-add-edit-lai-xe']);
  }
  changeSearch(event: any) {
    const arrCondition = ['tenGoi', 'bienKiemSoat', 'tenLaiXe', 'cMT', 'soDienThoai','tongDungTich'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
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
        console.log(data)
        if (buttonIndex === 0)
          this.editItem(data,i);
        else if (buttonIndex === 1)
          this.removeItem(data.xeId);
      }
    );

  }
}
