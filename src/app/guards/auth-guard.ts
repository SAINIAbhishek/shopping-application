import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../models/state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private _store: Store<AppState>,
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | boolean
    | Promise<boolean>
    | Observable<boolean> {
    return this._store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user => {
        if (!!user) {
          return true;
        }
        this._router.navigate(['/auth']).then();
        return false;
      })
    );
  }

}
