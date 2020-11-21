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

  buscar( secuencia: string ) {

    let textoIngles  = '';

    secuencia = secuencia.toLowerCase().trim();

    $( '.elemento .ingles' ).each( function() {

      textoIngles = $( this ).html().toLowerCase();

      // Ha habido coincidencias o no se ha escrito nada
      if (( textoIngles.indexOf( secuencia ) > -1 ) || ( secuencia.length === 0 )) {
        $( this ).parent().css( 'display', '' );
      }

      // No ha habido coincidencia
      else {
        $( this ).parent().css( 'display', 'none' );
      }
    });

    this.recuento = this.items.length - $( '.elemento:hidden' ).length;
  }

  editar( item: Item, categoria: string ) {

    item.categoria = categoria;

    this.formulario.minimizarFormulario();
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
