import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public loginForm: FormGroup;

  public email = new FormControl('', [
    Validators.required,
    Validators.pattern('[^ @]*@[^ @]*'),
    Validators.email]);

  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(5)]);

  public submitted: boolean = false;
  public error: any = {};
  public confirm: string;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) {
    this.loginForm = _fb.group({
      email: this.email,
      password: this.password
    });
  }

  public login(model: User, isValid: boolean) {

    this.error = {};

    if (!isValid) { return; }

    this._authService.login(model).subscribe(
      (auth) => {

        if (!auth) {
          this.loginForm.reset();
          this.confirm = 'This account has not been activated. Check your email!';
          return;
        }

        this._router.navigateByUrl('/account');
      },
      (err) => {
        this.error = err.graphQLErrors[0];
      }
    );

  }

}
