import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { PersistanceService } from './shared/services/persistance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
})
export class AppComponent {
  title = 'mediumClone_Angular';

  token = this.persistanceService.get('accessToken');

  constructor(private persistanceService: PersistanceService) {

  }
}
