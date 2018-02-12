import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import { Apollo } from 'apollo-angular';

import {
  User,
  AuthService,
  ConfirmMutation,
  ResetMutation
} from '../../shared';

@Component({
  selector: 'app-reset-password', 
  styleUrls: [ './reset.component.scss' ],
  templateUrl: './reset.component.html'
})
export class ResetPasswordComponent implements OnInit{

  private sub: any;
  public submitted: boolean = false;
  public invalid: string;

  resetForm: FormGroup;

  password = new FormControl('', [Validators.required,
    Validators.minLength(3)]); 

  passwordConfirm = new FormControl('', [Validators.required,
    Validators.minLength(3)]); 

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
    },{
      validator: this.passwordMatch
    });
  }

  passwordMatch(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : { 'mismatch': true };
  }

  ngOnInit(){
    this.sub = this._activatedRoute.params
      .flatMap((v: any, index: number) => {
        return this._apollo.mutate({
          mutation: ConfirmMutation,
          "variables": {
            "token": v.token
          }
        })
      })
      .subscribe(
        res => {
          this._authService.setAuth(res.data.confirm.user, res.data.confirm.token);

        },
        err => {
          this.invalid = 'Something went awry. Token is either expired or malformed.';
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  reset(model: User, isValid: boolean) {

    if(!isValid) return;

    return this._apollo.mutate({
      mutation: ResetMutation,
      "variables": {
        "password": model.password
      }
    })
    .subscribe(
      res => {
        this._router.navigateByUrl('/account');
      },
      err => {
        console.log(err);
      }
    );
    
  }

}