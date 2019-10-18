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

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get( 'id' );

    if ( id !== 'nuevo' ) {
      this.servicio.getHeroe( id ).subscribe( ( data: ElementoModel ) => {
        this.elemento = data;
        this.elemento.id = id;
      });
    }
  }

  guardar( formulario: NgForm ) {

    if ( formulario.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    // Spinner de SweetAlert2 para que el usuario sepa que su operación se está procesando
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false // Para evitar que el usuario lo pueda cerrar
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.elemento.id ) {
      peticion = this.servicio.actualizar( this.elemento );
    } else {
      peticion = this.servicio.crear( this.elemento );
    }

    peticion.subscribe( data => {
      Swal.fire({
        title: 'Operación completada',
        text: 'Operación completada con éxito',
        type: 'success'
      });
    });

  }

}
