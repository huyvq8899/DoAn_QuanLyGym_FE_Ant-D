import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

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
  getAllCardType() {
    return this.http.get(`${this.apiURL}CardType/GetAll`, this.getHeader());
  }
  postCardType(data: any) {
    return this.http.post(`${this.apiURL}CardType`, data, this.getHeader());
  }
  deleteCardType(id: string) {
    return this.http.delete(`${this.apiURL}CardType?Id=` + id, this.getHeader());
  }
  putCardType(data: any) {
    // console.log(data);
    return this.http.put(`${this.apiURL}CardType`, data, this.getHeader());
  }
}
