import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = localStorage.getItem('userRole'); // Get the role from local storage

    if (userRole) {
      // Allow access to routes based on roles
      if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        // Redirect to a default page if the user does not have the required role
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    // No role found, redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
