import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
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
  getAllJob() {
    return this.http.get(`${this.apiURL}Job/GetAll`, this.getHeader());
  }
  postJob(data: any) {
    return this.http.post(`${this.apiURL}Job`, data, this.getHeader());
  }
  deleteJob(id: string) {
    return this.http.delete(`${this.apiURL}Job?Id=` + id, this.getHeader());
  }
  putJob(data: any) {
    // console.log(data);
    return this.http.put(`${this.apiURL}Job`, data, this.getHeader());
  }
}
