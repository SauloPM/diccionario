import { Component } from '@angular/core';

// jQuery
declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent {

  constructor() { }

  abrirSidebar( margenIzquierdo: string = '' ) {

    let anchoViewport = window.innerWidth;

    if ( anchoViewport > 576 ) {

      $( '.contenido' ).css( 'margin-left', margenIzquierdo );

      if ( margenIzquierdo === '' ) {
        $( '.formulario' ).css( 'left', '' );
      } else {
        $( '.formulario' ).css( 'left', '0' );
      }
    }
  }
}
