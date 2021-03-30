import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../models/PagingParams';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService {

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
  getAllKH() {
    return this.http.get(`${this.apiURL}Customer/GetAllKH`, this.getHeader());
  }
  getAllLichSuKH() {
    return this.http.get(`${this.apiURL}Customer/GetAllLichSuKH`, this.getHeader());
  }
  GetAllPaging(data: PagingParams, id: string, selectedId: string) {
    const str = `${this.apiURL}Customer/GetAllPaging?SortValue=` + data.SortValue
      + `&SortKey=` + data.SortKey
      + `&PageSize=` + data.PageSize
      + `&PageNumber=` + data.PageNumber
      + `&Keyword=` + data.Keyword
      + `&Id=` + id
      + `&selectedId=` + selectedId
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate
      + `&keywordCol=` + data.KeywordCol
      + `&colName=` + data.ColName;
    return this.http.get(str, this.getHeader());
  }
  GetAllMobile(id: string, data: PagingParams) {
    const str = `${this.apiURL}Customer/GetAllMobile?Id=` + id
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate;
    return this.http.get(str, this.getHeader());
  }
  GetKHByUser(id: string) {
    return this.http.get(`${this.apiURL}Customer/GetKHByUser?Id=` + id, this.getHeader());
  }
  Insert(tn: number, data: any) {

    return this.http.post(`${this.apiURL}Customer?TN=` + tn, data, this.getHeader());
  }
  Delete(id: string) {
    return this.http.delete(`${this.apiURL}Customer?Id=` + id, this.getHeader());
  }
  Update(tn: number, data: any) {
    console.log(data);
    return this.http.put(`${this.apiURL}Customer?TN=` + tn, data, this.getHeader());
  }
  Find(id: string) {
    return this.http.get(`${this.apiURL}Customer/GetById?Id=` + id, this.getHeader());
  }
  CheckTrungMa(maKH: string) {
    return this.http.get(`${this.apiURL}Customer/CheckTrungMa/` + maKH, this.getHeader());
  }
  CreateMaKH() {
    // return this.http.get(`${this.apiURL}KhachHang/CreateMaKhachHang`, this.getHeader());
    return this.http.get(`${this.apiURL}Customer/CreateMaKH`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('tokenKey')}` }),
      responseType: 'text'
    });
  }
  // ExportExcel(data: PagingParams) {
  //   // return this.http.get(`${this.apiURL}Role/GetRoleByUserId/` + userId, this.getHeader());
  // //console.log(data);
  //   const str = `${this.apiURL}HopDongHoaDon/ExportExcel?SortValue=` + data.SortValue
  //     + `&SortKey=` + data.SortKey
  //     + `&PageSize=` + data.PageSize
  //     + `&PageNumber=` + data.PageNumber
  //     + `&Keyword=` + data.Keyword
  //     + `&fromDate=` + data.fromDate
  //     + `&toDate=` + data.toDate
  //     + `&keywordCol=` + data.KeywordCol
  //     + `&userId=` + data.userId
  //     + `&nhanVienId=` + data.nhanVienId
  //     + `&colName=` + data.ColName;
  //   // console.log(str);
  //   return this.http.get(str, this.getHeader());
  // }
  exportExcel(data: PagingParams, selectedId: string) {
    const str = `${this.apiURL}Customer/ExportExcel?SortValue=` + data.SortValue
      + `&SortKey=` + data.SortKey
      + `&PageSize=` + data.PageSize
      + `&PageNumber=` + data.PageNumber
      + `&Keyword=` + data.Keyword
      + `&userId=` + data.userId
      + `&keywordCol=` + data.KeywordCol
      + `&colName=` + data.ColName
      + `&selectedId=` + selectedId
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate

    return this.http.get(str, this.getHeader());
  }
}