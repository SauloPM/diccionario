import { Component } from '@angular/core';

// Modelos
import { ElementoModel } from './../../modelos/elemento.models';

// Servicios
import { ServicioService } from './../../servicios/servicio.service';

@Component({
  selector: 'app-palabras',
  templateUrl: './palabras.component.html',
  styleUrls: ['./palabras.component.scss']
})
export class PalabrasComponent {

  palabras: ElementoModel[] = [];

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService ) {
    this.renderizarListado();
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  renderizarListado() {
    this.servicio.getPalabras().subscribe( ( data: any[] ) => {
      this.palabras = data.sort( this.ordenarAlfabeticamente('ingles') );
    });
  }

  ordenarAlfabeticamente( property: any ) {

    var sortOrder = 1;

    if ( property[0] === '-' ) {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function ( a: any, b: any ) {
        if ( sortOrder == -1 ) {
          return b[property].localeCompare( a[property] );
        }
        else {
          return a[property].localeCompare( b[property] );
        }        
    }
  }
}
