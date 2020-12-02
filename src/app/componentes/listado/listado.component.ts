import { Component, OnInit, ViewChild } from '@angular/core';

// Get parameter from URL
import { Router, ActivatedRoute } from '@angular/router';

// Interfaces
import { Item } from 'src/app/interfaces/item';

// Servicios
import { AuthService     } from './../../servicios/auth.service';
import { ServicioService } from './../../servicios/servicio.service';

// SweetAlert2
import Swal from 'sweetalert2';

// jQuery
declare var $: any;

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  recuento : number = 0;
  categoria: string = '';
  items    : Item[] = [];

  @ViewChild( 'formulario', { static: true } ) formulario: any;

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService, private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute ) { }
  
  ngOnInit() {

    this.getCategoria();

    // Redirigimos al usuario a la página del login si no hubiera iniciado sesión
    if ( !this.auth.usuarioLogueado() ) {
      this.router.navigateByUrl( '/login' );
    }
  }

  editar( item: Item, categoria: string ) {

    item.categoria = categoria;

    this.formulario.abrirFormulario();
    this.formulario.rellenarFormulario( item );
  }

  eliminar( item: Item, i: number ) {

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

  refrescarListado( categoria: string ) {

    if ( categoria !== this.categoria ) {
      this.router.navigate([ '/diccionario/listado', categoria ]);
    } else {
      this.getListado( categoria );
    }
  }

  // ──────────────── //
  //     BUSCADOR     //
  // ──────────────── //

  buscar( secuencia: string ) {

    let textoIngles  = '';

    secuencia = secuencia.toLowerCase().trim();

    // Recorremos todos los ítems en busca de coincidencias
    $( '.elemento .ingles' ).each( function() {

      textoIngles = $( this ).html().toLowerCase();

      // Si ha habido coincidencias o no se ha escrito nada, mostramos el ítem
      if (( textoIngles.indexOf( secuencia ) > -1 ) || ( secuencia.length === 0 )) {
        $( this ).parent().css( 'display', '' );
      }

      // Si no ha habido coincidencia, ocultamos el ítem
      else {
        $( this ).parent().css( 'display', 'none' );
      }
    });

    // Actualizamos el recuento acorde al número de ítems que satisfacieron la búsqueda
    this.recuento = this.items.length - $( '.elemento:hidden' ).length;

    // En caso de no haber ninguna coincidencia, eliminamos el borde de la tabla para evitar que se vea una raya horizontal
    if ( this.recuento === 0 ) {
      $( '.elementos' ).css( 'border', 'none' );
    }
    else {
      $( '.elementos' ).css( 'border', '' );
    }
  }

  insertar( inputBuscador: HTMLInputElement, secuencia: string ) {

    let item: Item = {
      ingles: secuencia,
      categoria: this.categoria
    }

    // Abrimos el formulario y lo completamos
    this.formulario.abrirFormulario();
    this.formulario.rellenarFormulario( item );

    // Vaciamos el input del buscador
    inputBuscador.value = '';

    // Volvemos a mostrar la tabla al completo
    this.buscar( '' );
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  getCategoria() {
    this.activatedRoute.params.subscribe( parametroURL => {
      this.categoria = parametroURL.categoria;
      this.getListado( this.categoria );
    });
  }
  
  getListado( categoria: string ) {
    this.servicio.getListado( categoria ).subscribe( ( data: Item[] ) => {
      this.items = data.sort( this.ordenarAlfabeticamente('ingles') );
      this.recuento = this.items.length;
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
