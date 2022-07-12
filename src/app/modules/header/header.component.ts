import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/state';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  private _isAuthenticated = false;

  private _userSub: Subscription;

  constructor(private _store: Store<AppState>,
              private _toastrService: ToastrService,
              private _router: Router) { }

  ngOnInit() {
    this._userSub = this._store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this._isAuthenticated = !!user;
      });
  }

  public onSave() {
    if (this._isAuthenticated) {
      this._store.dispatch(new RecipeActions.StoreRecipes());
    } else {
      this._toastrService.error('You need to login to Save data.', 'Error');
    }
  }

  public onFetch() {
    if (this._isAuthenticated) {
      this._store.dispatch(new RecipeActions.FetchRecipes());
    } else {
      this._toastrService.error('You need to login to Fetch data.', 'Error');
    }
  }

  public onLogout() {
    this._store.dispatch(new AuthActions.Logout());
  }

  public navigateTo(url: string, event: Event): void {
    event.preventDefault();

    if (this._isAuthenticated) {
      this._router.navigate([url]).then();
    } else {
      this._toastrService.error('You need to login.', 'Error');
    }
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }

}
