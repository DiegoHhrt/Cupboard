import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthComponent } from './pages/auth/auth.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
