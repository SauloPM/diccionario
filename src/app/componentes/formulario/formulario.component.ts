import { Component, OnInit } from '@angular/core';

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
export class FormularioComponent implements OnInit {

  elemento: ElementoModel = new ElementoModel();

  constructor( private servicio: ServicioService, private route: ActivatedRoute ) { }

  ngOnInit() { }

  guardar( formulario: NgForm ) {

    if ( formulario.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Operación completada',
      text: 'Operación completada con éxito',
      type: 'success'
    });

    return;

    // Swal.fire({
    //   title: 'Espere',
    //   text: 'Guardando información',
    //   type: 'info',
    //   allowOutsideClick: false // Para evitar que el usuario lo pueda cerrar
    // });
    // Swal.showLoading();

    // let peticion: Observable<any>;

    // if ( this.elemento.id ) {
    //   peticion = this.servicio.actualizar( this.elemento );
    // } else {
    //   peticion = this.servicio.crear( this.elemento );
    // }

    // peticion.subscribe( data => {
    //   Swal.fire({
    //     title: 'Operación completada',
    //     text: 'Operación completada con éxito',
    //     type: 'success'
    //   });
    // });

  }

}
