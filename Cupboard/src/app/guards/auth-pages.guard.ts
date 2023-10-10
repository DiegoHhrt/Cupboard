import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

const authValidation = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const tokenExists = !!localStorage.getItem('token');

  return authService.validateToken().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated && tokenExists) router.navigate(['/home']);
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};

export const authPagesCanActivateGuard: CanActivateFn = () => authValidation();

export const authPagesCanMatchGuard: CanMatchFn = () => authValidation();
