import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './../../servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  constructor( private auth: AuthService, private router: Router) { }

  salir() {

    // Eliminamos el token del local storage
    this.auth.logout();

    // Redirigimos al usuario a la página del login
    this.router.navigateByUrl( '/login' );
  }
}
