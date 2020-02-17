import { Action, createReducer, on } from '@ngrx/store';
import * as MessagesActionTypes from '../../actions/messages/message.actions';
import { AppMessage } from 'src/app/models/common/appMessage';


export interface MessagesState {

    appMessage: AppMessage;
}

export const initialState: MessagesState = {

    appMessage: null
};

const messagesReducer = createReducer(
    initialState,
    on(MessagesActionTypes.setMessage, (state, { appMessage }) => ({
        ...state, appMessage: appMessage
    })),
    on(MessagesActionTypes.resetMessage, (state, { }) => ({
        ...state, appMessage: null
    }))
);


export function reducer(state: MessagesState | undefined, action: Action) {

    return messagesReducer(state, action);
}
