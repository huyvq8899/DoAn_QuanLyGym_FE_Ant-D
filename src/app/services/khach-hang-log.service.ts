import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvService } from "../env.service";
import { PagingParams } from "../models/PagingParams";

@Injectable({
  providedIn: "root",
})
export class KhachHangLogService {
  public apiURL = this.env.apiUrl + "/api/";
  constructor(private http: HttpClient, private env: EnvService) { }

  public getHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('tokenKey')}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
      })
    };
  }
  GetAllPaging(data: PagingParams, selectedId: string) {
    const str =
      `${this.apiURL}KhachHangLog/GetAllPaging?SortValue=` +
      data.SortValue +
      `&SortKey=` +
      data.SortKey +
      `&PageSize=` +
      data.PageSize +
      `&PageNumber=` +
      data.PageNumber +
      `&Keyword=` +
      data.Keyword +
      `&fromDate=` +
      data.fromDate +
      `&toDate=` +
      data.toDate +
      `&selectedId=` +
      selectedId +
      `&keywordCol=` +
      data.KeywordCol +
      `&colName=` +
      data.ColName;
    return this.http.get(str, this.getHeader());
  }
  exportExcel(data: PagingParams, selectedId: string) {
    const str =
      `${this.apiURL}KhachHangLog/ExportExcel?SortValue=` +
      data.SortValue +
      `&SortKey=` +
      data.SortKey +
      `&PageSize=` +
      data.PageSize +
      `&PageNumber=` +
      data.PageNumber +
      `&Keyword=` +
      data.Keyword +
      `&keywordCol=` +
      data.KeywordCol +
      `&colName=` +
      data.ColName +
      `&selectedId=` +
      selectedId +
      `&userId=` +
      data.userId +
      `&fromDate=` +
      data.fromDate +
      `&toDate=` +
      data.toDate;

    return this.http.get(str, this.getHeader());
  }
}
