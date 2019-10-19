import { Component, AfterViewInit } from '@angular/core';

// URL Parameters
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Item } from 'src/app/interfaces/item';

// Servicios
import { ServicioService } from './../../servicios/servicio.service';

// jQuery
declare var $: any;

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements AfterViewInit {

  categoria: string = '';
  items: Item[] = [];

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService, private router: ActivatedRoute ) {
    this.getCategoria();
  }

  ngAfterViewInit() {

    // Escribir algo en el buscador
    $(document).on("input", ".buscador input", function () {
      
      var textoIngles  = "";
      var secuencia    = $(".buscador input").val().toLowerCase().trim();

      $(".elemento .ingles").each(function () {

        textoIngles = $(this).html().toLowerCase();

          // Ha habido coincidencias o no se ha escrito nada
          if (( textoIngles.indexOf( secuencia ) > -1 ) || ( secuencia.length == 0 )) {
            $(this).parent().css("display", "");
          }

          // No ha habido coincidencia
          else {
            $(this).parent().css("display", "none");
          }
      });
    });
  }
  
  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  getCategoria() {
    this.router.params.subscribe( parametroURL => {
      this.categoria = parametroURL['categoria'];
      this.getListado( this.categoria );
    });
  }

  getListado( categoria: string ) {
    this.servicio.getListado( categoria ).subscribe( ( data: Item[] ) => {
      this.items = data.sort( this.ordenarAlfabeticamente('ingles') );
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
