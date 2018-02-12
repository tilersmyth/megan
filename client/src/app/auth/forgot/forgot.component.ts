import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import {
  User,
  ForgotMutation
} from '../../shared';

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

    if (!isValid) { return };

    return this._apollo.mutate({
      mutation: ForgotMutation,
      "variables": {
        "email": model.email
      }
    })
    .subscribe(
      res => {
        this.forgotForm.reset();
        this.confirm = 'Check your email to reset password.';
      },
      err => {
        console.log(err);
      }
    );
  }

}
