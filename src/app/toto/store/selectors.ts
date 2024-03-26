import { createSelector } from "@ngrx/store";
import { TotoStateInterface } from "../types/totoState.interface";

export const selectTotoFeature = (state: {toto: TotoStateInterface}) => state.toto;
export const selectIsSubmitting = createSelector(selectTotoFeature, state => state.isSubmitting);