import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    SignupComponent,
} from './signup';

import {
    LoginComponent,
} from './login';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  providers: []
})
export class AuthModule { }