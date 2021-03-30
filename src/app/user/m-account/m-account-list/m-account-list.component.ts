import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SearchEngine } from 'src/app/shared/searchEngine';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActionSheetService } from 'ng-zorro-antd-mobile';
// import { MAccountAddEditModalComponent } from '../m-modals/m-account-add-edit-modal/m-account-add-edit-modal.component';

@Component({
  selector: 'app-m-account-list',
  templateUrl: './m-account-list.component.html',
  styleUrls: ['./m-account-list.component.scss']
})
export class MAccountListComponent implements OnInit {

  isAddNew:boolean;
  fullScreen = false;
  userListView: any[] = [];
  userAll: any[] = [];
  loadingTable = false;
  currentUser: any;
  
  constructor(
    private usersv: UserService,
    private router: Router,
    private modalService: NzModalService,
    private sharedService: SharedService,
    private _actionSheet: ActionSheetService
    
    //private message: NzMessageService,
  ) { }
  ngOnInit() {
    this.sharedService.emitChange({
      title: 'Danh sách tài khoản'
    });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as any);
    this.load();
  }
  load() {
    this.loadingTable = true;
    this.usersv.GetAllActiveByUser(localStorage.getItem('userId')as any).subscribe((rs: any) => {
      console.log(rs);
      this.userListView = rs;
      this.userAll = rs;
      this.loadingTable = false;
    }, _ => {
      this.loadingTable = false;
    });
  }
  changeStatus(userId: string) {
    this.usersv.changeStatus(userId).subscribe(rs => {
      if (rs) {
       // this.message.success('Cập nhật thành công');
      } else {
        //this.message.error('Lỗi cập nhật trạng thái');
      }
    }, _ => {
      //this.message.error('Có lỗi xảy ra');
    });
  }
  changePass(id: string) {
    console.log(id);
    this.router.navigateByUrl('/m-layout/m-account/m-account-changepass/'+ id);
  }
  addnew() {
    this.isAddNew=true;
    this.sharedService.changeAddNew(this.isAddNew);
    this.router.navigateByUrl('/m-layout/m-account/m-add-account');
  }

  editItem(data) {
    this.isAddNew=false;
    this.sharedService.changeAddNew(this.isAddNew);
    this.sharedService.sendData(data);
    this.router.navigateByUrl('/m-layout/m-account/m-add-account');
  }
  setRole(userId: string, roleName: string) {
    
  }
  changeSearch(event: any) {
    const arrCondition = ['userName', 'fullName', 'title', 'createdDate', 'email', 'phone', 'address','phong'];
    this.userListView = SearchEngine(this.userAll, arrCondition, event);
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 45) {
      this.addnew();
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 122) {
      this.toggleFullScreen();
    }
  }
  toggleFullScreen() {

  }
  setRolePer() {

  }
  setPerOnCompany(data: any) {
  
  }
  showActionSheet(data) {
    console.log('buttonIndex');
    const BUTTONS = ['Cập nhật thông tin', 'Hủy'];
    this._actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        //destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true
      },
      buttonIndex => {
        if (buttonIndex === 0)
          this.editItem(data);
      }
    );

  }
}
