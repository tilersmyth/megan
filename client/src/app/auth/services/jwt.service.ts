import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  constructor(){}

  getToken(): string {
    return window.localStorage['token'];
  }

  saveToken(token: string) {
    window.localStorage['token'] = token;
  }

  deleteToken() {
    window.localStorage.removeItem('token');
  }

}