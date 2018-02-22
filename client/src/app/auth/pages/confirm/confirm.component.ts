import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
export class ConfirmAccountComponent implements OnInit, OnDestroy {

  public submitted: boolean = false;
  public error: string;
  private sub: any;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apollo: Apollo,
    private _authService: AuthService
  ) { }

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
          this._router.navigateByUrl('/account');
        },
        (err) => {
          this.error = 'Something went awry. Token is either expired or malformed.';
        }
      );
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
