import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
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
  getAllFacility() {
    return this.http.get(`${this.apiURL}Facility/GetAll`, this.getHeader());
  }
  postFacility(data: any) {
    return this.http.post(`${this.apiURL}Facility`, data, this.getHeader());
  }
  deleteFacility(id: string) {
    return this.http.delete(`${this.apiURL}Facility?Id=` + id, this.getHeader());
  }
  putFacility(data: any) {
    // console.log(data);
    return this.http.put(`${this.apiURL}Facility`, data, this.getHeader());
  }
}
