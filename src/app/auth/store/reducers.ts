import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStateInterface} from '../types/authState.interface';
import {authActions} from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    on(authActions.register, (state: AuthStateInterface) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state: AuthStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state: AuthStateInterface, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }))
  ),
});
