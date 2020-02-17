import { createAction, props } from '@ngrx/store';
import { AppMessage } from 'src/app/models/common/appMessage';


export const setMessage = createAction('[Message] Message Set Action', props<{appMessage: AppMessage}>());
export const resetMessage = createAction('[Message] Message Reset Action');
