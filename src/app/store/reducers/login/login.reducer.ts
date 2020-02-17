import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActionTypes from '../../actions/login/login.actions';
import { UserSession } from 'src/app/models/user-session';


export interface LoginState {
  currentUser?: UserSession;
  isAuthenticated: boolean;
  expirationDate: Date;
  error: Error;
  isLoading: boolean;
}

export const initialState: LoginState = {
  currentUser: null,
  isAuthenticated: false,
  expirationDate: null,
  error: null,
  isLoading: false
};

const loginReducer = createReducer(
  initialState,
  on(LoginActionTypes.loginSuccess, (state,
    { authenticatedUser }) => ({
      ...state, isAuthenticated: true, error: null, isLoading: false,
      currentUser: authenticatedUser, expirationDate: new Date((new Date().getTime() + (1000 * authenticatedUser.expires_in)))
    })),
  on(LoginActionTypes.logOutSuccess, (state) =>
    ({
      ...state, currentUser: initialState.currentUser,
      isAuthenticated: initialState.isAuthenticated, error: initialState.error
    })),
  on(LoginActionTypes.authenticate, (state, { user }) => ({ ...state, isLoading: true })),
  on(LoginActionTypes.loginFailure, (state, { error }) =>
    ({ ...state, isLoading: false, error: error }))
);

export function reducer(state: LoginState | undefined, action: Action) {

  return loginReducer(state, action);
}
