import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PersistanceService} from './shared/services/persistance.service';
import {CommonModule} from '@angular/common';
import {TotoComponent} from './toto/components/toto/toto.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TotoComponent],
})
export class AppComponent {
  title = 'mediumClone_Angular';
  token = this.persistanceService.get('accessToken');
  componentsList: {ids: string[]; name: string}[] = [
    {ids: ['1', '2'], name: 'component1'},
    {ids: ['4', '2'], name: 'component2'},
    {ids: ['5'], name: 'component3'},
    {ids: ['5', '1', '2', '4', '3'], name: 'component4'},
  ];

  constructor(private persistanceService: PersistanceService) {}

  addComponent() {
    this.componentsList = [
      ...this.componentsList,
      {ids: ['3'], name: 'component' + (this.componentsList.length + 1)},
    ];
    console.log('this.componentsList: ', this.componentsList);
  }
}
