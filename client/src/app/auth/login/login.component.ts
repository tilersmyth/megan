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
  public errors: any = {};

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

    if(!isValid) return;

    this._authService.login(model.email, model.password).subscribe(
      (res) => {
        this._authService.setAuth(res.data.login);
        this._router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
      }
    );
    
  }

}