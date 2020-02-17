import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

@Injectable()
export class MessagesEffects {


    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private router: Router
    ) { }

}
