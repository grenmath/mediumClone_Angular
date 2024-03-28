import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {BackendErrorMessages} from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';
import {AuthService} from '../../services/auth.services';
import {authActions} from '../../store/actions';
import {authFeature} from '../../store/reducers';
import {AuthStateInterface} from '../../types/authState.interface';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class RegisterComponent {
  formGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(authFeature.selectIsSubmitting),
    backendErrors: this.store.select(authFeature.selectValidationErrors),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{auth: AuthStateInterface}>,
    private authService: AuthService
  ) {}

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.formGroup.getRawValue(),
    };
    this.store.dispatch(authActions.register({request}));
    this.authService
      .register(request)
      .subscribe((res) => console.log('res: ', res));
  }
}
