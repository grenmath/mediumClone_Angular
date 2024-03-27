import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {PersistanceService} from './shared/services/persistance.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls : ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
})
export class AppComponent {
  title = 'mediumClone_Angular';
  token = this.persistanceService.get('accessToken');
  constructor(private persistanceService: PersistanceService) {}

  goRegister() {

  }

  goDashboard() {
  }  
}
