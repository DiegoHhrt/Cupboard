import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

const authVerification = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        localStorage.removeItem('token');
        router.navigate(['/auth']);
      }
    })
  );
};

export const tokenValidationCanActivateGuard: CanActivateFn =
  (): Observable<boolean> => authVerification();
export const tokenValidationCanMatchGuard: CanMatchFn =
  (): Observable<boolean> => authVerification();
