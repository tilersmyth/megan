import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {
  User,
  AuthService
} from '../../shared';

@Component({
  selector: 'app-login', 
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;

  email = new FormControl('', [Validators.required,
    Validators.email]);

  password = new FormControl('', [Validators.required,
    Validators.minLength(3)]); 

  public submitted: boolean = false;
  public error: any = {};

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

  login(model: User, isValid: boolean) {

    this.error = {};

    if(!isValid) return;

    this._authService.login(model.email, model.password).subscribe(
      ({data}) => {
        this._authService.setAuth(data.me);
        this._router.navigateByUrl('/');
      },
      (err) => {
        this.error = err.graphQLErrors[0];
      }
    );
    
  }

}