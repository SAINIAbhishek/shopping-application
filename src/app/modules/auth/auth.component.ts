import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor() { }

  ngOnInit() {
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
