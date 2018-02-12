import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/mergeMap';
import { Apollo } from 'apollo-angular';

import {
  ConfirmMutation
} from '../../graphql';

import {
  AuthService
} from '../../services';

@Component({
  selector: 'app-confirm-account', 
  templateUrl: './confirm.component.html'
})
export class ConfirmAccountComponent implements OnInit{

  private sub: any;
  public submitted: boolean = false;
  public error: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apollo: Apollo,
    private _authService: AuthService
  ) { }

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
          this._router.navigateByUrl('/account');
        },
        err => {
          this.error = 'Something went awry. Token is either expired or malformed.';
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}