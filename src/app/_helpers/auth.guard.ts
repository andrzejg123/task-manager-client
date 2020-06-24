import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import {ObjectsComponent} from '../manager/objects/objects.component';
import {tap} from 'rxjs/operators';
import {User} from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser = this.authenticationService.currentUserValue;

    if (this.authenticationService.isUserLoggedIn) {

      if(state.url === '/objects' && currentUser.roleCode !== 'MAN') {
        this.router.navigate(['/not-authorized'], {skipLocationChange: true});
        return false;
      }

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }


}
