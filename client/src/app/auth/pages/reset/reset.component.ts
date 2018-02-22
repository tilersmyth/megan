import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import { Apollo } from 'apollo-angular';

import {
  ConfirmMutation,
  ResetMutation
} from '../../graphql';

import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'app-reset-password',
  styleUrls: [ './reset.component.scss' ],
  templateUrl: './reset.component.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public submitted: boolean = false;
  public invalid: string;
  public resetForm: FormGroup;
  public password = new FormControl('', [Validators.required,
    Validators.minLength(3)]);
  public passwordConfirm = new FormControl('', [Validators.required,
    Validators.minLength(3)]);
  private sub: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apollo: Apollo,
    private _authService: AuthService,
    private _fb: FormBuilder
  ) {
    this.resetForm = _fb.group({
      password: this.password,
      passwordConfirm: this.passwordConfirm
    },
    {
      validator: this.passwordMatch
    });
  }

  public ngOnInit() {
    this.sub = this._activatedRoute.params
      .flatMap((v: any, index: number) => {
        return this._apollo.mutate({
          mutation: ConfirmMutation,
          /* tslint:disable */
          "variables": {
            "token": v.token
          }
          /* tslint:enable */
        });
      })
      .subscribe(
        (res) => {
          this._authService.setAuth(res.data.confirm.user, res.data.confirm.token);

        },
        (err) => {
          this.invalid = 'Something went awry. Token is either expired or malformed.';
        }
      );
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public reset(model: User, isValid: boolean) {

    if (!isValid) { return; }

    return this._apollo.mutate({
      mutation: ResetMutation,
      /* tslint:disable */
      "variables": {
        "password": model.password
      }
      /* tslint:enable */
    })
    .subscribe(
      (res) => {
        this._router.navigateByUrl('/account');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private passwordMatch(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : { mismatch : true };
  }

}
