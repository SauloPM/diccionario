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

  getItem( categoria: string, id: string ) {
    return this.http.get(`${ this.url }/${ categoria }/${ id }.json`);
  }

  getRepetido( item: Item ) {

    return this.http.get(`${ this.url }/${ item.categoria }.json?orderBy="ingles"&equalTo="${ item.ingles }"`).pipe(
      map( this.crearVector )
    );
  }

  // https://diccionario-13f5a.firebaseio.com/palabras.json?orderBy="ingles"&equalTo="Charade"

  // ───────────── //
  //     CREAR     //
  // ───────────── //

  crear( item: Item ) {

    item = this.sanitize( item );

    return this.http.post( `${ this.url }/${ item.categoria }.json`, item ).pipe(
      map( ( data: any ) => {
        item.id = data.name;
        return item;
      })
    );
  }

  // ───────────────── //
  //     MODIFICAR     //
  // ───────────────── //

  modificar( categoria: string, item: Item ) {

    item = this.sanitize( item );

    return this.http.put( `${ this.url }/${ categoria }/${ item.id }.json`, item );
  }

  // ──────────────── //
  //     ELIMINAR     //
  // ──────────────── //

  eliminar( categoria: string, id: string ) {
    return this.http.delete(`${ this.url }/${ categoria }/${ id }.json`);
  }

  // ──────────────── //
  //     AUXILIAR     //
  // ──────────────── //

  private sanitize( item: Item ) {

    item.ingles = item.ingles.trim();
    item.ingles = item.ingles[0].toUpperCase() + item.ingles.slice(1);

    item.castellano = item.castellano.trim();
    item.castellano = item.castellano[0].toUpperCase() + item.castellano.slice(1);

    return item;

  }

  private crearVector( elemento: object ) {

    const elementosVector: Item[] = [];

    if ( elemento == null ) { // Caso de BD vacía
      return [];
    }

    Object.keys( elemento ).forEach( key => {

      const tmp: Item = elemento[key];

      if ( tmp !== null ) {
        tmp.id = key;
        elementosVector.push( tmp );
      }

    });

    return elementosVector;
  }
}
