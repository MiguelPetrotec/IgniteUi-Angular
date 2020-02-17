import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { UserSession } from 'src/app/models/user-session';


export const loginSuccess = createAction('[Login] Login Action Success', props<{authenticatedUser: UserSession}>());
export const logOutSuccess = createAction('[Login] LogOut Action Success');
export const authenticate = createAction('[Login] Authenticate Action', props<{user: User}>());
export const loginFailure = createAction('[Login] Login Action Failure', props<{error: Error}>());
