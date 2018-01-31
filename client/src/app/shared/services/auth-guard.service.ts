import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/take";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private _authService: AuthService, private _router: Router) {}
    
    canActivate(): Observable<boolean> {
        return this._authService.isAuthenticated.map((auth) => {
      
            return auth;

        }).take(1);
    }

}
