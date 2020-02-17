import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { resetMessage, setMessage } from 'src/app/store/actions/messages/message.actions';
import { LoginService } from '../shared/services';
import { AppState } from '../store/reducers';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    pendingRequests: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    isRefreshingToken: boolean = false;

    constructor(private router: Router, private store: Store<AppState>, private loginService: LoginService, private translate: TranslateService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        return next.handle(this.addAuthenticationHeader(request)).pipe(
            catchError(error => {

                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 401:
                            if (request.url.includes('/oauth/token')) {
                                console.log('Error refreshing token');
                                return throwError('Couldn\'t refresh token');
                            }
                            console.log('Handling 401 error');
                            return this.handle401Unauthorized(request, next, error);
                        default:
                            console.log('Request error code: ' + error.status);
                            return this.handleError(error);
                    }
                } else {
                    console.log('Request error');
                    return this.handleError(error);
                }
            }));
    }
    private handleError(err: any) {
        let errorMsg: string;
        if (err && err.error && err.error.error_description) {
            errorMsg = err.error.error_description;
        } else if (err && err.error && err.error.message) {
            errorMsg = err.error.message;
        } else if (err && err.message && err.error.error) {
            errorMsg = err.error.error.errors.toString();
        } else if (err && err.message) {
            errorMsg = err.message;
        } else if (err) {
            errorMsg = err.statusText;
        } else {
            errorMsg = 'Unknown error';
        }

        //sessionStorage.clear();
        //this.router.navigate(['/login']);
        // this.isRefreshingToken = false;
        // this.store.dispatch(resetMessage());
        // this.store.dispatch(setMessage({
        //     appMessage: {
        //         message: errorMsg,
        //         owner: this.translate.instant("App.Errors.Error"),
        //         severity: 'error',
        //         timestamp: new Date().getTime()
        //     }
        // }));
        return throwError(errorMsg);
    }

    private handle401Unauthorized(request: HttpRequest<any>, next: HttpHandler, error: any): Observable<HttpEvent<any>> {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.pendingRequests.next(null);

            return this.loginService.refreshToken().pipe(switchMap(
                user => {
                    console.log('Has new refresh token! Refreshing')
                    this.pendingRequests.next(user.refresh_token);
                    return next.handle(this.addAuthenticationHeader(request));
                }),
                catchError(error => {
                    console.log('Catch error pending request');
                    this.pendingRequests.next('ERROR');
                    this.router.navigate(['/login']);
                    return this.handleError('Unable to refresh token - ' + error);
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                })
            );
        } else {
            return this.pendingRequests
                .pipe(filter(refreshToken => refreshToken != null),
                    take(1),
                    switchMap(response => {
                        if (response === 'ERROR') {
                            return this.handleError(error);
                        } else {
                            return next.handle(this.addAuthenticationHeader(request));
                        }
                    }),
                    catchError(err => this.handleError(err))
                );
        }
    }

    private addAuthenticationHeader(request: HttpRequest<any>) {
        const access_token = sessionStorage.getItem('access_token');
        if (request.url.includes('/api/') && access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${access_token}`
                }
            });
        }
        return request;
    }
}
