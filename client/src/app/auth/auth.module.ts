import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  SharedModule
} from '../shared';

import { LoginGuard } from './services';
import { SignupComponent } from './signup';
import { LoginComponent } from './login';
import { ConfirmAccountComponent } from './confirm';
import { ForgotComponent } from './forgot';
import { ResetPasswordComponent } from './reset';

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
  {
    path: 'confirm/:token',
    component: ConfirmAccountComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ConfirmAccountComponent,
    ForgotComponent,
    ResetPasswordComponent
  ],
  providers: [
    LoginGuard
  ]
})
export class AuthModule { }
