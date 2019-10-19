import { Component } from '@angular/core';

// Modelos
import { ElementoModel } from './../../modelos/elemento.models';

// Manejo de formularios
import { NgForm } from '@angular/forms';

// Servicios
import { ServicioService } from './../../servicios/servicio.service';

// SweetAlert2
import Swal from 'sweetalert2';

// Observables
import { Observable } from 'rxjs';

// Get URL parameter from URL
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

  elemento: ElementoModel = new ElementoModel();

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private servicio: ServicioService, private route: ActivatedRoute ) { }

  guardar( formulario: NgForm ) {

    // Campos obligatorios vacíos
    if ( this.camposVacios( formulario ) ) {
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
    let query: Observable<any> = this.servicio.crear( 'palabras', this.elemento );

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

  camposVacios( formulario: NgForm ): boolean {

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
