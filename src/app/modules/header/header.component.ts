import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipesDataService} from '../../services/recipes-data.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/state';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  private _isAuthenticated = false;

  private _userSub: Subscription;

  constructor(private _store: Store<AppState>,
              private _recipesDataService: RecipesDataService) { }

  ngOnInit() {
    this._userSub = this._store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
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
    this._store.dispatch(new AuthActions.Logout());
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }

}
