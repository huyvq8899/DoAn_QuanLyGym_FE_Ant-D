import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoiNhuanService {
  isAddNew = new BehaviorSubject<boolean>(true);
  currentAddNew = this.isAddNew.asObservable();

  changeAddNew(message) {
    this.isAddNew.next(message);
  }
  loiNhuanData= new BehaviorSubject<any>({}); 
  currentData = this.loiNhuanData.asObservable();
  
  sendData(data) {
    this.loiNhuanData.next(data);
  }
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
      return this.http.get(`${this.apiURL}LoiNhuan/GetAll`, this.getHeader());
    }
    getByMaLN(MaLN: string) {
      return this.http.get(`${this.apiURL}LoiNhuan/GetByMaLN?MaLN=` + MaLN, this.getHeader());
    }
    Insert(data: any) {
      return this.http.post(`${this.apiURL}LoiNhuan`, data, this.getHeader());
    }
    Delete(id: string) {
      return this.http.delete(`${this.apiURL}LoiNhuan?Id=` + id, this.getHeader());
    }
    Update(data: any) {
      // console.log(data);
      return this.http.put(`${this.apiURL}LoiNhuan`, data, this.getHeader());
    }
    
  }