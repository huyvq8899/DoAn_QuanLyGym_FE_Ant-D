import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';
import { PagingParams } from '../models/PagingParams';
@Injectable({
  providedIn: 'root'
})
export class XinNghiService {

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

      return this.http.get(`${this.apiURL}XinNghi/GetAll`, this.getHeader());
    }
    GetAllMobile(data: PagingParams) {
      const str = `${this.apiURL}XinNghi/GetAllMobile?fromDate=` + data.fromDate
          + `&toDate=` + data.toDate
      return this.http.get(str, this.getHeader());
  }
    Insert(data: any) {

      return this.http.post(`${this.apiURL}XinNghi`, data, this.getHeader());
    }
    Delete(id: string) {
  
      return this.http.delete(`${this.apiURL}XinNghi?Id=` + id, this.getHeader());
    }
    Update(data: any) {

      return this.http.put(`${this.apiURL}XinNghi`, data, this.getHeader());
    }
    GetAllPaging(data: PagingParams,selectedId:string) {
      console.log('hello')
      const str = `${this.apiURL}XinNghi/GetAllPaging?SortValue=` + data.SortValue
      + `&SortKey=` + data.SortKey
      + `&PageSize=` + data.PageSize
      + `&PageNumber=` + data.PageNumber
      + `&Keyword=` + data.Keyword
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate
      + `&selectedId=` +selectedId
      + `&keywordCol=` + data.KeywordCol
      + `&colName=` + data.ColName
      // + `&id=` +id
          

      return this.http.get(str, this.getHeader());
  }

  exportExcel(data: PagingParams,selectedId:string) {
    const str = `${this.apiURL}XinNghi/ExportExcel?SortValue=` + data.SortValue
        + `&SortKey=` + data.SortKey
        + `&PageSize=` + data.PageSize
        + `&PageNumber=` + data.PageNumber
        + `&Keyword=` + data.Keyword
        + `&keywordCol=` + data.KeywordCol
        + `&colName=` + data.ColName
        + `&selectedId=` +selectedId
        + `&fromDate=` + data.fromDate
        + `&toDate=` + data.toDate
        // + `&id=` +id
    return this.http.get(str, this.getHeader());
}
    
  }