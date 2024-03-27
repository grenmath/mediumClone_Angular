import {Component, OnDestroy} from '@angular/core';
import { TotoComponent } from '../toto/toto.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TotoStateInterface } from '../../types/totoState.interface';
import { totoActions } from '../../store/actions';

@Component({
  selector: 'mc-dashboard-totos',
  templateUrl: './dashboard-totos.component.html',
  styleUrls: ['./dashboard-totos.component.scss'],
  standalone: true,
  imports: [CommonModule, TotoComponent],
})
export class DashboardTotosComponent implements OnDestroy{

  componentsList: {ids: string[]; name: string}[] = [
    {ids: ['1', '2'], name: 'component1'},
    {ids: ['4', '2'], name: 'component2'},
    {ids: ['5'], name: 'component3'},
    {ids: ['5', '1', '2', '4'], name: 'component4'},
  ];

  addComponent() {
    this.componentsList = [
      ...this.componentsList,
      {ids: ['3'], name: 'component' + (this.componentsList.length + 1)},
    ];
    console.log('this.componentsList: ', this.componentsList);
  }

  constructor(private store: Store<{toto: TotoStateInterface}>) {}

  ngOnDestroy(): void {
    console.log('DashboardTotosComponent destroyed');
    this.store.dispatch(totoActions.cancel());
  }  
  
}
