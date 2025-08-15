import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const userAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.currentUser$.pipe( // your AuthService should expose currentUser$
    take(1),
    map((user: any) => {
      if (!user) {
        // not logged in
        router.navigate(['/login']);
        return false;
      }
      if (user.isAdmin) {
        // admin → redirect to dashboard
        router.navigate(['/dashboard']);
        return false;
      }
      // normal logged-in user → allow
      return true;
    })
  );
};
