import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagingParams } from '../models/PagingParams';
import { EnvService } from '../env.service';

@Injectable({
    providedIn: 'root'
})
export class ThongBaoService {
    public apiURL = this.env.apiUrl + '/api/ThongBao/';
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

    GetById(id: string) {
        return this.http.get(`${this.apiURL}` + id, this.getHeader());
    }

    GetDetail(id: string) {
        return this.http.get(`${this.apiURL}GetDetail/` + id, this.getHeader());
    }

    GetCountNotOpenYetByNguoiNhan(userId: string) {
        return this.http.get(`${this.apiURL}GetCountNotOpenYetByNguoiNhan/` + userId, this.getHeader());
    }

    UpdateAllOpenedByNguoiNhan(userId) { 
        const data = { userId };
        return this.http.put(`${this.apiURL}UpdateAllOpenedByNguoiNhan`, data, this.getHeader());
    }

    GetAllPaging(data: PagingParams) {
        const str = `${this.apiURL}GetAllPaging?SortValue=` + data.SortValue
            + `&SortKey=` + data.SortKey
            + `&PageSize=` + data.PageSize
            + `&PageNumber=` + data.PageNumber
            + `&Keyword=` + data.Keyword
            + `&userId=` + data.userId
            + `&fromDate=` + data.fromDate
            + `&toDate=` + data.toDate;

        return this.http.get(str, this.getHeader());
    }

    Create(data: any) {
        return this.http.post(`${this.apiURL}`, data, this.getHeader());
    }

    Delete(id: string) {
        return this.http.delete(`${this.apiURL}` + id, this.getHeader());
    }

    DeleteAllByNguoiNhanId(id: string) {
        return this.http.delete(`${this.apiURL}DeleteAllByNguoiNhanId/` + id, this.getHeader());
    }
}
