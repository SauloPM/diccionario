import { Component } from '@angular/core';

// Interfaces
import { Item } from 'src/app/interfaces/item';

// Manejo de formularios
import { NgForm } from '@angular/forms';

// Servicios
import { ServicioService } from './../../servicios/servicio.service';

// SweetAlert2
import Swal from 'sweetalert2';

// Observables
import { Observable } from 'rxjs';

// Get parameter from URL
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {

  id       : string = '';
  titulo   : string = '';
  operacion: string = '';
  categoria: string = 'palabras';
  categoriaOriginal: string = '';

  item : Item   = { ingles: '', castellano: '' };

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService, private router: Router, private activatedRoute: ActivatedRoute ) {
    this.getParametrosURL();
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

    // Ejecutamos la consulta según el caso
    if ( this.operacion === 'crear' ) {
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
    this.servicio.crear( this.categoria, this.item ).subscribe( data => {
      this.notificarUsuario();
    });
  }

  modificarItem() {
    this.servicio.eliminar( this.categoriaOriginal, this.id ).subscribe( () => {
      this.servicio.crear( this.categoria, this.item ).subscribe( () => {
        this.notificarUsuario( 'modificar' );
      });
    });
  }

  notificarUsuario( operacion?: string ) {

    // Notificamos al usuario
    Swal.fire({
      title: 'Operación completada',
      text: 'Operación completada con éxito',
      type: 'success'
    }).then( () => {

      // Vaciamos el formulario
      this.vaciarFormulario();

      // Volvemos al listado
      if ( operacion === 'modificar' ) {
        this.router.navigate( ['/listado', this.categoria] );
      }
    });
  }

  getParametrosURL() {
    this.activatedRoute.params.subscribe( parametroURL => {

      this.id        = parametroURL['id'       ];
      this.operacion = parametroURL['operacion'];
      this.categoria = parametroURL['categoria'];

      this.categoriaOriginal = this.categoria;

      this.rellenarFormulario();

      this.titulo = this.operacion === 'crear' ? 'Crear nuevo ítem' : 'Modificar ítem';

    });
  }

  cambiarCategoria( itemSeleccionado: string ) {
    this.categoria = itemSeleccionado;
  }

  existenCamposVacios( formulario: NgForm ): boolean {

    if ( formulario.invalid ) {
      Swal.fire({
        title: 'Se ha producido un error',
        text: 'Es posible que haya dejado campos obligatorios vacíos',
        type: 'error',
        timer: 2500,
        padding: '50px',
        showConfirmButton: false,
        allowOutsideClick: true
      });
    }

    return formulario.invalid;
  }

  rellenarFormulario() {
    if ( this.operacion !== 'crear' ) {
      this.servicio.getItem( this.categoria, this.id ).subscribe( ( data: Item ) => {
        this.item = data;
      });
    }
  }

  vaciarFormulario() {

    let inputIngles     = document.querySelector('.entrada input[name="ingles"]'    ) as HTMLInputElement;
    let inputCastellano = document.querySelector('.entrada input[name="castellano"]') as HTMLInputElement;

    inputIngles.value = '';
    inputCastellano.value = '';
  }
}
