import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
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
  getAllEquipment() {
    return this.http.get(`${this.apiURL}Equipment/GetAll`, this.getHeader());
  }
  postEquipment(data: any) {
    return this.http.post(`${this.apiURL}Equipment`, data, this.getHeader());
  }
  deleteEquipment(id: string) {
    return this.http.delete(`${this.apiURL}Equipment?Id=` + id, this.getHeader());
  }
  putEquipment(data: any) {
    // console.log(data);
    return this.http.put(`${this.apiURL}Equipment`, data, this.getHeader());
  }
}
