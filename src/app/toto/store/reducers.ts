import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {TotoStateInterface} from '../types/totoState.interface';
import {totoActions} from './actions';

const initialState: TotoStateInterface = {
  isSubmitting: false,
  isLoading: false,
  formulasIds: [],
  formulasIdsValues: [],
};

const reducer = createReducer(
  initialState,
  on(totoActions.register, (state: TotoStateInterface, {formulas}) => ({
    ...state,
    isLoading: true,
    formulasIds: [...new Set([...state.formulasIds, ...formulas])],
  })),
  on(totoActions.fetch, (state: TotoStateInterface, action) => ({
    ...state,
    isLoading: true,
    isSubmitting: action.submited,
  })),
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
);

export const totoFeature = createFeature({
  name: 'toto',
  reducer,
  extraSelectors: (baseSelectors) => {
    const selectFormulaByIds = (ids: string[]) =>
      createSelector(baseSelectors.selectFormulasIdsValues, (values = []) =>
        values.filter(({id}) => ids.includes(id))
      );

    return {...baseSelectors, selectFormulaByIds};
  },
});
