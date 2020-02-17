import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, loginStateisAuthenticated } from 'src/app/store/reducers';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
    constructor(private router: Router, private store: Store<AppState>) {

        this.isAuthenticated$ = this.store.pipe(select(loginStateisAuthenticated));
        this.isAuthenticatedSubs = this.isAuthenticated$.subscribe((isAuthenticated: boolean) => {

            this.isAuthenticated = isAuthenticated;
        });
    }

    isAuthenticatedSubs: Subscription;
    isAuthenticated$: Observable<boolean>;
    isAuthenticated: boolean | false;

    canActivate() {
        // check if the sessionToken is valid
        if (sessionStorage.getItem('isAuthenticated') === 'true') {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    ngOnDestroy(): void {
        this.isAuthenticatedSubs.unsubscribe();
    }
}
