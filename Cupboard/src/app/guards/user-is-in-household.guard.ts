import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, combineLatest, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { HouseholdInfoService } from '../services/';

const HouseholdValidation = (): Observable<boolean> => {
  const householdService = inject(HouseholdInfoService);
  const router = inject(Router);
  let isRequestSuccessful: boolean = false;

  return householdService.getSelf().pipe(
    map(({ ok }) => {
      if (!ok) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  );
};

export const isUserInHouseholdCanActivate: CanActivateFn =
  (): Observable<boolean> => HouseholdValidation();

export const isUserInHouseholdCanMatch: CanMatchFn = (): Observable<boolean> =>
  HouseholdValidation();
