import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {FormulaIdValue} from '../types/formulasValues.interface';
import {TotoStateInterface} from '../types/totoState.interface';
import {totoActions} from './actions';

const initialState: TotoStateInterface = {
  isSubmitting: false,
  isLoading: false,
  formulasIds: [],
  entities: {},
  ids: [],
};

export const adapter: EntityAdapter<FormulaIdValue> =
  createEntityAdapter<FormulaIdValue>({});

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
  on(
    totoActions.fetchSuccess,
    (state: TotoStateInterface, {formulasIdsValues}) =>
      adapter.addMany(formulasIdsValues, {
        ...state,
        isLoading: false,
        isSubmitting: false,
      })
  ),
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
      createSelector(baseSelectors.selectEntities, (entities) =>
        ids.map((id) => entities[id])
      );

    return {...baseSelectors, selectFormulaByIds};
  },
});
