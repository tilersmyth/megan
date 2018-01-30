import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';

import { Apollo } from 'apollo-angular';
import * as decode from 'jwt-decode';

import { JwtService } from './jwt.service';

import { User } from '../models';

import { 
  SignupMutation,
  LoginMutation 
} from '../graphql';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean = false;

  private _currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this._currentUserSubject.asObservable().distinctUntilChanged();

  constructor(
    private apollo: Apollo,
    private _jwtService: JwtService
  ) {

    this.apollo = apollo;

    if(_jwtService.getToken()){
      this.setAuth(_jwtService.getToken());
    } else { 
      this.logout(); 
    }

  }

  setAuth(token: string) {
    this._jwtService.saveToken(token);
    const payload = decode(token);
    this._currentUserSubject.next(payload.user);
    this.isLoggedIn = true;
  }

  signup(email: string, password: string) {
    return this.apollo.mutate({
      mutation: SignupMutation,
      variables: {
        "email": email,
        "password": password
      }
    });
  }

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: LoginMutation,
      variables: {
        "email": email,
        "password": password
      }
    });
  }

  logout() {
    this._jwtService.deleteToken();    
    this._currentUserSubject.next(new User());
    this.isLoggedIn = false;
  }

}