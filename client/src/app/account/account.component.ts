import {
  Component,
  OnInit
} from '@angular/core';

import {
  User,
  AuthService
} from '../shared';

@Component({
  selector: 'account',
  styles: [`
  `],
  template: `
    <h1>Account</h1>
    <div>
      Current user object:
    </div>
    <div>
      <h3>
      <pre>{{ currentUser | json }}</pre>
      </h3>
    </div>
  `
})
export class AccountComponent implements OnInit {

  public currentUser: User = new User();

  constructor(
    private _authService: AuthService
  ) {}

  public ngOnInit() {
    
    this._authService.currentUser.subscribe(
      (user) => this.currentUser = user,
      (err) => console.log(err)
    )

    console.log('hello `Account` component');
  }

}
