import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  tokenValidationCanActivateGuard,
  tokenValidationCanMatchGuard,
} from './guards/token-validation.guard';
import {
  isUserInHouseholdCanActivate,
  isUserInHouseholdCanMatch,
} from './guards/user-is-in-household.guard';
import {
  authPagesCanActivateGuard,
  authPagesCanMatchGuard,
} from './guards/auth-pages.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canMatch: [authPagesCanActivateGuard],
    canActivate: [authPagesCanMatchGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [tokenValidationCanActivateGuard],
    canMatch: [tokenValidationCanMatchGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [tokenValidationCanActivateGuard],
    canMatch: [tokenValidationCanMatchGuard],
  },
  {
    path: 'household',
    loadChildren: () =>
      import('./household/household.module').then((m) => m.HouseholdModule),
    canActivate: [
      tokenValidationCanActivateGuard,
      isUserInHouseholdCanActivate,
    ],
    canMatch: [tokenValidationCanMatchGuard, isUserInHouseholdCanMatch],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
