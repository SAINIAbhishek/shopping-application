import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthResponseData} from "../models/auth-response.model";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {

	user = new BehaviorSubject<User>(null);

	constructor(private _httpClient: HttpClient) {}

	public signup(email: string, password: string) {
		return this._httpClient
			.post<AuthResponseData>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmlqbiObaop8Iw1OQrjPRMOnVEQosJl60',
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			).pipe(catchError(AuthService._handleError),
				tap(resData => {
					this._handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
				})
			);
	}

	public login(email: string, password: string) {
		return this._httpClient
			.post<AuthResponseData>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmlqbiObaop8Iw1OQrjPRMOnVEQosJl60',
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			).pipe(catchError(AuthService._handleError),
				tap(resData => {
					this._handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
				})
			);
	}

	private static _handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'An unknown error occurred!';
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}
		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This email exists already';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'This email does not exist.';
				break;
			case 'INVALID_PASSWORD':
				errorMessage = 'This password is not correct.';
				break;
		}
		return throwError(errorMessage);
	}

	private _handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
		const user = new User(email, userId, token, expirationDate);
		this.user.next(user);
		localStorage.setItem('userData', JSON.stringify(user));
	}

}
