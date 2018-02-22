import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  public getToken(): string {
    return window.localStorage['token'];
  }

  public saveToken(token: string) {
    window.localStorage['token'] = token;
  }

  public deleteToken() {
    window.localStorage.removeItem('token');
  }

}
