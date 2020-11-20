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

    let submenu     = $( `.submenu[data-target=${ target }]` );
    let numeroItems = $( `.submenu[data-target=${ target }] > li` ).length;

    // Hemos seleccionado un submenú de primer nivel
    if ( submenu.hasClass( 'primer-nivel' )) {

      // Cerrar submenú
      if ( submenu.hasClass( 'active' )) {
        submenu.css( 'max-height', '' );
        submenu.removeClass( 'active' );
      }
      
      // Abrir submenú
      else {
        submenu.css( 'max-height', numeroItems * 50+ 'px' );
        submenu.addClass( 'active' );
      }

      // Si el submenú de primer nivel seleccionado contuviera submenús de segundo nivel, los cerraríamos
      for( let submenuHijo of submenu.children() ) {
        if ( submenuHijo.lastChild.className.indexOf( 'submenu' ) !== -1 ) {
          submenuHijo.lastChild.style.maxHeight = '';
          submenuHijo.lastChild.className = 'submenu segundo-nivel';
        }
      }
    }

    // Hemos seleccionado un submenú de segundo nivel
    else {

      let submenuPadre = submenu.closest( '.primer-nivel' );
      let totalItems   = submenuPadre.children.length;

      if ( submenu.hasClass( 'active' )) {
        submenu.removeClass( 'active' );
      }
      else {
        submenu.addClass( 'active' );
      }

      for( let submenuHijo of submenuPadre.children() ) {
        if ( submenuHijo.lastChild.className.indexOf( 'active' ) !== -1 ) {
          totalItems = totalItems + submenuHijo.lastChild.children.length;
        }
      }

      if ( submenu.hasClass( 'active' )) {
        submenu.css( 'max-height', numeroItems * 50+ 'px' );
      } else {
        submenu.css( 'max-height', '' );
      }

      submenuPadre.css( 'max-height', totalItems * 50+ 'px' );
    }
  }
}