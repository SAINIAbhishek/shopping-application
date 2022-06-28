import {Injectable} from '@angular/core';
import * as AuthActions from '../modules/auth/store/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../models/state';

@Injectable({ providedIn: 'root' })
export class AuthService {

  tokenExpirationTimer: any = null;

  constructor(private store: Store<AppState>) {}

  public setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  public clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
