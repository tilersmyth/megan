import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    
    constructor(private _authService: AuthService, private _router: Router) {}
    
    canActivate(): boolean {
        return !this._authService.isLoggedIn;
    }

}
