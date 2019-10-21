import { Injectable } from '@angular/core';

// HTTP
import { HttpClient } from '@angular/common/http';

// Modelos
import { UsuarioModel } from './../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url    = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private APIKey = 'AIzaSyCp5KSR5BF-VQKoOvB12UKWAzc9PK5ynIM';

  constructor( private http: HttpClient ) { }

  registrarse() {

    // Cabeceras de la petición HTTP
    const authData = {
      email: '',
      password: '',
      returnSecureToken: true
    };

    // POST
    return this.http.post( `${ this.url }signUp?key=${ this.APIKey }`, authData );
  }

  login( usuario: UsuarioModel ) {

    // Cabeceras de la petición HTTP
    const authData = {
      email: usuario.email,
      password: usuario.clave,
      returnSecureToken: true
    };

    // POST
    return this.http.post( `${ this.url }signInWithPassword?key=${ this.APIKey }`, authData );

  }

  logout() {

  }
}
