import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  isLoginMode = true;

  isLoading = false;

  error: string = null;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
    } else {
      authObs = this._authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      }, errorMessage => {
      console.error(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();

  }

}
