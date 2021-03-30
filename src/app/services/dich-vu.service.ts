import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';


@Injectable({
  providedIn: 'root'
})
export class DichVuService {
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
    getAllService() {
      return this.http.get(`${this.apiURL}Service/GetAll`, this.getHeader());
    }
    postService(data: any) {
      return this.http.post(`${this.apiURL}Service`, data, this.getHeader());
    }
    deleteService(id: string) {
      return this.http.delete(`${this.apiURL}Service?Id=` + id, this.getHeader());
    }
    putService(data: any) {
      // console.log(data);
      return this.http.put(`${this.apiURL}Service`, data, this.getHeader());
    }
}
