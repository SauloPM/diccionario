import { Injectable } from '@angular/core';

// HTTP
import { HttpClient } from '@angular/common/http';

// Modelos
import { UsuarioModel } from './../modelos/usuario.model';

// RXJS
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userToken: string;

  private url    = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private APIKey = 'AIzaSyCp5KSR5BF-VQKoOvB12UKWAzc9PK5ynIM';

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private http: HttpClient ) {
    this.leerToken();
  }

  registrarse() {

    // Cabeceras de la petición HTTP
    const authData = {
      email: '',
      password: '',
      returnSecureToken: true
    };

    // POST
    return this.http.post( `${ this.url }signUp?key=${ this.APIKey }`, authData ).pipe(
      map( data => {
        this.guardarToken( data['idToken'] );
        return data;
      })
    );
  }

  login( usuario: UsuarioModel ) {

    // Cabeceras de la petición HTTP
    const authData = {
      email: usuario.email,
      password: usuario.clave,
      returnSecureToken: true
    };

    // POST
    return this.http.post( `${ this.url }signInWithPassword?key=${ this.APIKey }`, authData ).pipe(
      map( data => {
        this.guardarToken( data['idToken'] );
        return data;
      })
    );
  }

  logout() {
    localStorage.removeItem( 'token' );
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  private guardarToken( idToken: string ) {

    // Almacenamos el token en el local storage
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken);

    // Almacenamos la fecha de expiración en el local storage
    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );
  }

  private leerToken() {
    return this.userToken = localStorage.getItem( 'token') ? localStorage.getItem( 'token' ) : '';
  }

  usuarioLogueado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const fechaExpiracion = new Date().setTime( Number( localStorage.getItem( 'expira' )));

    return fechaExpiracion > Number( new Date());
  }
}