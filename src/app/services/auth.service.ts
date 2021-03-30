import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { EnvService } from '../env.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public apiURL = environment.apiurl;
  public apiURL = this.env.apiUrl + '/api/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private env: EnvService) { }

    public getHeader() {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('tokenKey')}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
        })
      };
  }
  login(data: any) {
    return this.http.post(`${this.apiURL}auth/Login`, data).pipe(
      map((rs: any) => {
        if (rs.result === 1) {
          localStorage.setItem('userName', rs.userName);
          localStorage.setItem('userId', rs.userId);
          localStorage.setItem('tokenKey', rs.tokenKey);
          this.decodedToken = this.jwtHelper.decodeToken(rs.tokenKey);
          // console.log(rs.model);
          // console.log( JSON.stringify(rs.model));
          localStorage.setItem('currentUser', JSON.stringify(rs.model));
          localStorage.setItem('listStaff', JSON.stringify(rs.listStaff));
          localStorage.setItem('roleId', rs.model.roleId);
          localStorage.setItem('roleName', rs.model.roleName);
          localStorage.setItem('listFunction', JSON.stringify(rs.listFunction));
          console.log(rs.listFunction);
          //
        }
        return { result: rs.result, tokenKey: rs.tokenKey };
      })
    );
  }
  loggedIn() {
    const token = localStorage.getItem('tokenKey');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('tokenKey');
    this.decodedToken = null;
    this.router.navigate(['/dang-nhap']);
  }
  mlogout() {
    localStorage.removeItem('tokenKey');
    this.decodedToken = null;
    this.router.navigate(['/m-dang-nhap']);
  }
}
