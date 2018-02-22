import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import {
  ForgotMutation
} from '../../graphql';

import {
  User
} from '../../models';

import {
  AuthService
} from '../../services';

@Component({
  selector: 'app-forgot',
  styleUrls: [ './forgot.component.scss' ],
  templateUrl: './forgot.component.html'
})
export class ForgotComponent {

  public forgotForm: FormGroup;

  public email = new FormControl('', [Validators.required,
    Validators.email]);

  public submitted: boolean = false;
  public error: any = {};
  public confirm: string;

  constructor(
    private _fb: FormBuilder,
    private _apollo: Apollo
  ) {
    this.forgotForm = _fb.group({
      email: this.email
    });
  }

  public forgot(model: User, isValid: boolean) {

    this.error = {};

    if (!isValid) { return; }

    return this._apollo.mutate({
      mutation: ForgotMutation,
      /* tslint:disable */
      "variables": {
        "email": model.email
      }
      /* tslint:enable */
    })
    .subscribe(
      (res) => {
        this.forgotForm.reset();
        this.confirm = 'Check your email to reset password.';
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
