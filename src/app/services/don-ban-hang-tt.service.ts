import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../models/PagingParams';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class DonBanHangTTService {

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
  Insert(data: any) {
    return this.http.post(`${this.apiURL}DonBanHangTT`, data, this.getHeader());
  }
  CreateMaDon(userName: string) {
    return this.http.get(`${this.apiURL}DonBanHangTT/CreateMaDonHang/` + userName,
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('tokenKey')}` }),
        responseType: 'text'
      });
  }
  Delete(id: string) {

    return this.http.delete(`${this.apiURL}DonBanHangTT?Id=` + id, this.getHeader());
  }
  DeleteFile(file: string, Loai: string) {

    return this.http.delete(`${this.apiURL}DonBanHangTT/DeleteFile?file=` + file + `&Loai=` + Loai, this.getHeader());
  }
  Update(data: any) {

    return this.http.put(`${this.apiURL}DonBanHangTT`, data, this.getHeader());
  }
  SetKhanCap(DonBanHangId: string, KhanCap: boolean) {
    return this.http.get(`${this.apiURL}DonBanHangTT/SetKhanCap/` + DonBanHangId + '/' + KhanCap, this.getHeader());
  }
  UpdateFile(data: any, loai: string) {

    return this.http.put(`${this.apiURL}DonBanHangTT/UpdateFile?Loai=` + loai, data, this.getHeader());
  }
  InsertFile(data: any, loai: string) {

    return this.http.put(`${this.apiURL}DonBanHangTT/InsertFile?Loai=` + loai, data, this.getHeader());
  }
  getAllDiaChi() {

    return this.http.get(`${this.apiURL}DonBanHangTT/GetAllDiaChi`, this.getHeader());
  }
  getAllLienHe() {

    return this.http.get(`${this.apiURL}DonBanHangTT/GetAllLienHe`, this.getHeader());
  }
  GetAllPaging(data: PagingParams, id: string, selectedId: string) {
    const str = `${this.apiURL}DonBanHangTT/GetAllPaging?SortValue=` + data.SortValue
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
  GetAllMobile(data: PagingParams, id: string) {
    const str = `${this.apiURL}DonBanHangTT/GetAllMobile?fromDate=` + data.fromDate
      + `&toDate=` + data.toDate
      + `&Id=` + id
    return this.http.get(str, this.getHeader());
  }
  GetFile(DonBanHangTTId: string) {
    return this.http.get(`${this.apiURL}DonBanHangTT/GetFile/` + DonBanHangTTId, this.getHeader());
  }
  UploadFile(data: any, loai: string) {
    return this.http.post(`${this.apiURL}DonBanHangTT/UploadFile?Loai=` + loai, data, this.getHeader());
  }
  exportExcel(data: PagingParams, selectedId: string) {
    const str = `${this.apiURL}DonBanHangTT/ExportExcel?SortValue=` + data.SortValue
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