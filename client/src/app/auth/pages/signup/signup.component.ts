import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'app-signup',
  styleUrls: [ './signup.component.scss' ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  public signupForm: FormGroup;
  public firstName = new FormControl('', [Validators.required]);
  public lastName = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required,
    Validators.email]);
  public password = new FormControl('', [Validators.required,
    Validators.minLength(3)]);
  public passwordConfirm = new FormControl('', [Validators.required,
    Validators.minLength(3)]);

  public submitted: boolean = false;
  public error: any = {};
  public confirm: string;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) {

    this.signupForm = _fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    },
    {
      validator: this.passwordMatch
    });

  }

  public signup(model: User, isValid: boolean) {

    this.error = {};

    if (!isValid) { return; }

    this._authService.signup(model).subscribe(
      (auth) => {

        if (!auth) {
          this.signupForm.reset();
          this.confirm = 'Check your email to activate this account!';
          return;
        }

        this._router.navigateByUrl('/account');
      },
      (err) => {
        this.error = err.graphQLErrors[0];
      }
    );
  }

  private passwordMatch(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : { mismatch : true };
  }

}
