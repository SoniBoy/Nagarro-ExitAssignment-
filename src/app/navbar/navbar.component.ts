import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private authStatus: boolean = false;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatus();
  }

  getAuthStatus(): boolean {

    return this.authStatus;

  }

  onLogout() {
    this.authService.logout();
  }

}
