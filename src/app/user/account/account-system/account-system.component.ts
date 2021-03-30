import { Component, HostListener, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-system',
  templateUrl: './account-system.component.html',
  styleUrls: ['./account-system.component.scss']
})
export class AccountSystemComponent implements OnInit {
  setReverse = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  _validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png'];
  constructor(
    private usersv: UserService,
    private message: NzMessageService
  ) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.setResize();
  }
  setResize() {
    if (window.innerWidth < 992) {
      this.setReverse = true;
    } else {
      this.setReverse = false;
    }
  }
  ngOnInit() {
    this.setResize();
  }
  importFile(event: any) {
    const files = event.target.files;
    if (files && files[0]) {
      if (!this.hasExtension(event.target.files[0].name, this._validFileExtensions)) {
        console.log('File không hợp lệ.');
        this.message.error('File không hợp lệ.');
        return;
      }
      if (!this.hasFileSize(event.target.files[0].size)) {
        console.log('Dung lượng file vượt quá 2MB.');
        this.message.error('Dung lượng file vượt quá 2MB.');
        return;
      }
      let fileData: any = null;
      // this.fileName = event.target.files[0].name;
      fileData = new FormData();
      fileData.append('fileName', event.target.files[0].name);
      fileData.append('fileSize', event.target.files[0].size); // tính theo byte
      fileData.append('userId', this.currentUser.userId);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < files.length; i++) {
        fileData.append('files', files[i]);
      }
      // gọi api update avatar
      //
      this.usersv.UpdateAvatar(fileData).subscribe((rs: any) => {
        if (rs.result === true) {
          // console.log(rs);
          this.currentUser.avatar = rs.user.avatar;
          this.currentUser.avatar = rs.user.avatar;
          localStorage.setItem('currentUser',  JSON.stringify(this.currentUser));
        } else {
          console.log('Lỗi update avatar');

        }
      }, _ => {
        console.log('Error update avatar');
      });
    }
  }
  hasExtension(fileName, exts) {
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
  }
  hasFileSize(fileSize) {
    if ((fileSize / 1024 / 1024) < 2048) { return true; }
    return false;
  }
}
