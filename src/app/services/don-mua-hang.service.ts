import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';
import { PagingParams } from '../models/PagingParams';
@Injectable({
  providedIn: 'root'
})
export class DonMuaHangService {

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
    getAll(loaiDonHang) {

      return this.http.get(`${this.apiURL}DonMuaHang/GetAll?loaiDonHang=` + loaiDonHang, this.getHeader());
    }
    Insert(data: any) {

      return this.http.post(`${this.apiURL}DonMuaHang`, data, this.getHeader());
    }
    Delete(id: string) {
  
      return this.http.delete(`${this.apiURL}DonMuaHang?Id=` + id, this.getHeader());
    }
    Update(data: any) {

      return this.http.put(`${this.apiURL}DonMuaHang`, data, this.getHeader());
    }

    CreateMaDonMuaTM(loaiDonHang: any) {
      return this.http.get(`${this.apiURL}DonMuaHang/CreateMaDonMuaTM?loaiDonHang=` + loaiDonHang, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('tokenKey')}` }),
        responseType: 'text'
      });
    }
    GetAllPaging(data: PagingParams,selectedId:string, loaiDonHang) {
      const str = `${this.apiURL}DonMuaHang/GetAllPaging?SortValue=` + data.SortValue
      + `&SortKey=` + data.SortKey
      + `&PageSize=` + data.PageSize
      + `&PageNumber=` + data.PageNumber
      + `&Keyword=` + data.Keyword
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate
      + `&selectedId=` +selectedId
      + `&keywordCol=` + data.KeywordCol
      + `&colName=` + data.ColName
      + `&loaiDonHang=` + loaiDonHang
      return this.http.get(str, this.getHeader());
  }
  GetAllMobile(data: PagingParams,selectedId: string, loaiDonHang) {
    const str = `${this.apiURL}DonMuaHang/GetAllMobile?fromDate=` + data.fromDate
        + `&toDate=` + data.toDate
        + `&Id=` + selectedId
        + `&loaiDonHang=` + loaiDonHang
        return this.http.get(str, this.getHeader());
  }
  exportExcel(data: PagingParams,selectedId:string, loaiDonHang) {
    const str = `${this.apiURL}DonMuaHang/ExportExcel?SortValue=` + data.SortValue
        + `&SortKey=` + data.SortKey
        + `&PageSize=` + data.PageSize
        + `&PageNumber=` + data.PageNumber
        + `&Keyword=` + data.Keyword
        + `&keywordCol=` + data.KeywordCol
        + `&colName=` + data.ColName
        + `&selectedId=` +selectedId
        + `&fromDate=` + data.fromDate
        + `&toDate=` + data.toDate
        + `&loaiDonHang=` + loaiDonHang

    return this.http.get(str, this.getHeader());
}
  }