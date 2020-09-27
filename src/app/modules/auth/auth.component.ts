import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {AuthResponseData} from "../../models/auth-response.model";
import {Router} from "@angular/router";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  private _isLoginMode = true;

  private _isLoading = false;

  private _error: string = null;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  public onSwitchMode() {
    this._isLoginMode = !this._isLoginMode;
  }

  public onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this._isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this._isLoginMode) {
      authObs = this._authService.login(email, password);
    } else {
      authObs = this._authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      this._isLoading = false;
      this._router.navigate(['/recipes']);
      }, errorMessage => {
      console.error(errorMessage);
      this._error = errorMessage;
      this._isLoading = false;
    });

    form.reset();

  }

  get isLoginMode(): boolean {
    return this._isLoginMode;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get error(): string {
    return this._error;
  }

}
