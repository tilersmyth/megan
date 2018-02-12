import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginGuard } from './services';

import {
  SignupComponent,
  LoginComponent,
  ConfirmAccountComponent,
  ForgotComponent,
  ResetPasswordComponent
} from './pages';

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
export class AuthModule {}
