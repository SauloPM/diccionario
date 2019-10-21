import { Component, AfterViewInit } from '@angular/core';

// Get parameter from URL
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Item } from 'src/app/interfaces/item';

// Servicios
import { ServicioService } from './../../servicios/servicio.service';

// SweetAlert2
import Swal from 'sweetalert2';

// jQuery
declare var $: any;

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements AfterViewInit {

  items    : Item[] = [];
  categoria: string = '';

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService, private router: ActivatedRoute ) {
    this.getCategoria();
  }

  ngAfterViewInit() {

    // Escribir algo en el buscador
    $(document).on('input', '.buscador input', function() {

      let textoIngles  = '';
      let secuencia    = $('.buscador input').val().toLowerCase().trim();

      $('.elemento .ingles').each( () => {

        textoIngles = $(this).html().toLowerCase();

        // Ha habido coincidencias o no se ha escrito nada
        if (( textoIngles.indexOf( secuencia ) > -1 ) || ( secuencia.length === 0 )) {
          $(this).parent().css('display', '');
        }

        // No ha habido coincidencia
        else {
          $(this).parent().css('', 'none');
        }
      });
    });
  }

  borrar( item: Item, i: number ) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no puede deshacerse',
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then( decisionUsuario => {
      if ( decisionUsuario.value ) {
        this.items.splice( i, 1 );
        this.servicio.eliminar( this.categoria, item.id ).subscribe();
      }
    });
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  getCategoria() {
    this.router.params.subscribe( parametroURL => {
      this.categoria = parametroURL.categoria;
      this.getListado( this.categoria );
    });
  }

  getListado( categoria: string ) {
    this.servicio.getListado( categoria ).subscribe( ( data: Item[] ) => {
      this.items = data.sort( this.ordenarAlfabeticamente('ingles') );
    });
  }

  ordenarAlfabeticamente( property: any ) {

    let sortOrder = 1;

    if ( property[0] === '-' ) {
      sortOrder = -1;
      property = property.substr(1);
    }

    return ( a: any, b: any ) => {
      if ( sortOrder === -1 ) {
        return b[property].localeCompare( a[property] );
      } else {
        return a[property].localeCompare( b[property] );
      }
    };
  }
}
