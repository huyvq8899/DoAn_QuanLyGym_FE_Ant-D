import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
    getAllProduct() {
      return this.http.get(`${this.apiURL}Product/GetAll`, this.getHeader());
    }
    CheckTrungMa(maSP:string){
      return this.http.get(`${this.apiURL}Product/CheckTrungMa/` + maSP, this.getHeader());
    }
    postProduct(data: any) {
      return this.http.post(`${this.apiURL}Product`, data, this.getHeader());
    }
    deleteProduct(id: string) {
      return this.http.delete(`${this.apiURL}Product?Id=` + id, this.getHeader());
    }
    putProduct(data: any) {
      // console.log(data);
      return this.http.put(`${this.apiURL}Product`, data, this.getHeader());
    }

}
