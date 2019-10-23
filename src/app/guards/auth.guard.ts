import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Servicios
import { AuthService } from './../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ) {}

  canActivate(): boolean {

    if (this.auth.usuarioLogueado() ) {
      return true;
    }
    else {
      this.router.navigateByUrl( 'login' );
      return false;
    }
  }
}
