import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
// import {AuthService} from '../services/auth.services';
// import {authActions} from './actions';
import {catchError, debounceTime, map, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
// import {PersistanceService} from 'src/app/shared/services/persistance.service';
// import {Router} from '@angular/router';
import { TotoService } from '../services/toto.services';
import { totoActions } from './actions';
import { selectFormulasIds, totoReducer } from './reducers';
import { Store } from '@ngrx/store';
import { TotoStateInterface } from '../types/totoState.interface';
import { skip, takeUntil } from 'rxjs/operators';

export const totoEffects = createEffect(
  (
    action$ = inject(Actions),
    totoService = inject(TotoService),
    store = inject(Store<{toto: TotoStateInterface}>)
  ) => {
    return action$.pipe(
      ofType(totoActions.fetch),
      withLatestFrom(store.select(selectFormulasIds)),
      debounceTime(1000),
      switchMap(([action, formulaIds] ) => {
        const nextSearch$ = action$.pipe(
          ofType(totoActions.fetch),
          skip(1)
        );
        return totoService.getToto({ formulaIds }).pipe(
          takeUntil(nextSearch$),
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
