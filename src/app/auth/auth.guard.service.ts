import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService , private route: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {

   const authStatus: boolean = this.authService.getAuthStatus();

    if (!authStatus) {
      alert('please login to continue');
      this.route.navigate(['/login']);

    }


    return authStatus;


  }

}
