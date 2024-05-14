import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// This is a standalone version of the auth guard function
export const authGuard: CanActivateFn = (route, state) => {
  // Access the router using Angular's inject function
  const router = inject(Router);

  // Check if running in a browser environment
  if (typeof window !== 'undefined') {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
      // Use the router to navigate to the login page
      router.navigate(['/login']);
      return false;
    }
    return true;
  } else {
    // If not in a browser environment, you can decide to return false or handle as needed
    return false;
  }
};
