import {EntityState} from '@ngrx/entity';
import {FormulaIdValue} from './formulasValues.interface';

export interface TotoStateInterface extends EntityState<FormulaIdValue> {
  isSubmitting: boolean;
  formulasIds: string[];
  isLoading: boolean | null;
  // validationErrors: BackendErrorsInterface | null;
  // isLoggedIn: boolean | null;
}
