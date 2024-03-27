import {createFeature, createReducer, on} from '@ngrx/store';
import {TotoStateInterface} from '../types/totoState.interface';
import {totoActions} from './actions';

const initialState: TotoStateInterface = {
  isSubmitting: false,
  isLoading: false,
  formulasIds: [],
  formulasIdsValues: [],
};

const totoFeature = createFeature({
  name: 'toto',
  reducer: createReducer(
    initialState,
    on(totoActions.register, (state: TotoStateInterface, {formulas}) =>
      // console.log('state register', state),
      // console.log('action.formulas', action.formulas),
      ({
        ...state,
        isLoading: true,
        formulasIds: [...new Set([...state.formulasIds, ...formulas])],
      })
    ),
    on(totoActions.fetch, (state: TotoStateInterface, action) =>
      // console.log('state fetch', state),
      ({
        ...state,
        isLoading: true,
        isSubmitting: action.submited,
      })
    ),
    on(totoActions.fetchSuccess, (state: TotoStateInterface, action) => ({
      ...state,
      isLoading: false,
      isSubmitting: false,
      formulasIdsValues: action.formulasIdsValues,
    })),
    on(totoActions.fetchFailure, (state: TotoStateInterface, action) => ({
      ...state,
      isLoading: false,
      isSubmitting: false,
      // validationErrors: action.errors
    }))
  ),
});

// tu peux crééer des selector function with parameters

export const {
  name: totoFeatureKey,
  reducer: totoReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectFormulasIds,
  selectFormulasIdsValues,
} = totoFeature;
