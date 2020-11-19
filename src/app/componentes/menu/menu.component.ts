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

  salir() {

    // Eliminamos el token del local storage
    this.auth.logout();

    // Redirigimos al usuario a la página del login
    this.router.navigateByUrl( '/login' );
  }

  // ─────────────── //
  //     SIDEBAR     //
  // ─────────────── //

  abrirSidebar() {
    $( '#sidebar' ).css( 'left', '' );
    this.onAbrirSidebar.emit();
  }
  
  cerrarSidebar() {
    $( '#sidebar' ).css( 'left', '-300px' );
    this.onAbrirSidebar.emit( '0' );
  }

  abrirSubmenu( target: string ) {

    let flecha  = $( `.flecha[data-target=${ target }]` );
    let submenu = $( `.submenu[data-target=${ target }]` );
    let numeroItems = $( `.submenu[data-target=${ target }] > li` ).length;

    // Giramos la flecha
    if ( flecha.hasClass( 'active' )) {
      flecha.css( 'transform', 'translateY(-50%)' );
      flecha.removeClass( 'active' );
    } else {
      flecha.css( 'transform', 'translateY(-50%) rotate(180deg)' );
      flecha.addClass( 'active' );
    }

    // Abrimos o cerramos el submenu
    if ( submenu.hasClass( 'active' )) {
      submenu.css( 'max-height', '' );
      submenu.removeClass( 'active' );
    } else {
      submenu.css( 'max-height', numeroItems * 50+ 'px' );
      submenu.addClass( 'active' );
    }
  }
}
