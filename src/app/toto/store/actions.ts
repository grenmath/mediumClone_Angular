import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TotoRequestInterface } from "../types/totoRequest.interface";
import { FormulaIdValue } from "../types/formulasValues.interface";

export const totoActions = createActionGroup({
    source: 'toto',
    events: {
        Register: props<{formulas: string[]}>(),
        Fetch: props<{submited: boolean}>(),
        'Fetch success': props<{formulasIdsValues: FormulaIdValue[]}>(),
        'Fetch failure': props<{errors: string}>()
    }
});