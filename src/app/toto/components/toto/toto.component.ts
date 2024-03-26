import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {TotoStateInterface} from '../../types/totoState.interface';
import {TotoService} from '../../services/toto.services';
import {combineLatest, map} from 'rxjs';
import {
  selectFormulasIds,
  selectFormulasIdsValues,
  selectIsLoading,
  selectIsSubmitting,
} from '../../store/reducers';
import {CommonModule} from '@angular/common';
import {totoActions} from '../../store/actions';

@Component({
  selector: 'mc-toto',
  templateUrl: './toto.component.html',
  standalone: true,
  imports: [CommonModule],
  // imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages],
})
export class TotoComponent {
  // formGroup = this.fb.nonNullable.group({
  //   username: ['', Validators.required],
  //   email: ['', Validators.required],
  //   password: ['', Validators.required],
  // });

  @Input() userId: string[] | undefined;

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    isLoading: this.store.select(selectIsLoading),
    formulasIds: this.store.select(selectFormulasIds),
    formulasIdsValues: this.store
      .select(selectFormulasIdsValues)
      .pipe(map((data) => data.filter((p) => this.userId?.includes(p.id)))),
    // backendErrors: this.store.select(selectValidationErrors)
  });

  constructor(
    //   private fb: FormBuilder,
    private store: Store<{toto: TotoStateInterface}>,
    private totoService: TotoService
  ) {}

  ngOnInit() {
    // this.store.dispatch(totoActions.fetch());
    console.log('this.userId: ', this.userId);
    this.store.dispatch(totoActions.register({formulas: this.userId ?? []}));
    this.store.dispatch(totoActions.fetch());
  }

  onSubmitTest() {
    // this.totoService.getToto({userId: this.userId}).subscribe((res) => console.log('res: ', res));
    // const request: RegisterRequestInterface = {
    //   user: this.formGroup.getRawValue(),
    // };
    // this.store.dispatch(authActions.register({request}));
    // this.authService.register(request).subscribe((res) => console.log('res: ', res));
  }
}
