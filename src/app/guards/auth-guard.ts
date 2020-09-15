import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {AuthService} from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

	constructor(private _authService: AuthService,
							private _router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>
		| Promise<boolean> {
		return this._authService.user.pipe(take(1), map(user => {
			return !!user;
			/*const isAuth = !!user;
			if (isAuth) {
				return true;
			}
			return this._router.createUrlTree(['/auth']);*/
			}), tap( isAuth => {
				console.log(isAuth)
				if (!isAuth) {
					this._router.navigate(['/auth']);
					return false;
				}
			})
		);
	}

}
