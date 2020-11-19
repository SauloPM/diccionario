import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';

// Servicios
import { AuthService } from './../../servicios/auth.service';

// jQuery
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() onAbrirSidebar: EventEmitter<string>;

  constructor( private auth: AuthService, private router: Router) {
    this.onAbrirSidebar = new EventEmitter();
  }

  abrirSidebar() {
    $( '#sidebar' ).css( 'left', '' );
    this.onAbrirSidebar.emit();
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  cerrarSidebar() {
    $( '#sidebar' ).css( 'left', '-300px' );
    this.onAbrirSidebar.emit( '0' );
  }

  salir() {

    // Eliminamos el token del local storage
    this.auth.logout();

    // Redirigimos al usuario a la página del login
    this.router.navigateByUrl( '/login' );
  }
}
