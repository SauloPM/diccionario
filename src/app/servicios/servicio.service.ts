import { Injectable } from '@angular/core';

// Interfaces
import { Item } from 'src/app/interfaces/item';

// Peticiones HTTP
import { HttpClient } from '@angular/common/http';

// Operadores RXJS
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url = 'https://diccionario-13f5a.firebaseio.com';

  constructor( private http: HttpClient ) { }

  // ─────────────── //
  //     LECTURA     //
  // ─────────────── //

  getListado( categoria: string ) {
    return this.http.get( `${ this.url }/${ categoria }.json` ).pipe(
      map( this.crearVector )
    );
  }

  // ───────────── //
  //     CREAR     //
  // ───────────── //

  crear( categoria: string, palabra: Item ) {
    return this.http.post( `${ this.url }/${ categoria }.json`, palabra ).pipe(
      map( ( data: any ) => {
        palabra.id = data.name;
        return palabra;
      })
    );
  }

  // ────────────────── //
  //     ACTUALIZAR     //
  // ────────────────── //

  getItem( categoria: string, id: string ) {
    return this.http.get(`${ this.url }/${ categoria }/${ id }.json`);
  }

  // actuarlizarHeroe( heroe: ElementoModel ) {

  //   const heroeSinID = {
  //     ...heroe
  //   };

  //   delete heroeSinID.id;

  //   return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeSinID );
  // }

  // ──────────────── //
  //     ELIMINAR     //
  // ──────────────── //

  eliminar( categoria: string, id: string ) {
    return this.http.delete(`${ this.url }/${ categoria }/${ id }.json`);
  }

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
