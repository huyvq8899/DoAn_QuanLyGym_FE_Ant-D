import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';
@Injectable({
  providedIn: 'root'
})
export class FileDinhKemService {

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
    GetFileById(id: string) {
      return this.http.get(`${this.apiURL}FileDinhKem/GetFileById?Id=` +id, this.getHeader());
    }

    Insert(id: string) {
      return this.http.post(`${this.apiURL}FileDinhKem?FileDinhKemId=`+ id,id, this.getHeader());
    }

    Delete(fileURL: string) {
      return this.http.delete(`${this.apiURL}FileDinhKem?FileURL=` + fileURL, this.getHeader());
    }

    Update(data: any) {
      return this.http.put(`${this.apiURL}FileDinhKem`, data, this.getHeader());
    }

    UploadFile(data: any) {
      return this.http.post(`${this.apiURL}FileDinhKem/UploadFile`, data, this.getHeader());
    }

    InsertFile(data: any) {
      return this.http.put(`${this.apiURL}FileDinhKem/Insert`, data, this.getHeader());
    }
  }