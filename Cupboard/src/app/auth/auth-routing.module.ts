import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        // canLoad: [ RegisterLoginGuard ],
        // canActivate: [ RegisterLoginGuard ],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        // canLoad: [ RegisterLoginGuard ],
        // canActivate: [ RegisterLoginGuard ],
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
