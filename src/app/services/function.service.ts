import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';
import { PagingParams } from '../models/PagingParams';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
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
  GetAllPaging(data: PagingParams) {
    // console.log(localStorage.getItem('tokenKey'));
    const str = `${this.apiURL}Function/GetAllPaging?SortValue=` + data.SortValue
      + `&SortKey=` + data.SortKey
      + `&PageSize=` + data.PageSize
      + `&PageNumber=` + data.PageNumber
      + `&Keyword=` + data.Keyword
      + `&fromDate=` + data.fromDate
      + `&toDate=` + data.toDate;
    // console.log(str);
    return this.http.get(str, this.getHeader());
  }
}
