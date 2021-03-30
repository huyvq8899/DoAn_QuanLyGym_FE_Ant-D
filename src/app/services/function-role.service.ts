import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionRoleService {
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
  GetAllFunctionRole() {
    return this.http.get(`${this.apiURL}FunctionRole/GetAllFunctionRole`, this.getHeader());
  }
  GetFunctionByRoleName(roleName: string) {
    return this.http.get(`${this.apiURL}FunctionRole/GetFunctionByRoleName/` + roleName, this.getHeader());
  }
  UpdateFunctionRole(data: any) {
    // console.log(data);
    return this.http.put(`${this.apiURL}FunctionRole/UpdateFunctionRole`, data, this.getHeader());
  }
}
