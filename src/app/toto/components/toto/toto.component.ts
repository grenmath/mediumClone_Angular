import {CommonModule} from '@angular/common';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, map} from 'rxjs';
import {TotoService} from '../../services/toto.services';
import {totoActions} from '../../store/actions';
import {
  selectFormulasIds,
  selectFormulasIdsValues,
  selectIsLoading,
  selectIsSubmitting,
} from '../../store/reducers';
import {TotoStateInterface} from '../../types/totoState.interface';

@Component({
  selector: 'mc-toto',
  templateUrl: './toto.component.html',
  styleUrls: ['./toto.component.scss'],
  standalone: true,
  imports: [CommonModule],
  // imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages],
})
export class TotoComponent implements OnInit {
  @Input() userId: string[] | undefined;
  @Input() title: string | undefined;

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

  ngOnInit(): void {
    // this.store.dispatch(totoActions.fetch());
    console.log('this.userId: ', this.userId);
    this.registerFetch();
  }

  private registerFetch() {
    this.store.dispatch(totoActions.register({formulas: this.userId ?? []}));
    
    // useless action since effect listen register action
    // this.store.dispatch(totoActions.fetch({submited: false}));
  }

  dispatchAction(id: string) {
    // push id in this.userId array
    this.userId = this.userId || [];
    this.userId = [...this.userId, id];
    this.registerFetch();
  }
}
