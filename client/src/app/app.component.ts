/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from 'environments/environment';
import { AppState } from './app.service';

import {
  User,
  AuthService
} from './shared';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Index
      </a>
      <a [routerLink]=" ['./home'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Home
      </a>
      <a [routerLink]=" ['./detail'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Detail
      </a>
      <a [routerLink]=" ['./barrel'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Barrel
      </a>
      <a [routerLink]=" ['./about'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        About
      </a>
      <a *ngIf="showDevModule" [routerLink]=" ['./dev-module'] "
         routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        DevModule
      </a>

      <div class="nav-right" *ngIf="!currentUser.id">
        <a [routerLink]=" ['./signup'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Sign up
        </a>
        <a [routerLink]=" ['./login'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Login
        </a>
      </div>
      <div class="nav-right" *ngIf="currentUser.id">
        <a [routerLink]=" ['./account'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Account
        </a>
        <a href="javascript:;" (click)="logout()"
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Hi {{currentUser.first_name}},  logout 
        </a>
      </div>

    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <span>Angular Starter by <a [href]="twitter">@gdi2290</a></span>
      <div>
        <a [href]="url">
          <img [src]="tipe" width="25%">
        </a>
      </div>
    </footer>
  `
})
export class AppComponent implements OnInit {
  public name = 'Angular Starter';
  public tipe = 'assets/img/tipe.png';
  public twitter = 'https://twitter.com/gdi2290';
  public url = 'https://tipe.io';
  public showDevModule: boolean = environment.showDevModule;

  public currentUser: User = new User();

  constructor(
    public appState: AppState,
    private _authService: AuthService,
    private _router: Router
  ) {
    _authService.currentUser.subscribe(
      (user) => this.currentUser = user,
      (err) => console.log(err)
    )
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  public logout(){
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
