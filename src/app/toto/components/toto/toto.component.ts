import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, switchMap} from 'rxjs';
import {totoActions} from '../../store/actions';
import {totoFeature} from '../../store/reducers';
import {TotoStateInterface} from '../../types/totoState.interface';

@Component({
  selector: 'mc-toto',
  templateUrl: './toto.component.html',
  styleUrls: ['./toto.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TotoComponent implements OnInit {
  private readonly userIdsSubject = new BehaviorSubject<string[]>([]);

  @Input()
  get userId(): string[] {
    return this.userIdsSubject.value;
  }
  set userId(ids: string[]) {
    this.userIdsSubject.next(ids);
  }

  @Input() title: string | undefined;

  data$ = combineLatest({
    isSubmitting: this.store.select(totoFeature.selectIsSubmitting),
    isLoading: this.store.select(totoFeature.selectIsLoading),
    formulasIds: this.store.select(totoFeature.selectFormulasIds),
    formulasIdsValues: this.userIdsSubject.pipe(
      switchMap((ids) => this.store.select(totoFeature.selectFormulaByIds(ids)))
    ),
    // backendErrors: this.store.select(selectValidationErrors)
  });

  constructor(private store: Store<{toto: TotoStateInterface}>) {}

  ngOnInit(): void {
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
    this.userId = [...this.userId, id];
    this.registerFetch();
  }
}
