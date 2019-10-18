import { Injectable } from '@angular/core';

// Modelos
import { ElementoModel } from './../modelos/elemento.models';

// Peticiones HTTP
import { HttpClient } from '@angular/common/http';

// Operadores RXJS
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url = 'https://diccionario-13f5a.firebaseio.com';

  // ─────────────── //
  //     MÉTODOS     //
  // ─────────────── //

  constructor( private http: HttpClient ) { }

  getPalabras() {
    return this.http.get( `${ this.url }/palabras.json` ).pipe(
      map( this.crearVector )
    );
    return this.http.get( `${ this.url }/palabras.json`);
  }

  getFrases() {
    return this.http.get( `${ this.url }/frases.json` ).pipe(
      map( this.crearVector )
    );
  }

  getExpresiones() {
    return this.http.get( `${ this.url }/expresiones.json` ).pipe(
      map( this.crearVector )
    );
  }

  getPalabra( id: string ) {
    return this.http.get(`${ this.url }/palabras/${ id }.json`);
  }

  getFrase( id: string ) {
    return this.http.get(`${ this.url }/frases/${ id }.json`);
  }

  getExpresion( id: string ) {
    return this.http.get(`${ this.url }/expresiones/${ id }.json`);
  }

  crearPalabra( palabra: ElementoModel ) {
    return this.http.post( `${ this.url }/palabras.json`, palabra ).pipe(
      map( ( data: any ) => {
        palabra.id = data.name;
        return palabra;
      })
    );
  }

  crearFrase( frase: ElementoModel ) {
    return this.http.post( `${ this.url }/frases.json`, frase ).pipe(
      map( ( data: any ) => {
        frase.id = data.name;
        return frase;
      })
    );
  }

  crearExpresion( expresion: ElementoModel ) {
    return this.http.post( `${ this.url }/expresiones.json`, expresion ).pipe(
      map( ( data: any ) => {
        expresion.id = data.name;
        return expresion;
      })
    );
  }

  // actuarlizarHeroe( heroe: ElementoModel ) {

  //   const heroeSinID = {
  //     ...heroe
  //   };

  //   delete heroeSinID.id;

  //   return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeSinID );
  // }

  // borrarHeroe( id: string ) {
  //   return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  // }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  private crearVector( elemento: object ) {

    const elementosVector: ElementoModel[] = [];

    if ( elemento == null ) { // Caso de BD vacía
      return [];
    }

    Object.keys( elemento ).forEach( key => {

      const tmp: ElementoModel = elemento[key];

      if ( tmp !== null ) {
        tmp.id = key;
        elementosVector.push( tmp );
      }


    });

    return elementosVector;
  }
}
