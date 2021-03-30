import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../models/PagingParams';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // public apiURL = environment.apiurl;
  public apiURL = this.env.apiUrl + '/api/';
  constructor(private http: HttpClient,
    private env: EnvService) { }

    public getHeader() {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('tokenKey')}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
        })
      };
    }
  getAll() {
    return this.http.get(`${this.apiURL}User/GetAll`, this.getHeader());
  }
  
  GetAllActive() {
    return this.http.get(`${this.apiURL}User/GetAllActive`, this.getHeader());
  }
  GetListManagersById(id: string) {
    return this.http.get(`${this.apiURL}User/GetListManagersById/` + id, this.getHeader());
  }
  GetById(id: string) {
    return this.http.get(`${this.apiURL}User/GetById/` + id, this.getHeader());
  }
  GetByRoleId(id: string) {
    return this.http.get(`${this.apiURL}User/GetByRoleId/` + id, this.getHeader());
  }
  GetByUserName(userName: string) {
    return this.http.get(`${this.apiURL}User/GetByUserName/` + userName, this.getHeader());
  }
  GetDataLogin(userName: string) {
    return this.http.get(`${this.apiURL}User/GetDataLogin/` + userName, this.getHeader());
  }
  // GetRoleByUserId(data: PagingParams, userId: string) {
  //   // return this.http.get(`${this.apiURL}Role/GetRoleByUserId/` + userId, this.getHeader());
  //   const str = `${this.apiURL}Role/GetAllPagingByUserId?SortValue=` + data.SortValue
  //     + `&SortKey=` + data.SortKey
  //     + `&PageSize=` + data.PageSize
  //     + `&PageNumber=` + data.PageNumber
  //     + `&Keyword=` + data.Keyword
  //     + `&fromDate=` + data.fromDate
  //     + `&toDate=` + data.toDate
  //     + `&userId=` + userId;
  //   // console.log(str);
  //   // tslint:disable-next-line: align
  //   return this.http.get(str, this.getHeader());
  // }
  checkUserName(userName: string) {
    return this.http.get(`${this.apiURL}User/CheckUserName/` + userName, this.getHeader());
  }
  checkMail(mail: string) {
    return this.http.get(`${this.apiURL}User/CheckEmail?Email=` + mail, this.getHeader());
  }
  checkPhone(phone: string) {
    return this.http.get(`${this.apiURL}User/CheckPhone/` + phone, this.getHeader());
  }
  Delete(id: string) {
    return this.http.delete(`${this.apiURL}User?Id=` + id, this.getHeader());
  }
  Insert(data: any) {
    return this.http.post(`${this.apiURL}User`, data, this.getHeader());
  }
  Update(data: any) {
    // console.log(data);
    return this.http.put(`${this.apiURL}User`, data, this.getHeader());
  }
  UpdateAvatar(data: any) {
    return this.http.post(`${this.apiURL}User/UpdateAvatar`, data, this.getHeader());
  }
  UpdatePassWord(data: any) {
    // console.log(data);
    return this.http.put(`${this.apiURL}User/UpdatePassWord`, data, this.getHeader());
  }
  changeStatus(userId: string) {
    // console.log(userId);
    return this.http.get(`${this.apiURL}User/ChangeStatus/` + userId, this.getHeader());
  }
  SetOnline(userId: string, isOnline: boolean) {
    // console.log(userId);
    return this.http.get(`${this.apiURL}User/SetOnline/` + userId + '/' + isOnline, this.getHeader());
  }
  SetManager(data: any) {
    return this.http.post(`${this.apiURL}User/SetManager`, data, this.getHeader());
  }
  SetRole(data: any) {
    return this.http.post(`${this.apiURL}User/SetRole`, data, this.getHeader());
  }
  delteAll(userIds: any) {
    return this.http.post(`${this.apiURL}User/DeleteAll`, userIds, this.getHeader());
  }
  search(data: PagingParams) {
    // console.log(localStorage.getItem('tokenKey'));
    const str = `${this.apiURL}User/GetAllPaging?SortValue=` + data.SortValue
      + `&SortKey=` + data.SortKey
      + `&PageSize=` + data.PageSize
      + `&PageNumber=` + data.PageNumber
      + `&Keyword=` + data.Keyword
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate;
    // console.log(str);
    return this.http.get(str, this.getHeader());
  }
  GetAllActiveByUser(id: string) {
    return this.http.get(`${this.apiURL}User/GetAllActiveByUser?Id=`+id, this.getHeader());
  }
  GetBySoLuong(data: PagingParams) {
    const str = `${this.apiURL}User/GetBySoLuong?&userId=` + data.userId
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate
    // console.log(str);
    return this.http.get(str, this.getHeader());
  }
  ExportExcelBaoCao(data: PagingParams) {
    // return this.http.get(`${this.apiURL}Role/GetRoleByUserId/` + userId, this.getHeader());
  //console.log(data);
    const str = `${this.apiURL}User/ExportExcelBaoCao?&userId=` + data.userId
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate
    // console.log(str);
    return this.http.get(str, this.getHeader());
  }
  GetYears() {
    return this.http.get(`${this.apiURL}User/GetYears`, this.getHeader());
  }
  GetYearsXinNghi() {
    return this.http.get(`${this.apiURL}User/GetYearsXinNghi`, this.getHeader());
  }
  GetAddKHMonths() {
    return this.http.get(`${this.apiURL}User/GetAddKHMonths`, this.getHeader());
  }
  GetAddKHByYear(data: any,id:string) {
    return this.http.post(
      `${this.apiURL}User/GetAddKHByYear?Id=`+id,
      data,
      this.getHeader()
    );
  }
  GetAllXinNghi(data: any,id:string) {
    return this.http.post(
      `${this.apiURL}User/GetAllXinNghi?Id=`+id,
      data,
      this.getHeader()
    );
  }
  GetAddKHByNhanVienByMonth(data: any,id:string,selectedId: string) {
    return this.http.post(
      `${this.apiURL}User/GetAddKhachHangByNhanVien?Id=`+id,
      data,
      this.getHeader()
    );
  }
  GetAddKHByNhanVienKDByMonth(data: any) {
    return this.http.post(
      `${this.apiURL}User/GetAddKhachHangByNhanVienKD`,
      data,
      this.getHeader()
    );
  }
  GetAllUserById(id: string) {
    return this.http.get(`${this.apiURL}User/GetAllUserById?Id=`+id, this.getHeader());
  }
  GetAllUserByRole(id: string) {
    return this.http.get(`${this.apiURL}User/GetAllUserByRole?Id=`+id, this.getHeader());
  }
  checkQuyen(userId: string) {
    return this.http.get(`${this.apiURL}User/CheckQuyen/` + userId, this.getHeader());
  }
  getAllLaiXe() {
    return this.http.get(`${this.apiURL}User/GetAllLaiXe`, this.getHeader());
  }

}
