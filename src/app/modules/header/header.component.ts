import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipesDataService} from "../../services/recipes-data.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  private _isAuthenticated = false;

  private _userSub: Subscription;

  constructor(private _recipesDataService: RecipesDataService,
              private _authService: AuthService) { }

  ngOnInit() {
    this._userSub = this._authService.user.subscribe(user => {
      this._isAuthenticated = !!user;
    });
  }

  public onSave() {
    this._recipesDataService.save();
  }

  public onFetch() {
    this._recipesDataService.getAll().subscribe();
  }

  public onLogout() {
    this._authService.logout();
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }

}
