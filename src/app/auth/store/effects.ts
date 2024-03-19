import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.services';
import {authActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistanceService} from 'src/app/shared/services/persistance.service';
import {Router} from '@angular/router';

export const registerEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return action$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerFailure({errors: errorResponse.error.errors})
            )
          )
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterRegisterEffect = createEffect(
  (action$ = inject(Actions), router: Router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {functional: true, dispatch: false}
);
