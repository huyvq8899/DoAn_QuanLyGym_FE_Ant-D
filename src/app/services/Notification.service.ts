import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/env.service';
import { PagingParams } from 'src/app/models/PagingParams';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public apiURL = this.env.apiUrl + '/api/';

  constructor(
    private http: HttpClient,
    private env: EnvService) { }

    public getHeader() {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('tokenKey')}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
        })
      };
    }
  GetAll() {
    return this.http.get(`${this.apiURL}Notification/GetAll`, this.getHeader());
  }
  GetAllPaging(data: PagingParams) {
    
    // return this.http.get(`${this.apiURL}Role/GetRoleByUserId/` + userId, this.getHeader());
    const str = `${this.apiURL}Notification/GetAllPaging?SortValue=` + data.SortValue
      + `&SortKey=` + data.SortKey
      + `&PageSize=` + data.PageSize
      + `&PageNumber=` + data.PageNumber
      + `&Keyword=` + data.Keyword
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate
      + `&keywordCol=` + data.KeywordCol
      + `&userId=` + data.userId
      + `&colName=` + data.ColName;

    // console.log(str);
    return this.http.get(str, this.getHeader());
  }
  GetById(id: string) {
    return this.http.get(`${this.apiURL}Notification/GetById/` + id, this.getHeader());
  }
  UpdateViewNotic(id: string) {
    return this.http.get(`${this.apiURL}Notification/UpdateViewNotic/` + id, this.getHeader());
  }
  GetNoticNotViewByUser(id: string) {
    return this.http.get(`${this.apiURL}Notification/GetNoticNotViewByUser/` + id, this.getHeader());
  }
  Delete(id: string) {
    return this.http.delete(`${this.apiURL}Notification/Delete/` + id, this.getHeader());
  }
  DeleteNoticByUser(id: string) {
    return this.http.delete(`${this.apiURL}Notification/DeleteNoticByUser/` + id, this.getHeader());
  }
  Insert(data: any) {
    data.actionUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post(`${this.apiURL}Notification/Insert`, data, this.getHeader());
  }
  Update(data: any) {
    data.actionUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.put(`${this.apiURL}Notification/Update`, data, this.getHeader());
  }
}
