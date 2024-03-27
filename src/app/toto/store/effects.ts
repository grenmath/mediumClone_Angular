import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
// import {AuthService} from '../services/auth.services';
// import {authActions} from './actions';
import {HttpErrorResponse} from '@angular/common/http';
import {
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
// import {PersistanceService} from 'src/app/shared/services/persistance.service';
// import {Router} from '@angular/router';
import {routerNavigationAction} from '@ngrx/router-store';
import {Store} from '@ngrx/store';
import {TotoService} from '../services/toto.services';
import {TotoStateInterface} from '../types/totoState.interface';
import {totoActions} from './actions';
import {selectFormulasIds} from './reducers';

export const totoEffects = createEffect(
  (
    action$ = inject(Actions),
    totoService = inject(TotoService),
    store = inject(Store<{toto: TotoStateInterface}>)
  ) => {
    const cancelTrigger = action$
      .pipe(ofType(routerNavigationAction))
      .pipe(tap(() => console.log('cancelTrigger triggered')));

    return action$.pipe(
      ofType(totoActions.register),
      debounceTime(1000),
      withLatestFrom(store.select(selectFormulasIds)),
      switchMap(([action, formulaIds]) => {
        return totoService.getToto({formulaIds}).pipe(
          takeUntil(cancelTrigger),
          // takeUntil(nextSearch$),
          map((formulasIdsValues) => {
            return totoActions.fetchSuccess({formulasIdsValues});
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(totoActions.fetchFailure({errors: errorResponse.error.errors}))
          )
        );
      })
    );
  },
  {functional: true}
);

// export const redirectAfterRegisterEffect = createEffect(
//   (action$ = inject(Actions), router: Router = inject(Router)) => {
//     return action$.pipe(
//       ofType(authActions.registerSuccess),
//       tap(() => {
//         router.navigateByUrl('/');
//       })
//     );
//   },
//   {functional: true, dispatch: false}
// );
