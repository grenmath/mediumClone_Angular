import { createFeature, createReducer, on } from "@ngrx/store";
import { TotoStateInterface } from "../types/totoState.interface";
import { totoActions } from "./actions";

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
    on(totoActions.register, (state, action) => (
        console.log('state', state),
        console.log('action.formulas', action.formulas),  
        {
        ...state,
        formulasIds: state.formulasIds.concat(action.formulas),
    })),
      on(totoActions.fetch, (state) => ({
        ...state,
        isSubmitting: true,
      })),
      on(totoActions.fetchSuccess, (state, action) => ({
        ...state,
        isSubmitting: false,
        formulasIdsValues: action.formulasIdsValues,
      })),
    //   on(authActions.registerFailure, (state, action) => ({
    //     ...state,
    //     isSubmitting: false,
    //     validationErrors: action.errors
    //   }))
    ),
  });
  
  export const {
    name: totoFeatureKey,
    reducer: totoReducer,
    selectIsSubmitting,
    selectIsLoading,
    selectFormulasIds,
    selectFormulasIdsValues
  } = totoFeature;