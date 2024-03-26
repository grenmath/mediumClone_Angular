import { FormulaIdValue } from "./formulasValues.interface";

export interface TotoStateInterface {
  isSubmitting: boolean;
  formulasIds: string[];
  formulasIdsValues: FormulaIdValue[];
  isLoading: boolean | null;
  // validationErrors: BackendErrorsInterface | null;
  // isLoggedIn: boolean | null;
}