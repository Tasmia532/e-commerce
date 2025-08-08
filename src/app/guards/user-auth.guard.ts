import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const userAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAdmin$.pipe(
    take(1),
    map(isAdmin => {
      if (!isAdmin) {
        return true; // ✅ Allow non-admins
      } else {
        router.navigate(['/dashboard']); // ❌ Block admin, redirect
        return false;
      }
    })
  );
};
