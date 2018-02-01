import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map'

import { Apollo } from 'apollo-angular';

import { JwtService } from './jwt.service';

import { User } from '../models';

import { 
  SignupMutation,
  LoginMutation,
  GetCurrentUser
} from '../graphql';

@Injectable()
export class AuthService {

  private _currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this._currentUserSubject.asObservable().distinctUntilChanged();

  private _isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this._isAuthenticatedSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private _jwtService: JwtService
  ) {

    this.apollo = apollo;

    if(_jwtService.getToken()){
      this.getCurrentUser().subscribe(
        ({data}) => this.setAuth(data.me),
        (err) => this.logout()
      );
    } else { 
      this.logout(); 
    }

  }

  setAuth(user: User) {

    if(!user){
      this.logout();
      return;
    }

    this._currentUserSubject.next(user);
    this._isAuthenticatedSubject.next(true);
  }

  signup(email: string, password: string) {
    return this.apollo.mutate({
      mutation: SignupMutation,
      variables: {
        "email": email,
        "password": password
      }
    })
    .map(
      res => {
        this._jwtService.saveToken(res.data.register);
        return this.getCurrentUser();
      }, 
      err => this.logout()
    )
    .flatMap(
      data => { return data;}
    );
  }

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: LoginMutation,
      variables: {
        "email": email,
        "password": password
      }
    })
    .map(
      res => {
        this._jwtService.saveToken(res.data.login);
        return this.getCurrentUser();
      }, 
      err => this.logout()
    )
    .flatMap(
      data => { return data;}
    );
  }

  logout() {
    this._jwtService.deleteToken();    
    this._currentUserSubject.next(new User());
    this._isAuthenticatedSubject.next(false);
  }

  getCurrentUser(){
    return this.apollo.watchQuery<any>({
      query: GetCurrentUser
    }).valueChanges;
  }

}