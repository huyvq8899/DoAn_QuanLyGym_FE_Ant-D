import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class KhoHangService {

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
    data = new BehaviorSubject<any>({});
    currentData = this.data.asObservable();
    sendData(pushdata) {
        this.data.next(pushdata);
    }
    getAll() {
      return this.http.get(`${this.apiURL}KhoHang/GetAll`, this.getHeader());
    }
    Insert(data: any) {
      return this.http.post(`${this.apiURL}KhoHang`, data, this.getHeader());
    }
    Delete(id: string) {
      return this.http.delete(`${this.apiURL}KhoHang?Id=` + id, this.getHeader());
    }
    Update(data: any) {
      // console.log(data);
      return this.http.put(`${this.apiURL}KhoHang`, data, this.getHeader());
    }
    getById(id: string) {
      return this.http.get(`${this.apiURL}KhoHang/GetKhoHangById` +id, this.getHeader());
    }
  }