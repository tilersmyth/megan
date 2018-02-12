import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/take";

import { AuthService } from '../services';

@Injectable()
export class LoginGuard implements CanActivate {
    
    constructor(private _authService: AuthService) {}
    
    canActivate(): Observable<boolean> {
        return this._authService.isAuthenticated.map((auth) => {
      
            return !auth;

        }).take(1);
    }

}
