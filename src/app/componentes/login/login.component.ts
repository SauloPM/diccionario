import { Component, OnInit } from '@angular/core';

// Serivicios
import { AuthService } from './../../servicios/auth.service';

// Modelos
import { UsuarioModel } from './../../modelos/usuario.model';

// Formularios
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit( formulario: NgForm ) {

    if ( formulario.invalid ) {
      return;
    }

    this.auth.login( this.usuario ).subscribe( respuesta => {

      console.log( respuesta );

    }, ( excepcion ) => {

      console.log( excepcion.error.error.message );

    });
  }

}
