import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/state';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  private _isAuthenticated = false;

  private _userSub: Subscription;

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._userSub = this._store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this._isAuthenticated = !!user;
      });
  }

  public onSave() {
    this._store.dispatch(new RecipeActions.StoreRecipes());
  }

  public onFetch() {
    this._store.dispatch(new RecipeActions.FetchRecipes());
  }

  public onLogout() {
    this._store.dispatch(new AuthActions.Logout());
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }

}
