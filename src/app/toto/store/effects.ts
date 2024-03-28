import {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {routerNavigationAction} from '@ngrx/router-store';
import {Store} from '@ngrx/store';
import {
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import {TotoService} from '../services/toto.services';
import {TotoStateInterface} from '../types/totoState.interface';
import {totoActions} from './actions';
import {totoFeature} from './reducers';

export const totoEffects = createEffect(
  (
    action$ = inject(Actions),
    totoService = inject(TotoService),
    store = inject(Store<{toto: TotoStateInterface}>)
  ) => {
    const cancelTrigger = action$
      .pipe(ofType(routerNavigationAction))
      .pipe(tap(() => console.log('cancelTrigger triggered')));

    // since i added a CANCEL ACTION,
    // no required to add cancelTrigger by router navigayion

    return action$.pipe(
      ofType(totoActions.register, totoActions.cancel),
      debounceTime(1000),
      withLatestFrom(store.select(totoFeature.selectFormulasIds)),
      switchMap(([action, formulaIds]) => {
        return action.type === totoActions.cancel.type
          ? of()
          : totoService.getToto({formulaIds}).pipe(
              // takeUntil(cancelTrigger),
              map((formulasIdsValues) => {
                return totoActions.fetchSuccess({formulasIdsValues});
              }),
              catchError((errorResponse: HttpErrorResponse) =>
                of(
                  totoActions.fetchFailure({errors: errorResponse.error.errors})
                )
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
