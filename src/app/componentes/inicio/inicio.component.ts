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
    $( '#contenido' ).css( 'margin-left', margenIzquierdo );
  }
}
