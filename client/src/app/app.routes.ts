import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { AccountComponent } from './account';
import { NoContentComponent } from './no-content';

import {
  SignupComponent,
  LoginComponent,
  AuthGuard
} from './auth';

export const ROUTES: Routes = [
  {
    path        : '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  { path: '**',    component: NoContentComponent },
];
