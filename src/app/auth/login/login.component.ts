import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';

import { AuthState } from 'src/app/store/auth/auth.state';
import * as AuthActions from '../../store/auth/actions/auth.actions';
/** LoginComponent is responsible for rendering a login form and handling user authentication */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   /** FormGroup for the login form with input validations. */
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
  ) {}
  
  /**
   * Handles the login form submission. Dispatches a login action with email and password
   * if the form is valid.
   */  
  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(AuthActions.login(this.loginForm.getRawValue()));
  }

}