import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class LaiXeService {

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

      return this.http.get(`${this.apiURL}LaiXe/GetAll`, this.getHeader());
    }
    Insert(data: any) {

      return this.http.post(`${this.apiURL}LaiXe`, data, this.getHeader());
    }
    Delete(id: string) {
  
      return this.http.delete(`${this.apiURL}LaiXe?Id=` + id, this.getHeader());
    }
    Update(data: any) {

      return this.http.put(`${this.apiURL}LaiXe`, data, this.getHeader());
    }
    
  }