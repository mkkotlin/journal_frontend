import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree>{
    if (this.auth.isLoggedIn()){
      return true;
    }
    else{
      return this.router.createUrlTree([' ']);
    }
  }
}
