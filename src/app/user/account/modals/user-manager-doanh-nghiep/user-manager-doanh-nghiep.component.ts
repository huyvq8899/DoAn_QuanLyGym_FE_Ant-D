import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchEngine } from 'src/app/shared/searchEngine';
import { PagingParams } from 'src/app/models/PagingParams';

@Component({
  selector: 'app-user-manager-doanh-nghiep',
  templateUrl: './user-manager-doanh-nghiep.component.html',
  styleUrls: ['./user-manager-doanh-nghiep.component.css']
})
export class UserManagerDoanhNghiepComponent implements OnInit {
  @Input() userData: any;
  selectedIndex = 0;
  userForm: FormGroup;
  doanhNghieps: any = [];
  doanhNghiepAlls: any = [];
  spinning = false;
  loading = false;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<any>();
  listUserCompany: any;
  //checkbox
  checkListForm: FormGroup;
  followForm: FormGroup;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  mapOfCheckedId: any = {};

  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: '',
    SortKey: '',
    SortValue: '',
    fromDate: '',
    toDate: '',
    KeywordCol: '',
    ColName: '',
    userId: '',
    type: 'ALL',
  };
  listData: any[] = [];
  total = 0;
  pageSizeOptions = [];

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    // private doanhNghiepService: DoanhNghiepService,
    // private hoaDonUserService: HoaDonUserService,
    private fb: FormBuilder,
  ) { }
  ngOnInit() {
    //console.log(this.userData);
    const model = JSON.parse(localStorage.getItem(this.userData.userName));
    this.createcheckListForm();
    this.checkListForm.patchValue({
      userId: this.userData.userId
    });
  }

  selectTab(event: NzTabChangeEvent) {
    if (event.index == 1 && event.tab.isActive) {
      this.displayData = {
        PageNumber: 1,
        PageSize: 10,
        Keyword: '',
        SortKey: '',
        SortValue: '',
        fromDate: '',
        toDate: '',
        KeywordCol: '',
        ColName: '',
        userId: this.userData.userId,
        type: 'PHANQUEN',
      };

      this.LoadData();
    } else if (event.index == 0 && event.tab.isActive) {
      this.displayData = {
        PageNumber: 1,
        PageSize: 10,
        Keyword: '',
        SortKey: '',
        SortValue: '',
        fromDate: '',
        toDate: '',
        KeywordCol: '',
        ColName: '',
        userId: this.userData.userId,
        type: 'ALL',
      };
      this.LoadData();
    }
    this.selectedIndex = event.index;
  }
  closeModal() {
    this.modal.destroy();
  }
  saveChanges() {
    this.spinning = true;
    let arrId = [];
    let entries = Object.entries(this.mapOfCheckedId);
    for (const [prop, val] of entries) {
      if (val) {
        arrId.push(prop);
      }
    }
    this.checkListForm.get(`listMaSoThues`).setValue([]);
    this.checkListForm.get(`listMaSoThues`).setValue(arrId);
    const data = this.checkListForm.getRawValue();
    if (data.listMaSoThues.length > 0) {
      // this.hoaDonUserService.CreateMutiple(data).subscribe(
      //   (res) => {
      //     if (res) {
      //       this.message.success("Theo dõi thành công");
      //       this.checkAll(false);
      //       this.isAllDisplayDataChecked = false;
      //       this.mapOfCheckedId = {};
      //       this.spinning = false;
      //       this.LoadData();
      //     }
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    } else {
      this.message.warning("Chưa chọn chứng từ!")
      this.spinning = false;
    }
  }

  deleteFollow(data) {
    this.followForm = this.fb.group({
      userId: [this.userData.userId],
      maSoThue: [data.maSoThue],
    });
    const dataForm = this.followForm.getRawValue();
    // this.hoaDonUserService.DeleteFollow(dataForm).subscribe(
    //   (res) => {
    //     if (res) {
    //       this.message.success("Hủy theo dõi thành công!");
    //       this.LoadData();
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  createcheckListForm() {
    this.checkListForm = this.fb.group({
      userId: [null],
      listMaSoThues: [],
    });
  }

  LoadData() {
    this.loading = true;
    this.displayData.userId = this.userData.userId;
    // this.doanhNghiepService.GetAllPaging(this.displayData).subscribe((data: any) => {
    //   this.listData = data.items;
    //   this.listOfAllData = data.items;
    //   this.listOfDisplayData = data.items;
    //   this.total = data.totalCount;
    //   this.displayData.PageNumber = data.currentPage;
    //   this.pageSizeOptions = [5, 10, 20, 50];
    //   this.getPageSizeOption();
    //   this.loading = false;
    //   // delete all
    //   if (this.listData.length === 0 && this.displayData.PageNumber > 1) {
    //     this.displayData.PageNumber -= 1;
    //     this.LoadData();
    //   }
    // });
  }

  getPageSizeOption() {
    const pageSizeOptions1 = [];
    if (this.total > 10) {
      for (let index = 10; index < this.total; index = (index * 2)) {
        pageSizeOptions1.push(index);
        // console.log(pageSizeOptions1);
      }
    } else {
      this.displayData.PageSize = 10;
    }
    pageSizeOptions1.push(this.total);
    this.pageSizeOptions = pageSizeOptions1;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    // console.log(pageIndex, pageSize, sortField, sortOrder, filter);
    // this.displayData.PageSize = pageSize;
    // this.displayData.PageNumber = pageIndex;
    const sortconst: any = {
      key: sortField,
      value: sortOrder
    }
    //his.sort(sortconst);
    if (sortField != null && sortOrder != null) {
      this.sort(sortconst);
    }
    if (filter.length > 0) {
      this.displayData.ColName = filter[0].key;
      this.displayData.KeywordCol = filter[0].value;
      if (this.displayData.KeywordCol == null) {
        this.displayData.KeywordCol = '';
      }
    }
    this.LoadData();
  }

  changeSearch(event: any) {
    this.displayData.Keyword = event.target.value ? event.target.value : '';
    //this.LoadData();
  }
  search(colName: any) {
    this.displayData.ColName = colName;
    this.LoadData();
    this.displayData.KeywordCol = '';
  }
  sort(sort: { key: string; value: string }): void {
    this.displayData.SortKey = sort.key;
    this.displayData.SortValue = sort.value;
    this.LoadData();
  }

  //Checkbox
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.maSoThue]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.maSoThue]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.maSoThue] = value));
    this.refreshStatus();
  }
}
