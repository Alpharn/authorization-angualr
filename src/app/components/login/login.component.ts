import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/auth.reducer';

import { login } from 'src/app/store/actions/auth.actions';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private store: Store<AppState>,
  ) {}

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.store.dispatch(login({ email, password }));
  }

}