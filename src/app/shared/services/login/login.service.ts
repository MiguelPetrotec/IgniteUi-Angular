import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { UserSession } from 'src/app/models/user-session';
import { AppState } from 'src/app/store/reducers';
import { environment } from '../../../../environments/environment';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private BASE_URL = environment.apiGatewayUrl + '/oauth';

    private REDIRECT_URI = 'http://localhost:4200/dashboard';
    private CLIENT_ID = 'PETROTEC';
    private SCOPE = 'read';

    constructor(private router: Router, private http: HttpClient, private store: Store<AppState> /*, private oauthService: OAuthService*/) {
        // this.oauthService.loginUrl = this.BASE_URL + '/token';
        // this.oauthService.redirectUri = this.REDIRECT_URI;
        // this.oauthService.clientId = this.CLIENT_ID;
        // this.oauthService.scope = this.SCOPE;
        // this.oauthService.setStorage(sessionStorage);
        // this.oauthService.tryLogin({});
    }


    logOut(): Observable<any> {
        // this.oauthService.logOut();
        sessionStorage.clear();

        this.router.navigate(['/login']);
        // location.reload();
        return EMPTY;
    }

    logIn(action: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Basic ' + btoa('PETROTEC:fe7dfe5a21ac4f42b389aa00f1ab2ef530516d28')
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Request-Method': 'GET,HEAD,POST,PUT',
            // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            // 'Authorization': 'Basic ' + 'PETROTEC:fe7dfe5a21ac4f42b389aa00f1ab2ef530516d28'
        });
        sessionStorage.setItem('username', action.user.id);
        const data =
            'grant_type=password&client_id=' + this.CLIENT_ID +
            '&scope=' + this.SCOPE +
            '&username=' + action.user.id +
            '&password=' + action.user.password;
        // const url = `${this.BASE_URL}/token`;
        const url = `${this.BASE_URL}/token`;
        return this.http.post<UserSession>(url, data, { headers });
    }

    refreshToken(): Observable<any> {
        console.log("Requesting refresh token!");
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic ' + btoa('PETROTEC:fe7dfe5a21ac4f42b389aa00f1ab2ef530516d28')
            })
        };

        const params = new HttpParams({
            fromObject: {
                grant_type: 'refresh_token',
                scope: 'read',
                refresh_token: sessionStorage.getItem('refresh_token')
            }
        });

        return this.http.post<UserSession>(`${this.BASE_URL}/token`, params, httpOptions).pipe(
            map((response) => {
                console.log("Token has been renewed");
                sessionStorage.setItem('access_token', response.access_token);
                sessionStorage.setItem('refresh_token', response.refresh_token);
                return response;
            }),
            catchError(error => {
                let date = new Date();
                console.log("An error occurred refreshing token, clearing session", error);
                sessionStorage.clear();
                throw date.toUTCString();
            })
        );
    }

}
