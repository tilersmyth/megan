import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  SharedModule
} from '../shared';

import { LoginGuard } from './services';
import { SignupComponent } from './signup';
import { LoginComponent } from './login';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  providers: [
    LoginGuard
  ]
})
export class AuthModule { }