import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {
    User,
    AuthService
} from '../../shared';

@Component({
  selector: 'app-signup', 
  styleUrls: [ './signup.component.scss' ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  signupForm: FormGroup;

  email = new FormControl('', [Validators.required,
    Validators.email]);

  password = new FormControl('', [Validators.required,
    Validators.minLength(3)]); 

  passwordConfirm = new FormControl('', [Validators.required,
    Validators.minLength(3)]);   

  public submitted: boolean = false;
  public error: any = {};

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { 

    this.signupForm = _fb.group({
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    },{
      validator: this.passwordMatch
    });

  }

  passwordMatch(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : { 'mismatch': true };
  }

  signup(model: User, isValid: boolean) {

    this.error = {};

    if(!isValid) return;

    this._authService.signup(model.email, model.password).subscribe(
      ({data}) => {
        this._authService.setAuth(data.me);
        this._router.navigateByUrl('/account');
      },
      (err) => {
        this.error = err.graphQLErrors[0];
      }
    );
    
  }

}