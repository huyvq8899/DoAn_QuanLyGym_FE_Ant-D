import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../models/PagingParams';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // public apiURL = environment.apiurl;
  public apiURL = this.env.apiUrl + '/api/';
  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  public getHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('tokenKey')}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
      })
    };
  }
  GetAll() {
    return this.http.get(`${this.apiURL}Role/GetAllRole`, this.getHeader());
  }
  GetRoleByTree() {
    return this.http.get(`${this.apiURL}Role/GetRoleByTree`, this.getHeader());
  }
  GetById(id: string) {
    return this.http.get(`${this.apiURL}Role/GetById/${id}`, this.getHeader());
  }
  Delete(id: string) {
    return this.http.delete(`${this.apiURL}Role/${id}`, this.getHeader());
  }
  Insert(data: any) {
    return this.http.post(`${this.apiURL}Role`, data, this.getHeader());
  }
  Update(data: any) {
    return this.http.put(`${this.apiURL}Role`, data, this.getHeader());
  }
  GetAllPaging(param: PagingParams) {
    const str = `${this.apiURL}Role/GetAllPaging?SortValue=` + param.SortValue
      + `&SortKey=` + param.SortKey
      + `&PageSize=` + param.PageSize
      + `&PageNumber=` + param.PageNumber
      + `&Keyword=` + param.Keyword
      + `&fromDate=` + param.fromDate
      + `&toDate=` + param.toDate
      + `&keywordCol=` + param.KeywordCol
      + `&colName=` + param.ColName
      + `&userId=` + param.userId;
    return this.http.get(str, this.getHeader());
  }
  checkRoleName(roleName: string) {
    return this.http.get(`${this.apiURL}Role/CheckRoleName/` + roleName, this.getHeader());
  }
  Reset() {
    return this.http.get(`${this.apiURL}Role/Reset`, this.getHeader());
  }
}
