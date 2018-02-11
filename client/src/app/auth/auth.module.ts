import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  SharedModule
} from '../shared';

import { LoginGuard } from './services';
import { SignupComponent } from './signup';
import { LoginComponent } from './login';
import { ConfirmAccountComponent } from './confirm';

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
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ConfirmAccountComponent
  ],
  providers: [
    LoginGuard
  ]
})
export class AuthModule { }
