import { NgForm    } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Servicios
import { ServicioService } from './../../servicios/servicio.service';

// Interfaces
import { Item } from 'src/app/interfaces/item';

// SweetAlert2
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';

// jQuery
declare var $: any;

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  estadoFormulario     : string;
  textoCierreFormulario: string;
  categoriaOriginal    : string = '';

  item: Item = { id: '', ingles: '', castellano: '', categoria: 'palabras' };

  @Output() onModificarListado: EventEmitter<string>;

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService ) {
    this.onModificarListado = new EventEmitter();
  }

  ngOnInit() {

    this.estadoFormulario = localStorage.getItem( 'estado-formulario' );

    console.log( this.estadoFormulario );

    if ( isNullOrUndefined( this.estadoFormulario ) ) {
      this.estadoFormulario = 'abierto';
    }

    if ( this.estadoFormulario === 'abierto' ) {
      this.abrirFormulario( 0 );
    }
    else {
      this.cerrarFormulario( 0 );
    }
  }

  guardar( formulario: NgForm ) {

    // Comprobamos que no haya campos obligatorios vacíos
    if ( this.existenCamposVacios( formulario ) ) {
      this.vaciarFormulario();
      return;
    }

    // Loading
    Swal.fire({
      title: 'Espere',
      text: 'Procesando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.sanitize( this.item );

    // Ejecutamos la consulta según el caso
    if ( this.item.id === '' ) {
      this.crearItem();
    }
    else {
      this.modificarItem();
    }
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  crearItem() {  

    this.servicio.getRepetido( this.item ).subscribe( ( resultado: any ) => {

      // ¿Elemento repetido?
      if ( resultado.length > 0 ) {

        // Notificamos al usuario
        Swal.fire({
          title: 'Se ha producido un error',
          text: 'Ya existe un ítem con ese valor',
          type: 'error',
          timer: 1500,
          padding: '50px',
          showConfirmButton: false,
          allowOutsideClick: true
        });
      }
      else {
        this.servicio.crear( this.item ).subscribe( () => {
          this.notificarUsuario();
        });
      }
    });
  }

  modificarItem() {

    this.servicio.eliminar( this.categoriaOriginal, this.item.id ).subscribe( () => {
      this.servicio.crear( this.item ).subscribe( () => {
        this.notificarUsuario();
      });
    });
  }

  notificarUsuario() {

    // Notificamos al usuario
    Swal.fire({
      title: 'Operación completada',
      text: 'Operación completada con éxito',
      type: 'success',
      timer: 1000,
      padding: '50px',
      showConfirmButton: false,
      allowOutsideClick: true
    }).then( () => {
      this.vaciarFormulario();
      this.onModificarListado.emit( this.item.categoria );
    });
  }

  // ──────────────────── //
  //     VALIDACIONES     //
  // ──────────────────── //

  existenCamposVacios( formulario: NgForm ): boolean {

    let inputIngles     = document.querySelector('.entrada input[name="ingles"]'    ) as HTMLInputElement;
    let inputCastellano = document.querySelector('.entrada input[name="castellano"]') as HTMLInputElement;

    let existenCamposVacios: boolean = formulario.invalid || inputIngles.value.trim() === '' || inputCastellano.value.trim() === '' ? true : false;

    if ( existenCamposVacios ) {
      Swal.fire({
        title: 'Se ha producido un error',
        text: 'Es posible que haya dejado campos obligatorios vacíos',
        type: 'error',
        timer: 1500,
        padding: '50px',
        showConfirmButton: false,
        allowOutsideClick: true
      });
    }

    return existenCamposVacios;
  }

  sanitize( item: Item ) {
    
    // Eliminamos los espacios sobrantes del principio y del final
    item.ingles    .trim();
    item.castellano.trim();

    // Eliminamos el resto de espacios sobrantes
    item.ingles    .replace( /\s+/g, ' ' );
    item.castellano.replace( /\s+/g, ' ' );

    // Eliminamos los símbolos '¡' y '¿' del texto en inglés porque en inglés no se utilizan
    item.ingles.replace( /[^a-zA-Z!?()' ]/g, '' );

    // Si se trata de un verbo y no empieza por "To", lo escribimos
    if ( item.categoria === 'verbos' && item.ingles.search(/to/i) !== 0 ) {
      item.ingles = `To ${ item.ingles }`;
    }

    // Pasamos la primera letra a mayúscula
    item.ingles    .replace( item.ingles    [0], item.ingles    [0].toUpperCase() );
    item.castellano.replace( item.castellano[0], item.castellano[0].toUpperCase() );
  }

  // ────────────────── //
  //     FORMULARIO     //
  // ────────────────── //

  rellenarFormulario( item: Item ) {
    this.item.id           = item.id;
    this.item.ingles       = item.ingles;
    this.item.castellano   = item.castellano;
    this.item.categoria    = item.categoria;
    this.categoriaOriginal = item.categoria;
  }

  vaciarFormulario() {
    this.item.id           = '';
    this.item.ingles       = '';
    this.item.castellano   = '';
  }

  cambiarCategoria( categoria: string ) {
    this.item.categoria = categoria;
  }

  minimizarFormulario() {

    if ( this.estadoFormulario === 'abierto' ) {
      this.cerrarFormulario();
    } else {
      this.abrirFormulario();
    }
  }

  abrirFormulario( duracionAnimacion: number = 250 ) {

    // Animación
    $( '.formulario' ).animate({
      bottom: '',
    }, duracionAnimacion, () => {
      this.textoCierreFormulario = 'Cerrar formulario';
    });

    // Ponemos estas dos instrucciones aquí en lugar de en la función 'minimizarFormulario()' porque cuando se edita un ítem del listado, se llama a esta función
    // Si no pusiéramos estas dos instrucciones aquí, sino en la función 'minimizarFormulario()', al editar un ítem del listado e invocar esta función, el formulario no se abriría si estuviera cerrado
    this.estadoFormulario = 'abierto';
    localStorage.setItem( 'estado-formulario', this.estadoFormulario );
  }

  cerrarFormulario( duracionAnimacion: number = 250 ) {

    let alturaFormulario = $( '.formulario' ).outerHeight();

    // Animación
    $( '.formulario' ).animate({
      bottom: '-' + alturaFormulario + 'px',
    }, duracionAnimacion, () => {
      this.textoCierreFormulario = 'Abrir formulario';
    });

    this.estadoFormulario = 'cerrado';
    localStorage.setItem( 'estado-formulario', this.estadoFormulario );
  }
}
