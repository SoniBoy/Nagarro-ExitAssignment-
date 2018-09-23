import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UserData } from './auth.user.data.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {


  private authStatus: boolean = false;
  private token: string = null;
  private tokenTimer: any;



  constructor(private httpClient: HttpClient , private router: Router) {}


   // user login
  userLogin(userMail: String , userPassword: String) {

    this.httpClient.post<{token: string , message: string , expiresIn: number}>(
      '/api/users.route/login' ,
      { userMail: userMail , userPassword: userPassword } , {observe: 'response'})
      .subscribe((res) => {
        if (res.status === 200) {
          this.authStatus = true;
          this.token = res.body.token;
          this.saveAuthData(this.token, res.body.expiresIn);
          this.autoAuthUser();
          alert(res.body.message);
          this.router.navigate(['/']);
        } else if (res.status === 201) {
          alert(res.body.message);
        }

      });

  }

  // user sign up
  userSignUp(userName: string , userMail: string , userPassword: string ) {


    this.httpClient.post<{token: string , expiresIn: number ,  message: string}>(
    '/api/users.route/signup' ,
    { userName: userName , userMail: userMail , userPassword: userPassword })
    .subscribe( (res) => {
      this.authStatus = true;
      this.saveAuthData(res.token , res.expiresIn);
      this.autoAuthUser();
      alert(res.message);
      this.router.navigate(['/']);
    });


  }
        // saving auth data
  private saveAuthData(token: string , expiresIn: number ) {
    localStorage.setItem('token' ,  token);

    const now = new Date();
    console.log(now);
    console.log(now.getTime());
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    console.log(new Date(now.getTime() + expiresIn * 1000));
    localStorage.setItem('expiration' , expirationDate.toISOString());
  }
       // getting auth data
  getAuthData(): { token: string , expirationDate: Date } {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');



      return {
        token: token ,
        expirationDate: new Date(expirationDate)

      };


  }

  getAuthStatus(): boolean {
    return this.authStatus;
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }




 autoAuthUser() {
  const authInfo = this.getAuthData();
  if (authInfo.token) {
  const now = new Date();
  const expiresIn = authInfo.expirationDate.getTime() - now.getTime();

  if (expiresIn > 0) {

    this.authStatus = true;
    this.setAuthTimer(expiresIn);

  }

  }




}

private setAuthTimer(duration: number) {
  this.tokenTimer =  setTimeout(() => {
    this.logout();
  } , duration );

}




   getToken(): string {
     return this.token;
   }

  logout() {
    this.authStatus = false;
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);

  }

}


