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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {

  elemento : Item   = { ingles: '', castellano: '' };
  categoria: string = 'palabras';

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService, private router: ActivatedRoute ) {
    this.getParametrosURL();
  }

  guardar( formulario: NgForm ) {

    // Campos obligatorios vacíos
    if ( this.existenCamposVacios( formulario ) ) {
      this.vaciarFormulario();
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false // Para evitar que el usuario lo pueda cerrar
    });
    Swal.showLoading();

    // if ( this.elemento.id ) {
    //   peticion = this.servicio.actualizar( this.elemento );
    // } else {
    //   peticion = this.servicio.crear( this.elemento );
    // }

    // Creamos la consulta
    let query: Observable<any> = this.servicio.crear( this.categoria, this.elemento );

    // Insertamos el nodo en la BD
    query.subscribe( data => {

      // Notificamos al usuario
      Swal.fire({
        title: 'Operación completada',
        text: 'Operación completada con éxito',
        type: 'success'
      });

      // Vaciamos el formulario
      this.vaciarFormulario();
    });
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  getParametrosURL() {
    this.router.params.subscribe( parametroURL => {
      this.categoria = parametroURL['categoria'];
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
        allowOutsideClick: true // Para evitar que el usuario lo pueda cerrar
      });
    }

    return formulario.invalid;
  }

  vaciarFormulario() {
    document.querySelector('.entrada input[name="ingles"]'    ).value = '';
    document.querySelector('.entrada input[name="castellano"]').value = '';
  }
}
