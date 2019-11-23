import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Serivicios
import { AuthService } from './../../servicios/auth.service';

// Modelos
import { UsuarioModel } from './../../modelos/usuario.model';

// Sweet Alert
import Swal from 'sweetalert2';

// Formularios
import { NgForm } from '@angular/forms';

// jQuery
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario          : UsuarioModel = new UsuarioModel();
  recordarUsuario  : boolean      = false;
  mensajeErrorEmail: string       = '';

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    if ( this.recordarUsuario ) {
      this.usuario.email = localStorage.getItem( 'email' );
      this.recordarUsuario = true;
    }
  }

  onSubmit( formulario: NgForm ) {

    if ( formulario.invalid ) {

      let errorEmail = formulario.controls['email'].errors;
      let errorClave = formulario.controls['clave'].errors;

      if ( errorEmail !== null ) {

        this.mensajeErrorEmail = errorEmail.email ? 'El formato es incorrecto' : 'Este campo es obligatorio';

        $('.entrada.email input').addClass('animated shake fast');

        setTimeout( () => {
          $('.entrada.email input').removeClass('animated shake fast');
        }, 1000);
      }

      if ( errorClave !== null ) {

        $('.entrada.clave input').addClass('animated shake fast');

        setTimeout( () => {
          $('.entrada.clave input').removeClass('animated shake fast');
        }, 1000);
      }

      return;
    }

    // Loading
    Swal.fire({
      type: 'info',
      text: 'Espere, por favor...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    // Comprobamos que los datos del usuario sean correctos
    this.auth.login( this.usuario ).subscribe( respuesta => {

      // Cerramos el loading
      Swal.close();

      // Almacenamos el email del usuario en el local storage si desea que se le recuerde
      if ( this.recordarUsuario ) {
        localStorage.setItem( 'email', this.usuario.email );
      }

      this.router.navigateByUrl( 'diccionario/listado/palabras' );

    }, ( excepcion ) => {

      console.log( excepcion.error.error.message );

      // Notificamos al usuario del error
      Swal.fire({
        type: 'error',
        title: 'Se ha producido un error',
        text: 'Datos incorrectos',
        // text: excepcion.error.error.message,
        allowOutsideClick: false
      });

    });
  }
}
