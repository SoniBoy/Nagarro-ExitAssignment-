import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false ;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.userSignUp(form.value.userName , form.value.userMail , form.value.userPassword);
    this.isLoading = false;

  }

}
