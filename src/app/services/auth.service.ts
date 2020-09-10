import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

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
			)
	}

}
